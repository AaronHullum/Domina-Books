import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/:companyId/financial-statements",
  (req,res)=>{

    const rows =
      db.prepare(`
        SELECT
          a.account_type,
          a.code,
          a.name,
          COALESCE(
             SUM(jl.debit_cents),
             0
          ) AS debits,
          COALESCE(
             SUM(jl.credit_cents),
             0
          ) AS credits

        FROM accounts a

        LEFT JOIN journal_lines jl
          ON jl.account_id = a.id

        WHERE a.company_id = ?

        GROUP BY a.id

        ORDER BY a.code
      `)
      .all(req.params.companyId);

    const revenue =
      rows
      .filter(x=>x.account_type==="REVENUE")
      .reduce(
        (s,x)=>s+(x.credits-x.debits),
        0
      );

    const expenses =
      rows
      .filter(x=>x.account_type==="EXPENSE")
      .reduce(
        (s,x)=>s+(x.debits-x.credits),
        0
      );

    const assets =
      rows
      .filter(x=>x.account_type==="ASSET")
      .reduce(
        (s,x)=>s+(x.debits-x.credits),
        0
      );

    const liabilities =
      rows
      .filter(x=>x.account_type==="LIABILITY")
      .reduce(
        (s,x)=>s+(x.credits-x.debits),
        0
      );

    const equity =
      rows
      .filter(x=>x.account_type==="EQUITY")
      .reduce(
        (s,x)=>s+(x.credits-x.debits),
        0
      );

    res.json({

      profitAndLoss:{
        revenue,
        expenses,
        netIncome:
          revenue-expenses
      },

      balanceSheet:{
        assets,
        liabilities,
        equity
      }

    });

  }
);

export default router;
