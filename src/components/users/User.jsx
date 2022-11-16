export default function User({
  id,
  firstName,
  lastName,
  birthdate,
  email,
  weight,
  height,
}) {
  console.log("rendering user...");
  return (
    <tr>
      <th scope="row" className=" text-center">
        {id}
      </th>
      <td className="text-end px-4">{firstName + " " + lastName}</td>
      <td className="text-start px-4">{email}</td>
      <td className="text-end px-4">
        {new Date(birthdate).toLocaleDateString("en-BE", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}
      </td>
      <td className="text-center">{weight} kg</td>
      <td className="text-center">{height} m</td>
    </tr>
  );
}
