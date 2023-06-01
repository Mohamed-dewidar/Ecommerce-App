import React from 'react';
import './userAbout.css';
export default function UserAbout() {
  return (
    <div className="aboutContainer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#fdebd2"
          fill-opacity="1"
          d="M0,32L40,69.3C80,107,160,181,240,181.3C320,181,400,107,480,101.3C560,96,640,160,720,202.7C800,245,880,267,960,245.3C1040,224,1120,160,1200,154.7C1280,149,1360,203,1400,229.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
      <div className="aboutSection">
        <h3>A Community doing good </h3>
        <p>
          ECHO is a global online marketplace, where people come together to
          make, sell, buy, and collect unique items. We’re also a community
          pushing for positive change for small businesses, people, and the
          planet
        </p>
      </div>
      <div className="aboutSection">
        <h3> Support Independent Creators</h3>
        <p>
          There’s no ECHO warehouse – just millions of people selling the things
          they love. We make the whole process easy, helping you connect
          directly with makers to find something extraordinary.
        </p>
      </div>
      <div className="aboutSection">
        <h3>Peace of mind</h3>
        <p>
          Your privacy is the highest priority of our dedicated team. And if you
          ever need assistance, we are always ready to step in for support.
        </p>
      </div>
    </div>
  );
}
