import { CiDumbbell } from "react-icons/ci";
import { useState } from "react";

const Dumbbell = ({ selected, index, onSelect }) => (
  <CiDumbbell
    color={selected ? "red" : "grey"}
    onClick={() => onSelect(index + 1)}
  />
);

export default function DumbbellIntensity({ selectedDumbbells , onSelect= f => f}) {
  const [dumbbells, setDumbbells] = useState(selectedDumbbells);
  const arrayOfFive = new Array(5).fill(0);

  const changeDumbbellIntensity = (newIntensity) => {
    setDumbbells(newIntensity);
  };

  return (
    <>
      {arrayOfFive.map((_, index) => (
        <Dumbbell
          key={index}
          index={index}
          selected={index < dumbbells}
          onSelect={changeDumbbellIntensity}
        />
      ))}
      <br />
      {dumbbells} out of 5 Dumbbells
    </>
  );
}
