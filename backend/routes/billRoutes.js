import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";
import { createJournalEntry } from "../accounting/journalEngine.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/:companyId/bills",
  (req, res) => {

    const bills =
      db.prepare(`
        SELECT *
        FROM bills
        WHERE company_id = ?
        ORDER BY id DESC
      `)
      .all(req.params.companyId);

    res.json({ bills });
  }
);

router.post(
  "/:companyId/bills",
  (req, res) => {

    try {

      const companyId =
        Number(req.params.companyId);

      const total =
        Number(req.body.totalCents);

      const result =
        db.prepare(`
          INSERT INTO bills
          (
            company_id,
            vendor_id,
            bill_number,
            bill_date,
            due_date,
            total_cents,
            balance_cents
          )
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `)
        .run(
          companyId,
          req.body.vendorId,
          req.body.billNumber,
          req.body.billDate,
          req.body.dueDate,
          total,
          total
        );

      createJournalEntry({
        companyId,
        entryDate: req.body.billDate,
        reference: req.body.billNumber,
        description: "Vendor Bill",
        lines: [
          {
            accountId: 8,
            debitCents: total
          },
          {
            accountId: 4,
            creditCents: total
          }
        ]
      });

      res.status(201).json({
        billId: result.lastInsertRowid
      });

    } catch (error) {

      res.status(400).json({
        error: error.message
      });

    }

  }
);

export default router;