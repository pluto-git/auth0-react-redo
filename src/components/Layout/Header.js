import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import UserManagement from "../UserManagement";
import Home from "../Home";
import Loading from "../Loading/Loading";

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand">
                User Management Demo
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarScroll"
                style={{ scrollHheight: "100px" }}
              >
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                  <li className="nav-item">
                    <Link to="/" className="nav-link active">
                      Home
                    </Link>
                  </li>
                </ul>
                <div className="d-flex">
                  <div className="btn-group" aria-label="Basic example">
                    {isAuthenticated && (
                      <Link to="/user-management">
                        <button className="btn btn-warning me-2" type="submit">
                          User Management
                        </button>
                      </Link>
                    )}
                    {!isAuthenticated ? (
                      <button
                        className="btn btn-warning me-2"
                        type="submit"
                        onClick={() => loginWithRedirect()}
                      >
                        Login
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        type="submit"
                        onClick={() =>
                          logout({ returnTo: window.location.origin })
                        }
                      >
                        Log Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <Switch>
            <Route exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/user-management"
              component={UserManagement}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default Header;
