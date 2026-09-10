import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { createShipment } from "../sales/salesEngine.js";

const router = express.Router();

// router.use(authenticate);

router.post("/:companyId/shipments",(req,res)=>{

  const shipmentId =
    createShipment({
      companyId:Number(req.params.companyId),
      ...req.body
    });

  res.status(201).json({
    shipmentId
  });

});

export default router;