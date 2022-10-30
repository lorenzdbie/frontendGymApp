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
      <th scope="row">{id}</th>
      <td className="text-start">{firstName + " " + lastName}</td>
      <td className="text-start">{email}</td>
      <td className="text-end">
        {new Date(birthdate).toLocaleDateString("en-BE", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}
      </td>
      <td className="text-end">{weight}kg</td>
      <td className="text-end">{height}m</td>
    </tr>
  );
}
