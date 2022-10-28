export default function Exercise({ id, name, muscleGroup}) {
  

  return (
    <div className="exercise-box">
  
      <p>id : {id}</p>
      <h3>{name}</h3>
      <p>Active muscle groups: {muscleGroup}</p>
  
    </div>
  );
}
