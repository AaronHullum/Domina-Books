export default function Tenants() {
  return (
    <>
      <h1>Tenants</h1>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Property</th>
            <th>Unit</th>
            <th>Lease Start</th>
            <th>Lease End</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>John Smith</td>
            <td>Oak Ridge Apartments</td>
            <td>A101</td>
            <td>01/01/2026</td>
            <td>12/31/2026</td>
            <td>Active</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
