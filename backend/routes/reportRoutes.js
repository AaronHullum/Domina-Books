import express from "express";

import db from "../database/db.js";

import { authenticate }
from "../middleware/authenticate.js";

const router =
    express.Router();

router.use(authenticate);

router.get(
    "/:companyId/trial-balance",
    (req,res)=>{

        const rows =
            db.prepare(`
                SELECT
                    a.id,
                    a.code,
                    a.name,
                    a.account_type,
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

        res.json({
            accounts:rows
        });

    }
);

export default router;
