import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function SignUp({ email: initialEmail }) {
    const [email, setEmail] = useState(initialEmail);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthDate, setBirthDate] = useState(null);
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
        console.log('Birth Date:', birthDate);
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

            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="birthDate">
                <Form.Label>Birth Date</Form.Label>
                <DatePicker
                    selected={birthDate}
                    onChange={(date) => setBirthDate(date)}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select birth date"
                />
            </Form.Group>

            <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                    as="select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Form.Control>
            </Form.Group>

            <Button variant="primary" onClick={handleSignUp}>
                Sign Up
            </Button>
        </Form>
    );
}

export default SignUp;