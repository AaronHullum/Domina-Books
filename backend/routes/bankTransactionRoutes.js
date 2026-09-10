import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";
import {
  recordBankTransaction,
  postDeposit,
  postWithdrawal
} from "../banking/bankingEngine.js";

const router = express.Router();

// router.use(authenticate);

router.get("/:companyId/transactions",(req,res)=>{

  const transactions =
    db.prepare(`
      SELECT *
      FROM bank_transactions
      WHERE company_id = ?
      ORDER BY id DESC
    `)
    .all(req.params.companyId);

  res.json({ transactions });

});

router.post("/:companyId/transactions",(req,res)=>{

  const companyId =
    Number(req.params.companyId);

  const transactionId =
    recordBankTransaction({
      companyId,
      ...req.body
    });

  if(req.body.transactionType === "DEPOSIT"){

    postDeposit({
      companyId,
      ...req.body
    });

  }

  if(req.body.transactionType === "WITHDRAWAL"){

    postWithdrawal({
      companyId,
      ...req.body
    });

  }

  res.status(201).json({
    transactionId
  });

});

export default router;