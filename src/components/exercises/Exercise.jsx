export default function Exercise(props) {
  const { id, name, muscleGroup, intensity } = props;

  return (
    <div className="exercise-box">
      <h3>{name}</h3>
      <p>id : {id}</p>
      <p>Active muscle groups: {muscleGroup}</p>
      <p>Intensity: {intensity}</p>
    </div>
  );
}
