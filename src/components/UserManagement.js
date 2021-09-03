import { useEffect, useState, useRef } from "react";
import Toolbar from "./Toolbar";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import routes from "../routes/routes";

const UserManagement = () => {
  const [users, setUsers] = useState([{}]);
  const loadingRef = useRef(true);

  useEffect(() => {
    if (loadingRef.current) {
      const getUsers = async () => {
        const response = await fetch(`${routes.LOCALHOST}api/users`);
        const data = await response.json();
        setUsers(data);
      };
      getUsers();
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

  //handle the block button
  const handleBlock = () => {
    const users = getIds();
    statusChanging(users, true);
  };

  //handle the unblock button
  const handleUnBlock = () => {
    const users = getIds();
    statusChanging(users, false);
  };

  const handleDelete = () => {
    const users = getIds();
    deleteSelectedUsers(users);
  };

  const statusChanging = async (selectedUsers, blockedStatus = false) => {
    const response = await fetch(`${routes.LOCALHOST}api/users`, {
      method: "PATCH",
      body: JSON.stringify({ selectedUsers, blockedStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
  };

  const deleteSelectedUsers = async (selectedUsers) => {
    const response = await fetch(`${routes.LOCALHOST}api/users`, {
      method: "DELETE",
      body: JSON.stringify({ selectedUsers }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
  };
  // console.log(users);
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
                  handleUnBlock={handleUnBlock}
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
