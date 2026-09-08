import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";
import { createJournalEntry } from "../accounting/journalEngine.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/:companyId/invoices",
  (req,res)=>{

    const invoices =
      db.prepare(`
        SELECT *
        FROM invoices
        WHERE company_id = ?
        ORDER BY id DESC
      `)
      .all(req.params.companyId);

    res.json({ invoices });

  }
);

router.post(
  "/:companyId/invoices",
  (req,res)=>{

    try {

      const companyId =
        Number(req.params.companyId);

      const total =
        Number(req.body.totalCents);

      const result =
        db.prepare(`
          INSERT INTO invoices
          (
            company_id,
            customer_id,
            invoice_number,
            invoice_date,
            due_date,
            total_cents,
            balance_cents
          )
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `)
        .run(
          companyId,
          req.body.customerId,
          req.body.invoiceNumber,
          req.body.invoiceDate,
          req.body.dueDate,
          total,
          total
        );

      createJournalEntry({
        companyId,
        entryDate: req.body.invoiceDate,
        reference: req.body.invoiceNumber,
        description: "Invoice Posted",
        lines: [
          {
            accountId: 2,
            debitCents: total
          },
          {
            accountId: 6,
            creditCents: total
          }
        ]
      });

      res.status(201).json({
        invoiceId: result.lastInsertRowid
      });

    } catch(error){

      res.status(400).json({
        error: error.message
      });

    }

  }
);

export default router;
