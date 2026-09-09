import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import "./database/init.js";

import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import apReportRoutes from "./routes/apReportRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import bankAccountRoutes from "./routes/bankAccountRoutes.js";
import bankTransactionRoutes from "./routes/bankTransactionRoutes.js";
import bankReconciliationRoutes from "./routes/bankReconciliationRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import ledgerRoutes from "./routes/ledgerRoutes.js";
import financialStatementRoutes from "./routes/financialStatementRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import vendorPaymentRoutes from "./routes/vendorPaymentRoutes.js";
import fiscalRoutes from "./routes/fiscalRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import inventoryTransactionRoutes from "./routes/inventoryTransactionRoutes.js";
import inventoryReportRoutes from "./routes/inventoryReportRoutes.js";
import purchaseOrderRoutes from "./routes/purchaseOrderRoutes.js";
import purchaseReceiptRoutes from "./routes/purchaseReceiptRoutes.js";
import purchaseReportRoutes from "./routes/purchaseReportRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import salesOrderRoutes from "./routes/salesOrderRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import salesReportRoutes from "./routes/salesReportRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";
import depreciationRoutes from "./routes/depreciationRoutes.js";
import assetReportRoutes from "./routes/assetReportRoutes.js";
import payrollIntegrationRoutes from "./routes/payrollIntegrationRoutes.js";
import payrollReportRoutes from "./routes/payrollReportRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health",(req,res)=>{
  res.json({
    ok:true,
    service:"DominaBooks API"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/banking", bankAccountRoutes);
app.use("/api/banking", bankTransactionRoutes);
app.use("/api/banking", bankReconciliationRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/companies", accountRoutes);
app.use("/api/companies", customerRoutes);
app.use("/api/companies", invoiceRoutes);
app.use("/api/companies", paymentRoutes);
app.use("/api/companies", journalRoutes);
app.use("/api/companies", vendorRoutes);
app.use("/api/companies", billRoutes);
app.use("/api/companies", vendorPaymentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/reports", ledgerRoutes);
app.use("/api/reports", financialStatementRoutes);
app.use("/api/reports", apReportRoutes);
app.use("/api/gl", fiscalRoutes);
app.use("/api/gl", auditRoutes);
app.use("/api/inventory", itemRoutes);
app.use("/api/inventory", inventoryTransactionRoutes);
app.use("/api/inventory", inventoryReportRoutes);
app.use("/api/purchasing", purchaseOrderRoutes);
app.use("/api/purchasing", purchaseReceiptRoutes);
app.use("/api/purchasing", purchaseReportRoutes);
app.use("/api/sales", quoteRoutes);
app.use("/api/sales", salesOrderRoutes);
app.use("/api/sales", shipmentRoutes);
app.use("/api/sales", salesReportRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/assets", depreciationRoutes);
app.use("/api/assets", assetReportRoutes);
app.use("/api/payroll", payrollIntegrationRoutes);
app.use("/api/payroll", payrollReportRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
  console.log(
    `DominaBooks API listening on port ${PORT}`
  );
});
