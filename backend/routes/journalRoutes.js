import express from "express";

import db from "../database/db.js";

import { authenticate }
from "../middleware/authenticate.js";

import {
    createJournalEntry
}
from "../accounting/journalEngine.js";

const router =
    express.Router();

router.use(authenticate);

router.post(
    "/:companyId/journal-entries",
    (req,res)=>{

        try{

            const id =
                createJournalEntry({
                    companyId:
                        Number(req.params.companyId),
                    ...req.body
                });

            res.status(201).json({
                journalEntryId:id
            });

        }catch(error){

            res.status(400).json({
                error:error.message
            });

        }

    }
);

router.get(
    "/:companyId/journal-entries",
    (req,res)=>{

        const entries =
            db.prepare(`
                SELECT *
                FROM journal_entries
                WHERE company_id = ?
                ORDER BY id DESC
            `)
            .all(
                req.params.companyId
            );

        res.json({
            entries
        });

    }
);

export default router;
