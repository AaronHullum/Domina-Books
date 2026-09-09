import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/:companyId/accounts", (req,res)=>{

  const accounts =
    db.prepare(`
      SELECT *
      FROM bank_accounts
      WHERE company_id = ?
      ORDER BY account_name
    `)
    .all(req.params.companyId);

  res.json({ accounts });

});

router.post("/:companyId/accounts", (req,res)=>{

  const result =
    db.prepare(`
      INSERT INTO bank_accounts
      (
        company_id,
        account_name,
        bank_name,
        account_number
      )
      VALUES (?, ?, ?, ?)
    `)
    .run(
      req.params.companyId,
      req.body.accountName,
      req.body.bankName,
      req.body.accountNumber
    );

  res.status(201).json({
    bankAccountId: result.lastInsertRowid
  });

});

export default router;