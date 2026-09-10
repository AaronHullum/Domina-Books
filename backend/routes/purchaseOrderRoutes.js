import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";
import { createPurchaseOrder } from "../purchasing/purchasingEngine.js";

const router = express.Router();

// router.use(authenticate);

router.get("/:companyId/purchase-orders",(req,res)=>{

  const orders =
    db.prepare(`
      SELECT *
      FROM purchase_orders
      WHERE company_id = ?
      ORDER BY id DESC
    `)
    .all(req.params.companyId);

  res.json({ orders });

});

router.post("/:companyId/purchase-orders",(req,res)=>{

  const id =
    createPurchaseOrder({
      companyId:Number(req.params.companyId),
      ...req.body
    });

  res.status(201).json({
    purchaseOrderId:id
  });

});

export default router;