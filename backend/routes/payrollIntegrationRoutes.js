import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { importPayrollJournal } from "../integrations/dominaPayEngine.js";

const router = express.Router();

router.use(authenticate);

router.post(
  "/:companyId/import",
  (req,res)=>{

    const payrollImportId =
      importPayrollJournal({
        companyId:Number(req.params.companyId),
        ...req.body
      });

    res.status(201).json({
      payrollImportId
    });

  }
);

export default router;