import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import "./database/init.js";

import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";

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

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
  console.log(
    `DominaBooks API listening on port ${PORT}`
  );
});
