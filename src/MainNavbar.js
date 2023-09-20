import React from 'react';
import { useState } from 'react';
import { Navbar, Nav, Modal, Button} from 'react-bootstrap';
import Login from './Login';

function EggMainNavbar() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleLoginClick = () => {
      setShowLoginModal(true);
    };
  
    const handleClose = () => {
      setShowLoginModal(false);
    };

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img src="/ditto_logo.jpg" alt="" width="32" height="32" class="d-inline-block align-text-top" />
                    </a>
                    <a class="navbar-brand" href="/">EGG</a>
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav>
                                <Nav.Link style={{ color: 'black' }} href="/About">About</Nav.Link>
                                <Nav.Link style={{ color: 'black' }} href="/Pricing">Pricing</Nav.Link>
                                <Nav.Link style={{ color: 'black' }} onClick={handleLoginClick} >
                                    <svg width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                </div>
            </nav>
            <Modal show={showLoginModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Login />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Login</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EggMainNavbar;
