import express from "express";
import db from "../database/db.js";
import { authenticate } from "../middleware/authenticate.js";
import { createSalesOrder } from "../sales/salesEngine.js";

const router = express.Router();

// router.use(authenticate);

router.get("/:companyId/sales-orders",(req,res)=>{

  const orders =
    db.prepare(`
      SELECT *
      FROM sales_orders
      WHERE company_id = ?
      ORDER BY id DESC
    `)
    .all(req.params.companyId);

  res.json({ orders });

});

router.post("/:companyId/sales-orders",(req,res)=>{

  const id =
    createSalesOrder({
      companyId:Number(req.params.companyId),
      ...req.body
    });

  res.status(201).json({
    salesOrderId:id
  });

});

export default router;