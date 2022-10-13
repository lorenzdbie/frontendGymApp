export default function Appointment(props){
  const {  user,
    date,
    training,
    startTime,
    endTime,
    intensity,} = props;

    return(
      <div className="text-bg-dark" style={{width:"50%"}}>
        {user.name} made an appointment on {date} for a {training.muscleGroup}training of {endTime.diff(startTime)} with an intensity of {intensity}.
      </div>
    );
}