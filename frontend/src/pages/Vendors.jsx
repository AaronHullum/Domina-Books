import { useEffect, useState } from "react";
import api from "../api/api";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");

  const [vendorName, setVendorName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  async function loadVendors() {
    try {
      const response =
        await api.get(
          "/companies/1/vendors"
        );

      setVendors(
        response.data.vendors || []
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadVendors();
  }, []);

  async function addVendor(e) {
    e.preventDefault();

    try {
      await api.post(
        "/companies/1/vendors",
        {
          vendorName,
          email,
          phone,
          address
        }
      );

      setVendorName("");
      setEmail("");
      setPhone("");
      setAddress("");

      loadVendors();
    } catch (err) {
      console.error(err);
    }
  }

  const filteredVendors =
    vendors.filter((vendor) =>
      (vendor.vendor_name || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div style={{ padding: "32px" }}>
      <h1>Vendors</h1>

      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "24px"
        }}
      >
        <h2>Add Vendor</h2>

        <form onSubmit={addVendor}>
          <div>
            <input
              placeholder="Vendor Name"
              value={vendorName}
              onChange={(e) =>
                setVendorName(
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
              placeholder="Address"
              value={address}
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
            />
          </div>

          <br />

          <button type="submit">
            Add Vendor
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
          <h2>Vendor List</h2>

          <input
            placeholder="Search Vendors..."
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
              <th>Vendor</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>

          <tbody>
            {filteredVendors.map(
              (vendor) => (
                <tr
                  key={vendor.id}
                >
                  <td>
                    {
                      vendor.vendor_name
                    }
                  </td>

                  <td>
                    {vendor.email}
                  </td>

                  <td>
                    {vendor.phone}
                  </td>

                  <td>
                    {vendor.address}
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

export default Vendors;