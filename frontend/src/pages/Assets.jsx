import { useEffect, useState } from "react";
import api from "../api/api";

function Assets() {
  const [assets, setAssets] = useState([]);

  const [assetName, setAssetName] =
    useState("");

  const [assetCategory, setAssetCategory] =
    useState("");

  const [purchaseDate, setPurchaseDate] =
    useState("");

  const [cost, setCost] =
    useState("");

  const [usefulLifeYears, setUsefulLifeYears] =
    useState("");

  const [salvageValue, setSalvageValue] =
    useState("");

  async function loadAssets() {
    try {
      const response =
        await api.get(
          "/assets/1/assets"
        );

      setAssets(
        response.data.assets || []
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadAssets();
  }, []);

  async function createAsset(e) {
    e.preventDefault();

    try {
      await api.post(
        "/assets/1/assets",
        {
          assetName,
          assetCategory,
          acquisitionDate:
            purchaseDate,
          costCents:
            Number(cost) * 100,
          usefulLifeYears:
            Number(
              usefulLifeYears
            ),
          salvageValueCents:
            Number(
              salvageValue
            ) * 100
        }
      );

      setAssetName("");
      setAssetCategory("");
      setPurchaseDate("");
      setCost("");
      setUsefulLifeYears("");
      setSalvageValue("");

      loadAssets();
    } catch (err) {
      console.error(err);
    }
  }

  async function runDepreciation() {
    try {
      const response =
        await api.post(
          "/assets/1/depreciation",
          {
            assetId: 1,
            depreciationDate:
              new Date()
                .toISOString()
                .split("T")[0]
          }
        );

      alert(
        `Depreciation Posted: $${(
          response.data
            .depreciationAmount / 100
        ).toFixed(2)}`
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: "32px" }}>
      <h1>Fixed Assets</h1>

      <form onSubmit={createAsset}>
        <input
          placeholder="Asset Name"
          value={assetName}
          onChange={(e) =>
            setAssetName(
              e.target.value
            )
          }
        />

        <br /><br />

        <input
          placeholder="Asset Category"
          value={assetCategory}
          onChange={(e) =>
            setAssetCategory(
              e.target.value
            )
          }
        />

        <br /><br />

        <input
          type="date"
          value={purchaseDate}
          onChange={(e) =>
            setPurchaseDate(
              e.target.value
            )
          }
        />

        <br /><br />

        <input
          placeholder="Cost"
          value={cost}
          onChange={(e) =>
            setCost(
              e.target.value
            )
          }
        />

        <br /><br />

        <input
          placeholder="Useful Life (Years)"
          value={usefulLifeYears}
          onChange={(e) =>
            setUsefulLifeYears(
              e.target.value
            )
          }
        />

        <br /><br />

        <input
          placeholder="Salvage Value"
          value={salvageValue}
          onChange={(e) =>
            setSalvageValue(
              e.target.value
            )
          }
        />

        <br /><br />

        <button type="submit">
          Add Asset
        </button>
      </form>

      <br />

      <button
        onClick={runDepreciation}
      >
        Run Depreciation
      </button>

      <hr />

      <h2>Assets</h2>

      {assets.map((asset) => (
        <div
          key={asset.id}
          style={{
            border:
              "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px"
          }}
        >
          <div>
            Asset:{" "}
            {asset.asset_name}
          </div>

          <div>
            Category:{" "}
            {asset.asset_category}
          </div>

          <div>
            Cost: $
            {(
              asset.cost_cents /
              100
            ).toFixed(2)}
          </div>

          <div>
            Life:
            {" "}
            {
              asset.useful_life_years
            } years
          </div>
        </div>
      ))}
    </div>
  );
}

export default Assets;