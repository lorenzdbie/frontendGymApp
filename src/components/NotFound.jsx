import dumbbellLoader from "../assets/loader.png";
import { useThemeColors } from "../contexts/Theme.context";

export default function NotFound() {
  const { theme, oppositeTheme } = useThemeColors();

  return (
    <div
      className={`d-flex flex-column mt-5 vh-100 bg-${theme} text-${oppositeTheme}`}
    >
      <div className="divSpin">
        <img
          className="dumbbellSpin resize"
          src={dumbbellLoader}
          alt="loader"
        />
      </div>
      <div className=" f-flex flex-row justify-content-center">
        <header
          className={`text-center text-${oppositeTheme}`}
          Style="font-size:4em"
        >
          Page not found!!!
        </header>
      </div>
    </div>
  );
}
