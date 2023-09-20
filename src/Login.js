import React, { useState } from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import SignUp from './SingUp';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleContinueClick = () => {
      // 이메일이 회원 목록에 있는지 확인 (시뮬레이션)
      const isEmailRegistered = checkEmailInServer(email);
  
      if (isEmailRegistered) {
        setIsEmailValid(true); // 이메일이 유효하면 상태를 true로 설정
      } else {
        setIsRegistering(true); // 회원가입 양식을 보여줌
      }
    };
  
    const checkEmailInServer = (email) => {
      // 이 부분에서 서버와 통신하여 이메일 확인 (시뮬레이션)
      return false; // 가상으로 true 반환 (시뮬레이션)
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleLoginClick = () => {
      // 패스워드를 사용하여 로그인
      console.log('Login in with email:', email, 'password:', password);
  
      // 이후 로그인 성공 또는 실패 처리를 진행할 수 있습니다.
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
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Col sm>
              <Form.Control
                type="email"
                placeholder="E-mail"
                onChange={handleEmailChange}
                onKeyPress={handleEmailKeyPress} // Enter 키 핸들링 추가
                value={email}
              />
            </Col>
          </Form.Group>
          {isEmailValid ? (
            <div>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Col sm>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    value={password}
                  />
                </Col>
              </Form.Group>
              <br />
              <div className="d-grid gap-1">
                <Button
                  variant="secondary"
                  type="submit"
                  onClick={handleLoginClick}>
                  Login
                </Button>
              </div>
            </div>
          ) : (
            <div>
            {isRegistering ? (
              // 회원가입 양식을 보여줄 경우
              <div>
                <br />
                <p style={{ color: 'red' }}>Invalid email. Please sign up.</p>
                <SignUp />
              </div>
            ) : (
              // 회원가입 양식을 보이지 않을 경우
              <div>
                <br />
              <div className="d-grid gap-1">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleContinueClick}
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