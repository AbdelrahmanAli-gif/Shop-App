function HorizontalLine({ width = "50%" }) {
  return (
    <div
      style={{
        border: "1px solid var(--activeFontColor)",
        width,
      }}
    ></div>
  );
}

export default HorizontalLine;
