import "../style/pageloader.css";

const PageLoader = () => {
  return (
    <div className="page-loader">
      <div className="loader-wrapper">
        <div className="glow-spinner"></div>

        <div className="loader-text">
          Loading Gifts
          <span className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
