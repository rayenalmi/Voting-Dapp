import { Link } from "react-router-dom";
import VotingLogo from '../assets/VotingLogo.jpeg';
function Navbar() {
    return (
        <div className="bg-light">
            <nav className="container">
                <div className="navbar navbar-expand-lg navbar-light">
                    <a className="navbar-brand me-2" href="/">
                        <img
                            src={VotingLogo}
                            height="75px"
                            alt="Classy Logo"
                            loading="lazy"
                        />
                    </a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"></li>
                        </ul>

                        <div className="d-flex align-items-center">
                            <Link to="/Signup">
                                <button
                                    type="button"
                                    className="btn btn-outline-dark rounded-5 px-3 me-2"
                                >
                                    à propos de nous
                                </button>
                            </Link>
                            <Link to="/Signin">
                                <button type="button" className="btn btn-dark rounded-5 px-3">
                                    Contactez-nous
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;