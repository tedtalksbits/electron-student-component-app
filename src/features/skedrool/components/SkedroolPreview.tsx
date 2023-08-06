export const SkedroolPreview = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Course</th>
          <th>Location</th>
          <th>Days</th>
          <th>Time</th>
          <th>Instructor</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>CS 101</td>
          <td>Online</td>
          <td>MWF</td>
          <td>9:00am - 9:50am</td>
          <td>Dr. Smith</td>
          <td>
            <a href='mailto:drsmith@gmail.com'>Email</a>
          </td>
        </tr>
        <tr>
          <td>CS 102</td>
          <td>Online</td>
          <td>MWF</td>
          <td>10:00am - 10:50am</td>
          <td>Dr. Smith</td>
          <td>
            <a href='mailto:test1@gmail.com'>Email</a>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
