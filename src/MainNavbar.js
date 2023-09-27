import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Modal, Dropdown,Form, Row, Col, Container, Button } from 'react-bootstrap';
import Login from './Login';
import SignUp from './SignUp';
import axios from 'axios';

function EggNavbar() {
    const [searchQuery, setSearchQuery] = useState('');    
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false); // 로그인 상태를 나타내는 state 추가
    const [userEmail, setUserEmail] = useState(''); // 사용자 이메일을 저장할 state 추가
    const [isEmailValid, setIsEmailValid] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [email, setEmail] = useState('');
    const [showEmailInput, setShowEmailInput] = useState(true);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || ''); // 로컬 스토리지에서 액세스 토큰을 가져와 초기화
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || ''); // 로컬 스토리지에서 리프레시 토큰을 가져와 초기화

    const navigate = useNavigate();

    const handleLoginClick = () => {
        // 모달 열기 전에 상태 변수 초기화
        setEmail('');
        setIsRegistering(false); // 회원가입 화면이 아닌 상태로 초기화
        setIsEmailValid(''); // 이메일 유효성 검사 상태 초기화
        setLoginError(''); // 로그인 에러 초기화
    
        setShowEmailInput(false); // 로그인 버튼을 클릭하면 이메일 입력 란을 숨김
        setShowLoginModal(true);
    };

    const handleClose = () => {
      setShowLoginModal(false);
      setEmail('');
    };

    const handleLoginSuccess = (email, tokens) => {

        // 로그인이 성공하면 호출되는 함수
        setUserEmail(email); // 사용자 이메일 설정
        setAccessToken(tokens.accessToken); // 액세스 토큰 저장
        setRefreshToken(tokens.refreshToken); // 리프레시 토큰 저장
        localStorage.setItem('accessToken', tokens.accessToken); // 로컬 스토리지에 액세스 토큰 저장
        localStorage.setItem('refreshToken', tokens.refreshToken); // 로컬 스토리지에 리프레시 토큰 저장
        setLoggedIn(true); // 로그인 상태를 true로 설정
        handleClose(); // 모달 닫기
    };

    const handleSignUpSuccess = () => {
        // 회원가입 성공 후 실행할 작업을 여기에 추가합니다.
        setShowLoginModal(false); // 모달 닫기
        setLoggedIn(true);
        setUserEmail(email);
      };
    const isValidEmail = (email) => {
        // 간단한 이메일 유효성 검사를 위한 정규 표현식
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleContinueClick = async () => {
        try {
            if (!isValidEmail(email)) {
                // 이메일이 유효하지 않은 경우 경고창 표시
                window.alert('Please enter a valid email address.');
                return;
            }
            // 이메일이 서버에 있는지 확인
            const response = await axios.get(`/api/v1/users/checkEmail?email=${email}`);
            console.log(response)
            if (response.data === true) {
                setIsEmailValid(true); 
                setIsRegistering(false); // 이미 등록된 이메일이므로 회원가입 화면이 아닌 로그인 화면을 보여줌
                setLoginError(''); 
            } else {
                setIsEmailValid(false); 
                setIsRegistering(true); // 회원가입 양식을 보여줌
                setLoginError(''); 
            }
        } catch (error) {
            console.error('Error checking email', error);
            setLoginError('Error checking email'); // 오류 메시지 설정
        }
    };
    const handleEmailKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Enter 키의 기본 동작(새 줄 추가)을 방지합니다.
            handleContinueClick(); // "Continue with Email" 버튼을 클릭합니다.
        }
    };

    const handleLogout = async () => {
        try {
            // 클라이언트 측에서 로그아웃 처리
            setUserEmail(''); // 사용자 이메일 초기화
            setAccessToken(''); // 액세스 토큰 초기화
            setRefreshToken(''); // 리프레시 토큰 초기화
            localStorage.removeItem('accessToken'); // 로컬 스토리지에서 액세스 토큰 제거
            localStorage.removeItem('refreshToken'); // 로컬 스토리지에서 리프레시 토큰 제거
            
            setEmail('');
    
            // 서버로 로그아웃 요청 보내기
            const logoutData = {
                accessToken: accessToken, // 저장된 액세스 토큰 사용
                refreshToken: refreshToken, // 저장된 리프레시 토큰 사용
            };

            const response = await axios.post('/api/v1/users/logout');
            console.log(response)
            if (response.status === 200) {
                console.log('로그아웃 성공');
                // 이후 필요한 처리를 수행하세요 (예: 홈페이지로 이동)
            } else {
                console.error('로그아웃 실패');
            }
        } catch (error) {
            console.error('로그아웃 오류', error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src="/ditto_logo.jpg" alt="" width="32" height="32" className="d-inline-block align-text-top" />
                    </a>
                    <a className="navbar-brand" href="/">EGG</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav>
                                <Dropdown align="end" show={showProfileMenu} onToggle={(isOpen) => setShowProfileMenu(isOpen)}>
                                    <Dropdown.Toggle variant="link" id="profile-dropdown">
                                        <svg width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {loggedIn ? (
                                            <>
                                            <Dropdown.Item disabled>{userEmail}</Dropdown.Item>
                                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                            <Dropdown.Item>Save</Dropdown.Item>
                                            <Dropdown.Item>History</Dropdown.Item>
                                            </>
                                        ) : (
                                            <Dropdown.Item onClick={handleLoginClick}>Login <span style={{color:"gray",fontSize:"medium"}}>or</span> Signup</Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </div>
            </nav>
            <Modal show={showLoginModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Log in <span style={{color:"gray",fontSize:"medium"}}>or</span> Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="panel">
                        <Form>
                        {!isRegistering  ? (  //회원가입 양식이 아닐 때만 이메일 입력란을 표시
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" style={{ display: isEmailValid ? 'none' : 'block' }}>
                                <Col sm>
                                    <Form.Control
                                        type="email"
                                        placeholder="E-mail"
                                        onChange={handleEmailChange}
                                        onKeyDown={handleEmailKeyPress}
                                        value={email}
                                    />
                                </Col>
                                </Form.Group>
                        ) : null}
                        </Form>
                        {isEmailValid ? (
                            <div>
                                <Login email={email} onLoginSuccess={handleLoginSuccess} />
                            </div>
                        ) : (
                            <div>
                                {isRegistering ? (
                                // 회원가입 양식을 보여줄 경우
                                <div>
                                    <p style={{ color: 'gray' }}>
                                        This email is not registered.<br />
                                        Please proceed with membership registration.
                                    </p>
                                    <SignUp email={email} onSignUpSuccess={handleSignUpSuccess} setShowLoginModal={setShowLoginModal} /> {/* 이메일 prop 전달 */}
                                </div>
                                ) : (
                                    <div>
                                    <br />
                                        <div className="d-grid gap-1">
                                            <Button
                                                variant="secondary"
                                                type="button"
                                                onClick={handleContinueClick}
                                                onKeyDown={handleEmailKeyPress}
                                            >   
                                                Continue with Email
                                            </Button>
                                        </div>
                                    </div>
                                    )}
                            </div>
                            )}
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}


export default EggNavbar;
