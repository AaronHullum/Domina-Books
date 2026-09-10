import { useEffect, useState } from "react";
import api from "../api/api";

function Purchasing() {
  const [orders, setOrders] = useState([]);

  const [vendorId, setVendorId] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [poDate, setPoDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  async function loadOrders() {
    try {
      const response =
        await api.get(
          "/purchasing/1/purchase-orders"
        );

      setOrders(
        response.data.orders || []
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function createOrder(e) {
    e.preventDefault();

    try {
      await api.post(
        "/purchasing/1/purchase-orders",
        {
          vendorId: Number(vendorId),
          poNumber,
          poDate,
          totalCents:
            Number(totalAmount) * 100
        }
      );

      setVendorId("");
      setPoNumber("");
      setPoDate("");
      setTotalAmount("");

      loadOrders();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: "32px" }}>
      <h1>Purchasing</h1>

      <form onSubmit={createOrder}>
        <input
          placeholder="Vendor ID"
          value={vendorId}
          onChange={(e) =>
            setVendorId(e.target.value)
          }
        />

        <br /><br />

        <input
          placeholder="PO Number"
          value={poNumber}
          onChange={(e) =>
            setPoNumber(e.target.value)
          }
        />

        <br /><br />

        <input
          type="date"
          value={poDate}
          onChange={(e) =>
            setPoDate(e.target.value)
          }
        />

        <br /><br />

        <input
          placeholder="Total Amount"
          value={totalAmount}
          onChange={(e) =>
            setTotalAmount(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Create Purchase Order
        </button>
      </form>

      <hr />

      <h2>Purchase Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px"
          }}
        >
          <div>
            PO #{order.id}
          </div>

          <div>
            Vendor: {order.vendor_id}
          </div>

          <div>
            Status: {order.status}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Purchasing;