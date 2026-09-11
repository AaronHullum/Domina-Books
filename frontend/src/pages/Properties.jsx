export default function Properties() {
  return (
    <>
      <h1>Properties</h1>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"20px"}}>

        <div>
          <h2>Properties</h2>
          <h1>12</h1>
        </div>

        <div>
          <h2>Units</h2>
          <h1>104</h1>
        </div>

        <div>
          <h2>Occupied</h2>
          <h1>98</h1>
        </div>

        <div>
          <h2>Vacant</h2>
          <h1>6</h1>
        </div>

      </div>
    </>
  );
}
