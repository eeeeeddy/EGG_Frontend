import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import 'react-datepicker/dist/react-datepicker.css';

function SignUp({ email: initialEmail }) {
    const [email, setEmail] = useState(initialEmail);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthYear, setBirthYear] = useState(null);
    const [birthMonth, setBirthMonth] = useState(null);
    const [birthDay, setBirthDay] = useState(null);
    const [gender, setGender] = useState('');

    useEffect(() => {
        // 이메일 prop이 변경될 때마다 이메일 입력란에 값을 설정
        if (initialEmail) {
            setEmail(initialEmail); // 초기 이메일 값을 설정할 때도 상태 변수 이름 사용
        }
    }, [initialEmail]);

    const handleSignUp = () => {
        // 회원가입 로직을 여기에 추가하세요
        console.log('Signing up with email:', email);
        console.log('Name:', name);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
        console.log('Birth Year:', birthYear);
        console.log('Birth Month:', birthMonth);
        console.log('Birth Day:', birthDay);
        console.log('Gender:', gender);
    };



    return (
        <Form>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="name" className='mt-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="password" className='mt-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className='mt-2'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </Form.Group>


            <Form.Group controlId="birthDate" className="mt-2">
                <Form.Label>Birth Day</Form.Label>
                <Row>
                    <Col>
                        <InputGroup>
                        <DatePicker
                                className="form-control"
                                selected={birthYear}
                                onChange={(date) => setBirthYear(date)}
                                dateFormat="yyyy"
                                showYearDropdown
                                minDate={new Date('1950-01-01')} // 최소 년도 (1950년)
                                maxDate={new Date()} // 최대 년도 (현재 연도까지)
                                placeholderText="Year"
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <DatePicker
                                className="form-control"
                                selected={birthMonth}
                                onChange={(date) => setBirthMonth(date)}
                                dateFormat="MM"                                
                                placeholderText="Month"
                                calendarOnly 
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <DatePicker
                                className="form-control"
                                selected={birthDay}
                                onChange={(date) => setBirthDay(date)}
                                dateFormat="dd"
                                placeholderText="Day"
                                calendarOnly 
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group controlId="gender" className='mt-2'>
                <Form.Label>Gender</Form.Label>
                <Row>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Male"
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={() => setGender('male')}
                        />
                    </Col>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Female"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={() => setGender('female')}
                        />
                    </Col>
                </Row>
            </Form.Group>

            <Button className='mt-5' variant="primary" onClick={handleSignUp}>
                Sign Up
            </Button>
        </Form>
    );
}

export default SignUp;