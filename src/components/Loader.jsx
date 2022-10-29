import dumbbellLoader from "../assets/loader.png";

export default function Loader({ loading }) {
  if (loading) {
    return (
      <>
        <div className="divSpin">
          <img
            className="dumbbellSpin resize"
            src={dumbbellLoader}
            alt="loader"
          />
        </div>
        <div className="container">
          <span className="loading">L</span>
          <span className="loading">O</span>
          <span className="loading">A</span>
          <span className="loading">D</span>
          <span className="loading">I</span>
          <span className="loading">N</span>
          <span className="loading">G</span>
          <span className="loading">.</span>
          <span className="loading">.</span>
          <span className="loading">.</span>
        </div>
      </>
    );
  }

  return null;
}
