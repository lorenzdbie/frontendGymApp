import { CiDumbbell } from "react-icons/ci";
import { memo, useCallback, useMemo } from "react";
import { useState } from "react";

const Dumbbell = memo(({ index, selected = false, onSelect = (f) => f }) => {
  const handleSelect = useCallback(() => {
    onSelect(index + 1);
  }, [index, onSelect]);

  return (
    <CiDumbbell size={30} color={selected ? "red" : "grey"} onClick={handleSelect} />
  );
});

export default function DumbbellIntensity({
  totalDumbbells = 5,
  selectedDumbbells = 0,
  onRate}) {

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
      <p>
        {selectedDumbbells} of {totalDumbbells} dumbbells
      </p>
    </>
  );
}

//   const [dumbbells, setDumbbells] = useState(selectedDumbbells);
//   const arrayOfFive = new Array(5).fill(0);

//   const changeDumbbellIntensity = (newIntensity) => {
//     setDumbbells(newIntensity);
//   };

//   return (
//     <>
//       {arrayOfFive.map((_, index) => (
//         <Dumbbell
//           key={index}
//           index={index}
//           selected={index < dumbbells}
//           onSelect={changeDumbbellIntensity}
//         />
//       ))}
//       <br />
//       {dumbbells} out of 5 Dumbbells
//     </>
//   );
// }
