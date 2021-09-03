import { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Toolbar from "./Toolbar";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import routes from "../routes/routes";

const UserManagement = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [users, setUsers] = useState([{}]);
  const [accessToken, setAccessToken] = useState("");
  const loadingRef = useRef(true);

  const getAccessToken = async () => {
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: process.env.REACT_APP_AUTH0_SCOPE,
    });
    setAccessToken(token);
  };

  useEffect(() => {
    if (loadingRef.current) {
      getAccessToken();
      if (accessToken.length > 1) {
        const getUsers = async () => {
          const response = await fetch(`${routes.SERVER}api/users`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          setUsers(data);
        };
        getUsers();
      }
    }
  });

  //selectAll checkbox
  const selectAll = (e) => {
    const checkboxes = document.getElementsByName("foo");
    e.target.checked
      ? checkboxes.forEach((checkbox) => (checkbox.checked = true))
      : checkboxes.forEach((checkbox) => (checkbox.checked = false));
  };
  const getIds = () => {
    const selectedUsers = [];
    const checkboxes = document.getElementsByName("foo");
    checkboxes.forEach(
      (checkbox) => checkbox.checked && selectedUsers.push(checkbox.id)
    );
    return selectedUsers;
  };
  const handleBlock = (isBlock) => {
    const users = getIds();
    statusChanging(users, isBlock);
  };
  const handleDelete = () => {
    const users = getIds();
    deleteUsers(users);
  };

  const statusChanging = async (selectedUsers, blockedStatus = false) => {
    const response = await fetch(`${routes.SERVER}api/users`, {
      method: "PATCH",
      body: JSON.stringify({ selectedUsers, blockedStatus }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
  };

  const deleteUsers = async (selectedUsers) => {
    const response = await fetch(`${routes.SERVER}api/users`, {
      method: "DELETE",
      body: JSON.stringify({ selectedUsers }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
  };

  return (
    <>
      <div className="container">
        <div className="table-responsive">
          <div className="bg-secondary mt-2 py-2 px-2">
            <span className="fs-2 mb-0 d-flex justify-content-between text-info ">
              User Managament Table
              <div className="d-flex align-items-center">
                <Toolbar
                  handleBlock={handleBlock}
                  handleDelete={handleDelete}
                />
              </div>
            </span>
          </div>

          <table className="table">
            <TableHeader selectAll={selectAll} />
            <TableBody users={users} />
          </table>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
