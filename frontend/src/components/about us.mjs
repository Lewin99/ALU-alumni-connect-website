import React from "react";
import "./Styles/about us.css";
import Header from "./header.mjs";
import Footer from "./footer.mjs";

function About() {
  return (
    <div>
      <Header />
      <div className="wrapper container">
        <div className="aboutImage">
          <img
            src="https://i.ibb.co/37Ssjdv/grdauates.jpg"
            alt="grdauates"
            border="0"
          />
        </div>
        <div className="aboutContents">
          <div className="container">
            <div className="row my-5">
              <div className="col">
                <h2>About Us</h2>
                <p>
                  Welcome to our Alumni Network! We are dedicated to fostering
                  connections and collaboration among the distinguished alumni
                  of our esteemed university. Our platform serves as a digital
                  hub for former students like you to reconnect, engage, and
                  stay informed about exciting alumni events and initiatives.
                </p>
              </div>
            </div>
            <div className="row my-5">
              <div className="col">
                <h2>Our Mission</h2>
                <p>
                  Our mission is to provide a thriving online community for our
                  alumni, facilitating interaction, knowledge-sharing, and the
                  organization of various alumni events. We believe in the power
                  of collective achievements, and we strive to be a testament to
                  the excellence and aspirations of our graduates.
                </p>
              </div>
            </div>
            <div className="row my-5">
              <div className="col">
                <h2>What We Offer</h2>
                <p>
                  As a registered alumni member, you'll have access to a range
                  of features and benefits, including:
                </p>
                <ul>
                  <li>
                    <b>Event Participation:</b> Alumni students can easily
                    browse, choose, and sign up for a diverse set of events,
                    including professional development seminars, networking
                    opportunities, and exciting campus events.
                  </li>
                  <li>
                    <b>Event Organization:</b> Organize your own events and
                    invite fellow alumni to join. We encourage you to share your
                    expertise and interests with the community.
                  </li>
                  <li>
                    <b>Event Management:</b> The Alumni Manager has the
                    privilege to oversee and modify event details, as well as
                    manage student records.
                  </li>
                </ul>
              </div>
            </div>
            <div className="row my-5">
              <div className="col">
                <h2>Why Join Us</h2>
                <p>
                  Our alumni network goes beyond the basic notion of a college
                  reunion. It is a vibrant, dynamic community where you can:
                </p>
                <ul>
                  <li>
                    <b>Connect:</b> Reconnect with former classmates,
                    professors, and peers to rekindle old friendships and
                    establish new ones.
                  </li>
                  <li>
                    <b>Grow:</b> Engage in insightful discussions and access
                    valuable resources for your personal and professional
                    growth.
                  </li>
                  <li>
                    <b>Celebrate:</b> Explore inspiring success stories and
                    celebrate the remarkable achievements of our alumni in
                    diverse fields.
                  </li>
                  <li>
                    <b>Contribute:</b> Make a meaningful impact by organizing
                    events, sharing your knowledge, and participating in our
                    collective journey of growth, excellence, and collaboration.
                  </li>
                </ul>
                <p>
                  Thank you for being a part of this incredible journey! Join
                  our alumni network and help us continue fostering the spirit
                  of unity, excellence, and progress that defines our
                  institution. Your journey doesn't end with graduation; it's
                  just the beginning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
