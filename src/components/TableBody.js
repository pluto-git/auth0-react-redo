import { useAuth0 } from "@auth0/auth0-react";

const TableBody = ({ users }) => {
  const { logout, user } = useAuth0();

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
      {/* logout if the current logged user is blocked  */}
      {users &&
        /* eslint-disable-next-line */
        users.find((u) => {
          u.user_id === user.sub &&
            u.blocked === true &&
            logout({ returnTo: window.location.origin });
        })}
    </>
  );
};

export default TableBody;
