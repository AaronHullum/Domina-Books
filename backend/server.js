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

import journalRoutes from "./routes/journalRoutes.js";

import reportRoutes from "./routes/reportRoutes.js";
import ledgerRoutes from "./routes/ledgerRoutes.js";
import financialStatementRoutes from "./routes/financialStatementRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import vendorPaymentRoutes from "./routes/vendorPaymentRoutes.js";
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

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
  console.log(
    `DominaBooks API listening on port ${PORT}`
  );
});
