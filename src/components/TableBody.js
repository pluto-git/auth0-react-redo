

const TableBody = ({ users }) => {

  return (
    <>
      <tbody>
        {users &&
          users.map((user, index) => {
            return (
              <tr key={index + 1}>
                <td key={index + 2}>
                  <input
                    key={index + 3}
                    className="form-check-input"
                    type="checkbox"
                    name="foo"
                    id={user.user_id}
                  />
                </td>
                <td key={index + 4}>{user.user_id}</td>
                <td key={index + 5}>{user.nickname}</td>
                <td key={index + 6}>{user.email}</td>
                <td key={index + 7}>
                  {user.created_at &&
                    user.created_at.split(".")[0].replace("T", " ") + " UTC"}
                </td>
                <td key={index + 8}>
                  {user.last_login &&
                    user.last_login.split(".")[0].replace("T", " ") + " UTC"}
                </td>
                <td key={index + 9}>
                  {user.blocked ? "Blocked" : "Unblocked"}
                </td>
              </tr>
            );
          })}
      </tbody>
    </>
  );
};
// <th scope="col">Id</th>
// <th scope="col">Name</th>
// <th scope="col">Email</th>
// <th scope="col">Registered</th>
// <th scope="col">Last login</th>
// <th scope="col">Status</th>
export default TableBody;
