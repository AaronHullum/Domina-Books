import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";
import { createJournalEntry } from "../accounting/journalEngine.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/:companyId/vendor-payments",
  (req, res) => {

    const payments =
      db.prepare(`
        SELECT *
        FROM vendor_payments
        WHERE company_id = ?
        ORDER BY id DESC
      `)
      .all(req.params.companyId);

    res.json({ payments });
  }
);

router.post(
  "/:companyId/vendor-payments",
  (req, res) => {

    try {

      const companyId =
        Number(req.params.companyId);

      const amount =
        Number(req.body.amountCents);

      const result =
        db.prepare(`
          INSERT INTO vendor_payments
          (
            company_id,
            vendor_id,
            bill_id,
            payment_date,
            amount_cents,
            reference
          )
          VALUES (?, ?, ?, ?, ?, ?)
        `)
        .run(
          companyId,
          req.body.vendorId,
          req.body.billId,
          req.body.paymentDate,
          amount,
          req.body.reference || null
        );

      createJournalEntry({
        companyId,
        entryDate: req.body.paymentDate,
        reference: req.body.reference,
        description: "Vendor Payment",
        lines: [
          {
            accountId: 3,
            debitCents: amount
          },
          {
            accountId: 1,
            creditCents: amount
          }
        ]
      });

      res.status(201).json({
        paymentId: result.lastInsertRowid
      });

    } catch (error) {

      res.status(400).json({
        error: error.message
      });

    }

  }
);

export default router;