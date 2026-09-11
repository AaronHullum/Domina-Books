export default function Reconciliation() {
  return (
    <>
      <h1>Reconciliation</h1>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px"}}>

        <div>
          <h2>Book Balance</h2>
          <h1>$125,000</h1>
        </div>

        <div>
          <h2>Bank Balance</h2>
          <h1>$125,000</h1>
        </div>

        <div>
          <h2>Difference</h2>
          <h1>$0</h1>
        </div>

      </div>
    </>
  );
}
