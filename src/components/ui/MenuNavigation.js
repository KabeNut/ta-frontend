import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../assets/css/components/ui/menuNavigation.css";
import { faCircleQuestion, faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faTable, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from "react-router-dom";

function MenuNavigation() {
    const location = useLocation();

    return (
        <div className="sidebar-container">
            <div className="sidebar-header">
                <h1 style={{
                    color: "#FFFFFF"
                }}>Hospital</h1>
            </div>
            <div className="sidebar-body">
                <nav className="sidebar-menu">
                    <NavLink to={'/home'} style={{ "textDecoration": "none" }}>
                        <div className={location.pathname === '/home' || location.pathname.slice(0, 7) === '/Detail' ? 'sidebar-menu-item active' : 'sidebar-menu-item inactive'}>
                            <div>
                                <FontAwesomeIcon icon={faClipboard} style={{ "marginLeft": 20 }} />
                                <span className="sidebar-menu-label">Vital Signs</span>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={'/Patient'} style={{ "textDecoration": "none" }}>
                        <div className={location.pathname === '/Patient' ? 'sidebar-menu-item active' : 'sidebar-menu-item inactive'}>
                            <div>
                                <FontAwesomeIcon icon={faUser} style={{ "marginLeft": 20 }} />
                                <span className="sidebar-menu-label">Patient Data</span>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={'/TableEws'} style={{ "textDecoration": "none" }}>
                        <div className={location.pathname === '/TableEws' ? 'sidebar-menu-item active' : 'sidebar-menu-item inactive'}>
                            <div>
                                <FontAwesomeIcon icon={faTable} style={{ "marginLeft": 20 }} />
                                <span className="sidebar-menu-label">EWS Table</span>
                            </div>
                        </div>
                    </NavLink>
                </nav>
            </div>
            <hr />
            <div className="sidebar-footer">
                <nav className="sidebar-menu">
                    <div className="sidebar-menu-item-inverse">
                        <div>
                            <FontAwesomeIcon icon={faCircleQuestion} style={{ "marginLeft": 20 }} />
                            <span className="sidebar-menu-label">Help</span>
                        </div>
                    </div>
                    <NavLink to={'/home'} style={{ "textDecoration": "none" }}>
                        <div className="sidebar-menu-item-inverse">
                            <div>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ "marginLeft": 20 }} />
                                <span className="sidebar-menu-label">Log Out</span>
                            </div>
                        </div>
                    </NavLink>
                </nav>
            </div>

        </div>
    );
};

export default MenuNavigation;