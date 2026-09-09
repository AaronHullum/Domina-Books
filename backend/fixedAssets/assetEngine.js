import db from "../database/db.js";
import { createJournalEntry } from "../accounting/journalEngine.js";

export function createAsset(data) {

  const result =
    db.prepare(`
      INSERT INTO fixed_assets
      (
        company_id,
        asset_name,
        asset_category,
        acquisition_date,
        cost_cents,
        useful_life_years,
        salvage_value_cents
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      data.companyId,
      data.assetName,
      data.assetCategory,
      data.acquisitionDate,
      data.costCents,
      data.usefulLifeYears,
      data.salvageValueCents || 0
    );

  createJournalEntry({
    companyId: data.companyId,
    entryDate: data.acquisitionDate,
    reference: "ASSET-ACQ",
    description: "Asset Acquisition",
    lines: [
      {
        accountId: 3,
        debitCents: data.costCents
      },
      {
        accountId: 1,
        creditCents: data.costCents
      }
    ]
  });

  return result.lastInsertRowid;
}

export function runDepreciation(data) {

  const asset =
    db.prepare(`
      SELECT *
      FROM fixed_assets
      WHERE id = ?
    `)
    .get(data.assetId);

  if (!asset) {
    throw new Error("Asset not found");
  }

  const depreciableBasis =
    asset.cost_cents -
    asset.salvage_value_cents;

  const annual =
    Math.round(
      depreciableBasis /
      asset.useful_life_years
    );

  const monthly =
    Math.round(
      annual / 12
    );

  db.prepare(`
    INSERT INTO depreciation_runs
    (
      company_id,
      asset_id,
      depreciation_date,
      amount_cents
    )
    VALUES (?, ?, ?, ?)
  `)
  .run(
    data.companyId,
    data.assetId,
    data.depreciationDate,
    monthly
  );

  createJournalEntry({
    companyId: data.companyId,
    entryDate: data.depreciationDate,
    reference: "DEPRECIATION",
    description: "Asset Depreciation",
    lines: [
      {
        accountId: 8,
        debitCents: monthly
      },
      {
        accountId: 5,
        creditCents: monthly
      }
    ]
  });

  return monthly;
}