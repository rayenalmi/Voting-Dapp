/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from "react-router-dom";
import React, {  } from "react";
import '../css/sidebar.css';
import { useLocation } from "react-router-dom";




function Sidebar(props) {
    const history = useNavigate();

    let location = useLocation();

    const changelogout = () => {
        history("/SignIn");
        //window.location.reload(true);

        window.location.reload(false);
    };

    return (
        <>
            <div className="right-section">
                <div className="nav">
                    <div className="profile">
                        <p>Hey, <b>aaaa</b></p>
                        <small></small>
                    </div>
                </div>
            </div>
            <div className="col-1">
                <div className="sidebar">
                    <a href="/" className="logo">
                        <i className='bx bx-code-alt'></i>
                        <div className="logo-name"><span>Vote</span>Me</div>
                    </a>
                    <ul className="side-menu">
                        <li className={location.pathname === "/Vote" ? 'active' : ''}><a href="/Vote"><i className='bx bxs-dashboard'></i></a></li>

                        <Link to="/Vote">
                            <li className={location.pathname === "/Vote" ? 'active' : ''}>
                                <a  ><i className='bx bx-analyse'></i>Vote</a>
                            </li>
                        </Link>

                        <Link to="/ConsultVoting">
                            <li className={location.pathname === "/ConsultVoting" ? 'active' : ''} >
                                <a><i className='bx bx-message-square-dots'></i>Consult Voting</a>
                            </li>
                        </Link>
                    </ul>
                    <ul className="side-menu">
                        <li>
                            <a onClick={changelogout} className="logout">
                                <i className='bx bx-log-out-circle'></i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Sidebar;