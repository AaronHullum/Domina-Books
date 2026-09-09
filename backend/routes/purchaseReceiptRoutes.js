import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { receivePurchaseOrder } from "../purchasing/purchasingEngine.js";

const router = express.Router();

router.use(authenticate);

router.post("/:companyId/purchase-receipts",(req,res)=>{

  const receiptId =
    receivePurchaseOrder({
      companyId:Number(req.params.companyId),
      ...req.body
    });

  res.status(201).json({
    receiptId
  });

});

export default router;
``