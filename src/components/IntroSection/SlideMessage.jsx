function SlideMessage({ width }) {
  const widthStyle = {
    width: width * 100 + "%",
  };
  return (
    <span className="slide-text shrink-0 whitespace-nowrap" style={widthStyle}>
      • Welcome to our store •
    </span>
  );
}

export default SlideMessage;
