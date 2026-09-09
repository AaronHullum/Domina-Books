import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/:companyId/reconciliations",(req,res)=>{

  const reconciliations =
    db.prepare(`
      SELECT *
      FROM bank_reconciliations
      WHERE company_id = ?
      ORDER BY id DESC
    `)
    .all(req.params.companyId);

  res.json({ reconciliations });

});

router.post("/:companyId/reconciliations",(req,res)=>{

  const result =
    db.prepare(`
      INSERT INTO bank_reconciliations
      (
        company_id,
        bank_account_id,
        statement_date,
        statement_balance_cents
      )
      VALUES (?, ?, ?, ?)
    `)
    .run(
      req.params.companyId,
      req.body.bankAccountId,
      req.body.statementDate,
      req.body.statementBalanceCents
    );

  res.status(201).json({
    reconciliationId: result.lastInsertRowid
  });

});

export default router;