import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { runDepreciation } from "../fixedAssets/assetEngine.js";

const router = express.Router();

// router.use(authenticate);

router.post("/:companyId/depreciation",(req,res)=>{

  const amount =
    runDepreciation({
      companyId:Number(req.params.companyId),
      ...req.body
    });

  res.status(201).json({
    depreciationAmount: amount
  });

});

export default router;