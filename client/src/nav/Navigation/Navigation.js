import React, { useContext } from "react";
import { UserContext } from "../../App.js";
import { Link, useMatch } from "@reach/router";
import UserLogo from "./UserLogo.js";

const Navigation = ({ logOutCallback }) => {
  const [user] = useContext(UserContext);

  const useShowRegister = () => {
    const match = useMatch("/register");
    if (match !== null) return null;
    else if (!user.accesstoken)
      return (
        <Link className="nav-link" to="/register">
          Register<span className="sr-only">(current)</span>
        </Link>
      );
    else return null;
  };

  const showLogOut = () => {
    if (user.accesstoken)
      return (
        <p
          className="nav-link"
          onClick={logOutCallback}
          style={{ paddingTop: "1.3rem" }}
          id="logoutButton"
        >
          LogOut
        </p>
      );
    else return null;
  };

  const useShowLogin = () => {
    const match = useMatch("/login");
    if (match !== null) return null;
    else if (!user.accesstoken)
      return (
        <Link className="nav-link" to="/login">
          Login{" "}
          <svg
            className="bi bi-box-arrow-in-right"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8.146 11.354a.5.5 0 010-.708L10.793 8 8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 011 8z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M13.5 14.5A1.5 1.5 0 0015 13V3a1.5 1.5 0 00-1.5-1.5h-8A1.5 1.5 0 004 3v1.5a.5.5 0 001 0V3a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v10a.5.5 0 01-.5.5h-8A.5.5 0 015 13v-1.5a.5.5 0 00-1 0V13a1.5 1.5 0 001.5 1.5h8z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">(current)</span>
        </Link>
      );
    else return null;
  };

  const showSettings = () => {
    if (user.accesstoken)
      return (
        <Link className="nav-link" to="/settings">
          <svg
            className="bi bi-gear"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      );
    else return null;
  };

  const useShowMyShows = () => {
    const match = useMatch("/");
    if (match !== null)
      return (
        <Link className="nav-link" to="/MyTvShows">
          MyShows<span className="sr-only">(current)</span>
        </Link>
      );
    else return null;
  };

  const useShowTvShows = () => {
    const match = useMatch("/");

    if (match !== null) return null;
    else
      return (
        <Link className="nav-link" to="/">
          TvShows<span className="sr-only">(current)</span>
        </Link>
      );
  };

  const useShowMovies = () => {
    const match = useMatch("/Movies");
    if (match !== null) return null;
    else
      return (
        <Link className="nav-link" to="/Movies">
          Movies<span className="sr-only">(current)</span>
        </Link>
      );
  };

  const useShowMyMovies = () => {
    const match = useMatch("/Movies");
    if (match !== null)
      return (
        <Link className="nav-link" to="/MyMovies">
          MyMovies<span className="sr-only">(current)</span>
        </Link>
      );
    else return null;
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav" style={{ fontSize: "1.7rem" }}>
            <li className="nav-item active">
              <a className="nav-link" href=" ">
                Applications <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">{useShowMyShows()}</li>
            <li className="nav-item active">{useShowMyMovies()}</li>

            <li className="nav-item active">{useShowTvShows()}</li>
            <li className="nav-item active">{useShowMovies()}</li>
            <li className="nav-item active">{useShowLogin()}</li>
            <li className="nav-item active">{useShowRegister()}</li>
            <li className="nav-item active">{showLogOut()}</li>
            <li className="nav-item active">
              <a
                className="nav-link"
                href="https://github.com/Edd-Venv/Book-App"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub<span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">{showSettings()}</li>
          </ul>
        </div>
        <div>
          <GoPerson />
          <UserLogo />
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
