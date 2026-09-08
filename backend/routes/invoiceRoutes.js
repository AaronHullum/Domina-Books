import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

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
        req.params.companyId,
        req.body.customerId,
        req.body.invoiceNumber,
        req.body.invoiceDate,
        req.body.dueDate,
        req.body.totalCents,
        req.body.totalCents
      );

    res.status(201).json({
      invoiceId:
        result.lastInsertRowid
    });

  }
);

export default router;
