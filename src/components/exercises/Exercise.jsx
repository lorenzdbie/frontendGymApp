export default function Exercise({ id, name, muscleGroup}) {
  
  console.log("rendering exercise...");

  return (
    <div className="exercise-box">
  
      <p>id : {id}</p>
      <h3>{name}</h3>
      <p>Active muscle groups: {muscleGroup}</p>
  
    </div>
  );
}
