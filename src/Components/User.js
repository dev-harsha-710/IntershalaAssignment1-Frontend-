import React, { useState, useEffect, useContext } from "react";
import UserItem from "./UserItem";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import UserState from "../Context/Users/UserContext";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Filter from "./Filter";
import Typography from "@mui/material/Typography";

const User = () => {
  const [newUser, setNewUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    avatar: "",
    domain: "",
    available: "",
  });

  const context = useContext(UserState);
  const { user, addUser, getUser, filterData } = context;
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    newUser.available = String(true) === newUser.available;
    addUser(newUser);
  };

  const handleClick = () => {
    window.location.reload();
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const usersPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = user.slice(startIndex, endIndex);
  const filterUsers = filterData.slice(startIndex, endIndex);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <Filter isModal={false} />
          </div>
          <div className="col-md-8">
            <div className="row">
              {filterData.length > 0 ? (
                <>
                  <div className="col-md-12">
                    <div className="my-5">
                      <div className="container">
                        <div className="d-flex">
                          <button
                            className="mini ui button"
                            onClick={handleClick}
                          >
                            <i className="arrow left icon"></i>
                          </button>
                          <h1>Filter Information</h1>
                        </div>
                      </div>
                      <div className="row">
                        {filterUsers.map((user) => (
                          <div className="col-md-3" key={user.id}>
                            <UserItem user={user} />
                          </div>
                        ))}
                      </div>
                      <Stack
                        spacing={3}
                        direction="row"
                        justifyContent="center"
                        sx={{ marginTop: "20px" }}
                      >
                        <Pagination
                          count={Math.ceil(filterData.length / usersPerPage)}
                          size="large"
                          page={currentPage}
                          onChange={(_, value) => setCurrentPage(value)}
                        />
                      </Stack>
                    </div>
                  </div>
                </>
              ) : (
                <div className="col-md-12">
                  <div className="my-5">
                    <div className="container">
                      <div className="d-flex justify-content-between">
                        <h1>User Information</h1>
                        <button
                          className="ui active button col-sm-2"
                          data-bs-toggle="modal"
                          data-bs-target="#addUserModal"
                        >
                          <i className="plus icon"></i>
                          new user
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      {currentUsers.map((user) => (
                        <div className="col-md-4" key={user.id}>
                          <UserItem user={user} />
                        </div>
                      ))}
                    </div>
                    <Stack
                      spacing={3}
                      direction="row"
                      justifyContent="center"
                      sx={{ marginTop: "20px" }}
                    >
                      <Pagination
                        count={51}
                        size="large"
                        page={currentPage}
                        onChange={(_, value) => setCurrentPage(value)}
                      />
                    </Stack>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
