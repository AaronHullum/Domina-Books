export default function Leases() {
  return (
    <>
      <h1>Leases</h1>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Lease #</th>
            <th>Tenant</th>
            <th>Property</th>
            <th>Monthly Rent</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>L-1001</td>
            <td>John Smith</td>
            <td>Oak Ridge Apartments</td>
            <td>$1,500</td>
            <td>01/01/2026</td>
            <td>12/31/2026</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
