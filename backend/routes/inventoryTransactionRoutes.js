import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  createInventoryTransaction,
  postInventoryReceipt,
  postInventoryIssue
} from "../inventory/inventoryEngine.js";

const router = express.Router();

router.use(authenticate);

router.post("/:companyId/transactions",(req,res)=>{

  const companyId =
    Number(req.params.companyId);

  const transactionId =
    createInventoryTransaction({
      companyId,
      ...req.body
    });

  if(req.body.transactionType === "RECEIPT"){

    postInventoryReceipt({
      companyId,
      ...req.body
    });

  }

  if(req.body.transactionType === "ISSUE"){

    postInventoryIssue({
      companyId,
      ...req.body
    });

  }

  res.status(201).json({
    transactionId
  });

});

export default router;