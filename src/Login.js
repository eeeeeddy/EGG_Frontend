// Login.js
import React, { useState } from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import SignUp from './SignUp';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState('');
    const [isRegistering, setIsRegistering] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleContinueClick = async () => {
        try {
            // 이메일이 서버에 있는지 확인
            const response = await axios.get(`/users/checkEmail?email=${email}`);
            console.log(response)
            if (response.data.result.exists == true) {
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
    
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginClick = async () => {
        try {
            // 서버로 로그인 요청을 보냄
            const response = await axios.post('/users/login', {
                email,
                password,
            });
            // 로그인이 성공하면 토큰을 받아올 수 있음
            const token = response.data;
            // 이후 토큰을 사용하여 로그인 상태를 관리하거나 보호된 리소스에 접근 가능
            console.log('Login successful. Token:', token);
    
        } catch (error) {
            console.error('Error logging in', error);
            setLoginError('Invalid email or password'); // 오류 메시지 설정
            if (error.response && error.response.status === 400) {
                setPassword('');
            }else {
                console.log('Unknown error');
                setLoginError('Please enter according to email format'); // 다른 오류 메시지 설정
            }
        }
    };
    
    const handleEmailKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Enter 키의 기본 동작(새 줄 추가)을 방지합니다.
            handleContinueClick(); // "Continue with Email" 버튼을 클릭합니다.
        }
    };

    return (
        <Container className="panel">
            <Form>
                <br />
                {!isRegistering ? ( // 회원가입 양식이 아닐 때만 이메일 입력란을 표시
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
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
                {isEmailValid ? (
                    <div>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Col sm>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={handlePasswordChange}
                                    onKeyDown={handleEmailKeyPress}
                                    value={password}
                                />
                            </Col>
                        </Form.Group>
                        <br />
                        <div className="d-grid gap-1">
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={handleLoginClick}
                            >
                                Login
                            </Button>
                        </div>
                        {loginError && <p style={{ color: 'red'}}>{loginError}</p>}
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
                                <SignUp email={email} /> {/* 이메일 prop 전달 */}
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
            </Form>
        </Container>
    );
}
export default Login;
