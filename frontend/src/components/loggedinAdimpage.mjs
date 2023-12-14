import React, { useState, useEffect } from "react";
import "./Styles/loggedInMyEvents.css";

function LoggedInAdminPage() {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const response = await fetch(
          "https://alumini-connect.onrender.com/api/users"
        );
        if (response.ok) {
          const data = await response.json();
          setRegisteredUsers(data);
        } else {
          console.error(
            "Error fetching registered users:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching registered users:", error);
      }
    };

    const fetchRegisteredEvents = async () => {
      try {
        const response = await fetch(
          "https://alumini-connect.onrender.com/api/events"
        );
        if (response.ok) {
          const data = await response.json();
          setRegisteredEvents(data);
        } else {
          console.error(
            "Error fetching registered events:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching registered events:", error);
      }
    };

    fetchRegisteredUsers();
    fetchRegisteredEvents();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(
        `https://alumini-connect.onrender.com/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setRegisteredUsers((users) =>
          users.filter((user) => user._id !== userId)
        );
        alert("User has been deleted");
      } else {
        console.log("Deleting user failed");
      }
    } catch (error) {
      console.log("Error occurred while deleting user", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(
        `https://alumini-connect.onrender.com/api/events/${eventId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setRegisteredEvents((events) =>
          events.filter((event) => event._id !== eventId)
        );
        alert("Event has been deleted");
      } else {
        console.log("Deleting event failed");
      }
    } catch (error) {
      console.log("Error occurred while deleting event", error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleSaveUser = async (user) => {
    try {
      const response = await fetch(
        `https://alumini-connect.onrender.com/api/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        setRegisteredUsers((users) =>
          users.map((u) => (u._id === user._id ? user : u))
        );

        setEditingUser(null);
        alert("User has been updated");
      } else {
        console.error("Updating user failed");
      }
    } catch (error) {
      console.error("Error occurred while updating user", error);
    }
  };

  return (
    <div>
      <div className="addev-header">
        <img
          src="https://i.ibb.co/60bCpw4/ALU-logo.webp"
          alt="ALU-logo"
          border="0"
        />
        <h3 className="mb-4 addev-heading">ALU ALUMNI CONNECT</h3>
      </div>

      <div className="wrapper container">
        <h3 className="addev-heading">Registered Users</h3>
        {registeredUsers.length > 0 ? (
          registeredUsers.map((user) => (
            <div className="card container" id="event-wrapper" key={user._id}>
              <div className="card-body d-md-flex">
                {editingUser && editingUser._id === user._id ? (
                  <form>
                    <div className="card-text">
                      <div>
                        <strong>First Name</strong>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={editingUser.firstname}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              firstname: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="card-text">
                      <div>
                        <strong>Last Name</strong>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={editingUser.lastname}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              lastname: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="card-text">
                      <div>
                        <strong>Username</strong>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={editingUser.username}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              username: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="card-text">
                      <div>
                        <strong>Email</strong>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={editingUser.email}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div
                      className="btn-group p-1 mb-3"
                      role="group"
                      aria-label="User Actions"
                    >
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleSaveUser(editingUser)}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="card-text">
                      <div>
                        <strong>Names</strong>
                      </div>
                      <div>{`${user.firstname} ${user.lastname}`}</div>
                    </div>
                    <div className="card-text">
                      <div>
                        <strong>Username</strong>
                      </div>
                      <div>{user.username}</div>
                    </div>
                    <div className="card-text">
                      <div>
                        <strong>Email</strong>
                      </div>
                      <div>{user.email}</div>
                    </div>

                    <div
                      className="btn-group p-1 mb-3"
                      role="group"
                      aria-label="User Actions"
                    >
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No registered users available.</p>
        )}
      </div>

      <div className="wrapper container">
        <h3 className="addev-heading">Registered Events</h3>
        {registeredEvents.length > 0 ? (
          registeredEvents.map((event) => (
            <div className="card container" id="event-wrapper" key={event._id}>
              <div className="card-body d-md-flex">
                <div className="card-text">
                  <div>
                    <strong>Event Title</strong>
                  </div>
                  <div>{event.title}</div>
                </div>
                <div className="card-text">
                  <div>
                    <strong>Description</strong>
                  </div>
                  <div>{event.description}</div>
                </div>
                <div className="card-text">
                  <div>
                    <strong>Category</strong>
                  </div>
                  <div>{event.category}</div>
                </div>
                <div className="card-text">
                  <div>
                    <strong>Time</strong>
                  </div>
                  <div>{`${event.timeFrom} - ${event.timeTo}`}</div>
                </div>
                <div className="card-text">
                  <div>
                    <strong>Location</strong>
                  </div>
                  <div>{event.location}</div>
                </div>

                <div
                  className="btn-group p-1 mb-3"
                  id="buttdiv"
                  role="group"
                  aria-label="Event Actions"
                >
                  <button
                    type="button"
                    className="btn btn-danger"
                    id="butt"
                    onClick={() => handleDeleteEvent(event._id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No registered events available.</p>
        )}
      </div>
    </div>
  );
}

export default LoggedInAdminPage;
