import { CiDumbbell } from "react-icons/ci";
import { memo, useCallback, useMemo } from "react";

const Dumbbell = memo(({ index, selected = false, onSelect = (f) => f }) => {
  const handleSelect = useCallback(() => {
    onSelect(index + 1);
  }, [index, onSelect]);

  return (
    <CiDumbbell
      size={36}
      color={selected ? "red" : "grey"}
      onClick={handleSelect}
      className="dumbell"
    />
  );
});

export default memo(function DumbbellIntensity({
  totalDumbbells = 5,
  selectedDumbbells = 0,
  onRate,
}) {
  const dumbbells = useMemo(() => [...Array(totalDumbbells)], [totalDumbbells]);

  return (
    <>
      {dumbbells.map((_, index) => (
        <Dumbbell
          key={index}
          index={index}
          selected={index < selectedDumbbells}
          onSelect={onRate}
        />
      ))}
      <br />
      <small>
        {selectedDumbbells} of {totalDumbbells} dumbbells
      </small>
    </>
  );
});
