import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import {
    signup,
    login,
    selectUser,
} from '../store/user/authSlice';



function LoaderComponent() {
    return (
        <div>
            <Spinner animation="border" variant="dark" />

        </div>
    );
}



function AuthScreen() {

    var user = useSelector(selectUser);
    const dispatch = useDispatch();


    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();



        setIsLoading(true);


        // handle form submission logic here
        if (isLogin) {
            dispatch(login({ email: email, password: password }));
        } else {

            dispatch(signup({ name: name, email: email, password: password }));
        }
        // console.log(name, email, password);
        setName("");
        setEmail("");
        setPassword("");

        setIsLoading(false);
    };

    const handleModeSwitch = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            {!isLoading ?

                <Form onSubmit={handleSubmit} className="p-3">
                    {!isLogin && (
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(event) => setName(event.target.value)} />
                        </Form.Group>
                    )}
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {isLogin ? 'Log in' : 'Sign up'}
                    </Button>
                    <Button variant="link" onClick={handleModeSwitch}>
                        {isLogin ? 'Create an account' : 'Already have an account?'}
                    </Button>
                </Form>
                :
                <LoaderComponent />}
        </div>
    );
}

export default AuthScreen;
