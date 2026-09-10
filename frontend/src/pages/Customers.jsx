import { useEffect, useState } from "react";
import api from "../api/api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const [displayName, setDisplayName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [billingAddress, setBillingAddress] =
    useState("");

  async function loadCustomers() {
    try {
      const response =
        await api.get(
          "/companies/1/customers"
        );

      setCustomers(
        response.data.customers || []
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  async function addCustomer(e) {
    e.preventDefault();

    try {
      await api.post(
        "/companies/1/customers",
        {
          displayName,
          email,
          phone,
          billingAddress
        }
      );

      setDisplayName("");
      setEmail("");
      setPhone("");
      setBillingAddress("");

      loadCustomers();
    } catch (err) {
      console.error(err);
    }
  }

  const filteredCustomers =
    customers.filter((customer) =>
      (customer.display_name || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div style={{ padding: "32px" }}>
      <h1>Customers</h1>

      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "24px"
        }}
      >
        <h2>Add Customer</h2>

        <form onSubmit={addCustomer}>
          <div>
            <input
              placeholder="Customer Name"
              value={displayName}
              onChange={(e) =>
                setDisplayName(
                  e.target.value
                )
              }
            />
          </div>

          <br />

          <div>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />
          </div>

          <br />

          <div>
            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
            />
          </div>

          <br />

          <div>
            <input
              placeholder="Billing Address"
              value={billingAddress}
              onChange={(e) =>
                setBillingAddress(
                  e.target.value
                )
              }
            />
          </div>

          <br />

          <button type="submit">
            Add Customer
          </button>
        </form>
      </div>

      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "12px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}
        >
          <h2>Customer List</h2>

          <input
            placeholder="Search Customers..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              maxWidth: "300px"
            }}
          />
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse"
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map(
              (customer) => (
                <tr
                  key={customer.id}
                >
                  <td>
                    {
                      customer.display_name
                    }
                  </td>

                  <td>
                    {
                      customer.email
                    }
                  </td>

                  <td>
                    {
                      customer.phone
                    }
                  </td>

                  <td>
                    {
                      customer.billing_address
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;