import React, { useState, useEffect } from "react";
import "./Styles/home.css";
import { Link } from "react-router-dom";
import Header from "./header.mjs";
import Footer from "./footer.mjs";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

function Home({ events }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (events.length > 0) {
      setLoading(false);
    }
  }, [events]);

  return (
    <div>
      <div className="header bg-danger">
        <Header />
      </div>
      <div className="d-none d-lg-block" id="homeBody"></div>

      <div className="home">
        <div className="container ">
          <h4 className="homeBodyHeader homebodyTitle">ALU ALUMNI CONNECT</h4>
          <div className="pbody d-none d-lg-block ">
            <h4>Welcome to our Alumni Network!</h4>
            <p className="p-4">
              <br />
              we are thrilled to have you here as part of our ever-growing
              community of accomplished and dedicated individuals. Our alumni
              network is more than just a collection of names; it's a testament
              to the collective achievements and aspirations of our graduates.
              Whether you're a recent graduate or a seasoned professional, our
              platform is designed to connect you with peers, share your
              experiences, and provide opportunities for networking and personal
              growth. Explore our vibrant community, discover inspiring success
              stories, and engage in insightful discussions. Join us in
              celebrating the journey of our alumni and the incredible impact
              they make in their respective fields. Together, we continue to
              foster the spirit of growth, excellence, and collaboration that
              defines our institution. Thank you for being a part of this
              incredible journey!
            </p>
          </div>
        </div>

        <div className="container">
          <h2 className="p-5">Upcoming Events</h2>

          {loading ? (
            <p>Loading events...</p>
          ) : events.length > 0 ? (
            events.map((event) => (
              <div className="card event-card" key={event._id}>
                <div className="card-bodyHome1">
                  <h5 className="event-card-title">{event.title}</h5>
                  <h6 className="event-card-subtitle">
                    Event Date: {formatDate(event.date)}{" "}
                  </h6>
                  <h6 className="event-card-subtitle">
                    Event Time: {event.timeFrom} - {event.timeTo}
                  </h6>
                  <Link to="/login" className="event-card-link">
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-dark">No upcoming events available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
