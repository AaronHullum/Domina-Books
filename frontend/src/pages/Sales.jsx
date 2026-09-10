import { useEffect, useState } from "react";
import api from "../api/api";

function Sales() {
  const [quotes, setQuotes] = useState([]);
  const [orders, setOrders] = useState([]);

  const [customerId, setCustomerId] =
    useState("");

  const [quoteNumber, setQuoteNumber] =
    useState("");

  const [quoteDate, setQuoteDate] =
    useState("");

  const [totalAmount, setTotalAmount] =
    useState("");

  async function loadData() {
    try {
      const quotesResponse =
        await api.get(
          "/sales/1/quotes"
        );

      const ordersResponse =
        await api.get(
          "/sales/1/sales-orders"
        );

      setQuotes(
        quotesResponse.data.quotes || []
      );

      setOrders(
        ordersResponse.data.orders || []
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function createQuote(e) {
    e.preventDefault();

    try {
      await api.post(
        "/sales/1/quotes",
        {
          customerId:
            Number(customerId),
          quoteNumber,
          quoteDate,
          totalCents:
            Number(totalAmount) * 100
        }
      );

      setCustomerId("");
      setQuoteNumber("");
      setQuoteDate("");
      setTotalAmount("");

      loadData();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: "32px" }}>
      <h1>Sales</h1>

      <form onSubmit={createQuote}>
        <input
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) =>
            setCustomerId(e.target.value)
          }
        />

        <br /><br />

        <input
          placeholder="Quote Number"
          value={quoteNumber}
          onChange={(e) =>
            setQuoteNumber(e.target.value)
          }
        />

        <br /><br />

        <input
          type="date"
          value={quoteDate}
          onChange={(e) =>
            setQuoteDate(e.target.value)
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
          Create Quote
        </button>
      </form>

      <hr />

      <h2>Quotes</h2>

      {quotes.map((quote) => (
        <div
          key={quote.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px"
          }}
        >
          <div>
            Quote: {quote.quote_number}
          </div>

          <div>
            Customer: {quote.customer_id}
          </div>
        </div>
      ))}

      <hr />

      <h2>Sales Orders</h2>

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
            SO #{order.id}
          </div>

          <div>
            Customer: {order.customer_id}
          </div>

          <div>
            Status: {order.status}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sales;