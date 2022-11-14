import dumbbellLoader from "../assets/loader.png";
import { useThemeColors } from "../contexts/Theme.context";

export default function Loader({ loading }) {
  const { theme, oppositeTheme } = useThemeColors();
  if (loading) {
    return (
      <div className={`d-flex flex-column bg-${theme} text-${oppositeTheme}`}>
    
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
        </div>
    );
  }

  return null;
}
