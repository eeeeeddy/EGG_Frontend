import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Modal } from 'react-bootstrap';
import Login from './Login';

function EggNavbar() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    const handleClose = () => {
        setShowLoginModal(false);
    };

    const navigate = useNavigate();

    ;

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src="/ditto_logo.jpg" alt="" width="32" height="32" className="d-inline-block align-text-top" />
                    </a>
                    <a className="navbar-brand" href="/">EGG</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav>
                                {/* <Nav.Link style={{ color: 'black' }} href="/About">About</Nav.Link>
                                <Nav.Link style={{ color: 'black' }} href="/Pricing">Pricing</Nav.Link> */}
                                <Nav.Link style={{ color: 'black' }} onClick={handleLoginClick} >
                                    <svg width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </div>
            </nav>
            <Modal show={showLoginModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Log in <span style={{ color: "gray", fontSize: "medium" }}>or</span> Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Login />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default EggNavbar;
