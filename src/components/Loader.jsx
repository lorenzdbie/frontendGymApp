import dumbbellLoader from "/logos/loader.png";
import { useThemeColors } from "/src/contexts/Theme.context.jsx";

export default function Loader({ loading }) {
  const { theme, oppositeTheme } = useThemeColors();
  if (loading) {
    return (
      <div className={`d-flex flex-column bg-${theme} text-${oppositeTheme}`} data-cy="loading">
    
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
