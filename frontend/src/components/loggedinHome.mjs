import React, { useState, useEffect } from "react";
import "./Styles/loggedInHome.css";
import useAuth from "../hooks/useAuth.mjs";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

function LoggedInHome() {
  const [events, setEvents] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://alumini-connect.onrender.com/api/events"
        );
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Error fetching events:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = async (event) => {
    try {
      const registrationData = {
        title: event.title,
        description: event.description,
        category: event.category,
        date: event.date,
        location: event.location,
        timeFrom: event.timeFrom,
        timeTo: event.timeTo,
      };

      const response = await fetch(
        "https://alumini-connect.onrender.com/api/registered",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          body: JSON.stringify(registrationData),
        }
      );

      if (response.ok) {
        alert("You have registered to attend this event");
        console.log("Registration successful");
      } else {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse.message || "Error registering for the event";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error registering for the event:", error);
    }
  };

  return (
    <div className="Home">
      <div className="addev-header">
        <img
          src="https://i.ibb.co/60bCpw4/ALU-logo.webp"
          alt="ALU-logo"
          border="0"
        />
        <h3 className="mb-4 addev-heading">ALU ALUMNI CONNECT</h3>
      </div>
      <div className="container">
        <h3 className="addev-heading p-5">Upcoming Events</h3>
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event, index) => (
            <div className="card mb-3 event-card" key={index}>
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <div className="card-text">
                  <div className="card-body-desc">
                    <strong>Description:</strong> {event.description}
                    <br />
                  </div>
                  <div className="card-body-date">
                    <strong>Date:</strong> {formatDate(event.date)}
                  </div>
                  <br />
                  <div className="card-body-time">
                    <strong>Time:</strong>
                    {event.timeFrom} - {event.timeTo}
                  </div>
                  <br />
                  <div className="card-body-location">
                    <strong>Location:</strong> {event.location}
                  </div>
                  <br />
                  <div className="card-body-category">
                    <strong>Category:</strong> {event.category}
                  </div>
                </div>
                <button
                  className="btn"
                  id="register-button"
                  onClick={() => handleRegister(event)}
                >
                  Register
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No upcoming events available.</p>
        )}
      </div>
    </div>
  );
}

export default LoggedInHome;
