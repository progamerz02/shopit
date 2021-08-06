import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { MDBDataTable } from "mdbreact";

import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("User deleted successfully!");
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, alert, history, isDeleted]);

  const deleteUserHandler = (id) => {
    deleteUser(id);
  };

  const setUsers = () => {
    const data = {
      columns: [
        { label: "User ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Email", field: "email", sort: "asc" },
        { label: "Created At", field: "createdAt", sort: "asc" },
        { label: "Admin", field: "admin", sort: "asc" },
        { label: "Actions", field: "actions" },
      ],
      rows: [],
    };
    if (users)
      users.forEach(({ _id: id, name, email, createdAt, role }) => {
        data.rows.push({
          id: id,
          name,
          email,
          admin: (
            <div>
              {role === "admin" ? (
                <i className="fa fa-check"></i>
              ) : (
                <i className="fa fa-times"></i>
              )}
            </div>
          ),
          createdAt: new Date(createdAt).toLocaleString("en-uk"),
          actions: (
            <Fragment>
              <Link to={`user/${id}`} className="btn btn-primary py-1 px-2">
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 mx-2"
                onClick={() => deleteUserHandler(id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
          ),
        });
      });

    return data;
  };

  return (
    <Fragment>
      <MetaData title="All Users" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Users</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUsers()}
                className="px-3"
                bordered
                striped
                hover
                responsive
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
