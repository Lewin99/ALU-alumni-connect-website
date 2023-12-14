import React, { useState } from "react";
import "./Styles/loggedInAddEvents.css";

function LoggedInAddEvents() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Select a category");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [timeFrom, setFrom] = useState("");
  const [timeTo, setTo] = useState("");

  const handleSaveEvent = async (e) => {
    e.preventDefault();

    const body = {
      title,
      description,
      category,
      date,
      location,
      timeFrom,
      timeTo,
    };

    try {
      const response = await fetch(
        "https://alumini-connect.onrender.com/api/events",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("saved");
        alert("your event has been saved");
        setTitle("");
        setDescription("");
        setCategory("Select a category");
        setDate("");
        setLocation("");
        setFrom("");
        setTo("");
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
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
      <div className="container mt-4" id="events">
        <form onSubmit={handleSaveEvent} className="p-4 rounded" id="formmy">
          <h3 className="mb-4 text-light p-4">Create Event</h3>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Event Title"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Event Description"
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Select a category">Select a category</option>
              <option value="networking">Networking</option>
              <option value="professional development">
                Professional Development
              </option>
              <option value="campus events">Campus Events</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              placeholder="Event Date"
            />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="Location"
            />
          </div>
          <div className="form-group">
            <label>From:</label>
            <input
              type="time"
              className="form-control"
              value={timeFrom}
              onChange={(e) => setFrom(e.target.value)}
              required
              placeholder="Event Start Time"
            />
          </div>
          <div className="form-group">
            <label>To:</label>
            <input
              type="time"
              className="form-control"
              value={timeTo}
              onChange={(e) => setTo(e.target.value)}
              required
              placeholder="Event End Time"
            />
          </div>
          <div className="p-5">
            <button
              type="submit"
              className="btn d-flex align-items-start"
              id="event-button"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoggedInAddEvents;
