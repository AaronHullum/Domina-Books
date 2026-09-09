import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";
import { lockPeriod } from "../generalLedger/periodEngine.js";

const router = express.Router();

router.use(authenticate);

router.get(
  "/:companyId/periods",
  (req,res)=>{

    const periods =
      db.prepare(`
        SELECT *
        FROM fiscal_periods
        WHERE company_id = ?
        ORDER BY period_end DESC
      `)
      .all(req.params.companyId);

    res.json({ periods });

  }
);

router.post(
  "/:companyId/periods/lock",
  (req,res)=>{

    const id =
      lockPeriod(
        Number(req.params.companyId),
        req.body.periodEnd
      );

    res.status(201).json({
      fiscalPeriodId:id
    });

  }
);

export default router;