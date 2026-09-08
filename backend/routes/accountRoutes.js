import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/:companyId/accounts",(req,res)=>{

  const accounts = db.prepare(`
    SELECT *
    FROM accounts
    WHERE company_id = ?
    ORDER BY code
  `).all(req.params.companyId);

  res.json({ accounts });

});

router.post("/:companyId/accounts",(req,res)=>{

  const result = db.prepare(`
    INSERT INTO accounts
    (
      company_id,
      code,
      name,
      account_type,
      normal_balance
    )
    VALUES (?, ?, ?, ?, ?)
  `).run(
    req.params.companyId,
    req.body.code,
    req.body.name,
    req.body.accountType,
    req.body.normalBalance
  );

  res.status(201).json({
    accountId: result.lastInsertRowid
  });

});

export default router;
