import React, { useState } from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import axios from 'axios';

function Login(props) {
    const { email: initialEmail } = props; 
    const [email, setEmail] = useState(props.email || '');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
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
            // 로그인 성공 시 부모 컴포넌트로 이메일 전달
            props.onLoginSuccess(email);
    
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
        }
    };

    return (
        <Container className="panel">
            <Form>
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
            </Form>
        </Container>
    );
}
export default Login;
