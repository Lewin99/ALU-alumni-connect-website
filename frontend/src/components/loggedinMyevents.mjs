import React, { useState, useEffect } from "react";
import "./Styles/loggedInMyEvents.css";

function LoggedInMyEvents() {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await fetch(
          "https://alumini-connect.onrender.com/api/registered"
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

    const fetchMyEvents = async () => {
      try {
        const response = await fetch(
          "https://alumini-connect.onrender.com/api/events/byorganizer"
        );
        if (response.ok) {
          const data = await response.json();
          setMyEvents(data);
        } else {
          console.error("Error fetching My Events:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching My Events:", error);
      }
    };

    fetchRegisteredEvents();
    fetchMyEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(
        `https://alumini-connect.onrender.com/api/registered/${eventId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setRegisteredEvents((events) =>
          events.filter((event) => event._id !== eventId)
        );
        alert("The clicked event has been canceled");
      } else {
        console.log("Canceling failed");
      }
    } catch (error) {
      console.log("Error occurred", error);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleSaveEvent = async (event) => {
    try {
      const response = await fetch(
        `https://alumini-connect.onrender.com/api/events/${event._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );

      if (response.ok) {
        const index = myEvents.findIndex((e) => e._id === event._id);
        if (index !== -1) {
          const updatedMyEvents = [...myEvents];
          updatedMyEvents[index] = { ...event };
          setMyEvents(updatedMyEvents);
        }

        setEditingEvent(null);
        alert("Event has been updated");
      } else {
        console.error("Updating event failed");
      }
    } catch (error) {
      console.error("Error occurred while updating event", error);
    }
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

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
        <h3 className="addev-heading">Events Registered To Attend</h3>
        {registeredEvents.length > 0 ? (
          registeredEvents.map((event, index) => (
            <div className="card container" id="event-wrapper" key={index}>
              <div className="card-body d-md-flex">
                <div className="card-text">
                  <div>
                    <strong>Event Title</strong>
                  </div>
                  <div>{event.title}</div>
                </div>
                <div className="card-text">
                  <div>
                    <strong>Event Description</strong>
                  </div>
                  <div>{event.description}</div>
                </div>
                <div className="card-text">
                  <div>
                    <strong>Date</strong>
                  </div>
                  <div>{formatDate(event.date)}</div>
                </div>
                <div className="card-text">
                  <div>
                    <strong>Time</strong>
                  </div>
                  <div>
                    {event.timeFrom} - {event.timeTo}
                  </div>
                </div>
                <div className="card-text">
                  <div>
                    <strong>Category</strong>
                  </div>
                  <div>{event.category}</div>
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
          <p>No saved events available.</p>
        )}
      </div>
      <div className="wrapper container">
        <h3 className="addev-heading">My Events</h3>
        {myEvents.length > 0 ? (
          myEvents.map((event, index) => (
            <div className="card container" id="event-wrapper" key={index}>
              <div className="card-body d-md-flex">
                {editingEvent && editingEvent._id === event._id ? (
                  <form>
                    <div className="card-text">
                      <div>
                        <strong>Event Title</strong>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={editingEvent.title}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="card-text">
                      <div>
                        <strong>Event Description</strong>
                      </div>
                      <div>
                        <textarea
                          value={editingEvent.description}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="card-text">
                      <div>
                        <strong>Date</strong>
                      </div>
                      <div>{formatDate(editingEvent.date)}</div>
                    </div>
                    <div className="card-text">
                      <div>
                        <strong>Time</strong>
                      </div>
                      <div>
                        {editingEvent.timeFrom} - {editingEvent.timeTo}
                      </div>
                    </div>
                    <div className="card-text">
                      <div>
                        <strong>Category</strong>
                      </div>
                      <div>{editingEvent.category}</div>
                    </div>
                    <div
                      className="btn-group p-1 mb-3"
                      role="group"
                      aria-label="Event Actions"
                    >
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleSaveEvent(editingEvent)}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="card-text">
                      <div>
                        <strong>Event Title</strong>
                      </div>
                      <div>{event.title}</div>
                    </div>
                    <div className="card-text">
                      <div>
                        <strong>Event Description</strong>
                      </div>
                      <div>{event.description}</div>
                    </div>
                    <div className="card-text">
                      <div>
                        <strong>Date</strong>
                      </div>
                      <div>{formatDate(event.date)}</div>
                    </div>
                    <div className="card-text">
                      <div>
                        <strong>Time</strong>
                      </div>
                      <div>
                        {event.timeFrom} - {event.timeTo}
                      </div>
                    </div>
                    <div className="card-text">
                      <div>
                        <strong>Category</strong>
                      </div>
                      <div>{event.category}</div>
                    </div>
                    <div
                      className="btn-group p-1 mb-3"
                      role="group"
                      aria-label="Event Actions"
                    >
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleEditEvent(event)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeleteEvent(event._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No events available in My Events.</p>
        )}
      </div>
    </div>
  );
}

export default LoggedInMyEvents;
