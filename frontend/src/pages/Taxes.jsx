export default function Taxes() {
  return (
    <>
      <h1>Taxes</h1>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"20px"}}>

        <div>
          <h2>Schedule C</h2>
          <h1>18</h1>
        </div>

        <div>
          <h2>Schedule E</h2>
          <h1>26</h1>
        </div>

        <div>
          <h2>Schedule F</h2>
          <h1>12</h1>
        </div>

        <div>
          <h2>Unmapped</h2>
          <h1>3</h1>
        </div>

      </div>
    </>
  );
}
