import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/:companyId/quotes",(req,res)=>{

  const quotes =
    db.prepare(`
      SELECT *
      FROM quotes
      WHERE company_id = ?
      ORDER BY id DESC
    `)
    .all(req.params.companyId);

  res.json({ quotes });

});

router.post("/:companyId/quotes",(req,res)=>{

  const result =
    db.prepare(`
      INSERT INTO quotes
      (
        company_id,
        customer_id,
        quote_number,
        quote_date,
        total_cents
      )
      VALUES (?, ?, ?, ?, ?)
    `)
    .run(
      req.params.companyId,
      req.body.customerId,
      req.body.quoteNumber,
      req.body.quoteDate,
      req.body.totalCents
    );

  res.status(201).json({
    quoteId: result.lastInsertRowid
  });

});

export default router;