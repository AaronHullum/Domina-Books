import { useEffect, useState } from "react";
import api from "../api/api";

function Inventory() {
  const [items, setItems] = useState([]);
  const [inventory, setInventory] = useState([]);

  const [sku, setSku] = useState("");
  const [itemName, setItemName] = useState("");
  const [unitCost, setUnitCost] = useState("");

  async function loadData() {
    try {
      const itemsResponse =
        await api.get(
          "/inventory/1/items"
        );

      const inventoryResponse =
        await api.get(
          "/inventory/1/on-hand"
        );

      setItems(
        itemsResponse.data.items || []
      );

      setInventory(
        inventoryResponse.data.inventory || []
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addItem(e) {
    e.preventDefault();

    try {
      await api.post(
        "/inventory/1/items",
        {
          sku,
          itemName,
          unitCostCents:
            Number(unitCost) * 100
        }
      );

      setSku("");
      setItemName("");
      setUnitCost("");

      loadData();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: "32px" }}>
      <h1>Inventory</h1>

      <form onSubmit={addItem}>
        <div>
          <input
            placeholder="SKU"
            value={sku}
            onChange={(e) =>
              setSku(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <input
            placeholder="Item Name"
            value={itemName}
            onChange={(e) =>
              setItemName(
                e.target.value
              )
            }
          />
        </div>

        <br />

        <div>
          <input
            placeholder="Unit Cost"
            value={unitCost}
            onChange={(e) =>
              setUnitCost(
                e.target.value
              )
            }
          />
        </div>

        <br />

        <button type="submit">
          Add Item
        </button>
      </form>

      <hr />

      <h2>Items</h2>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px"
          }}
        >
          <strong>{item.item_name}</strong>

          <div>SKU: {item.sku}</div>

          <div>
            Cost: $
            {(item.unit_cost_cents / 100)
              .toFixed(2)}
          </div>
        </div>
      ))}

      <hr />

      <h2>On Hand Inventory</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            <th>SKU</th>
            <th>Item</th>
            <th>Qty On Hand</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((row) => (
            <tr key={row.id}>
              <td>{row.sku}</td>
              <td>{row.item_name}</td>
              <td>{row.qty_on_hand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;