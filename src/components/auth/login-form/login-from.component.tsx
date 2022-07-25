import { Button, TextField, Link as MuiLink } from '@mui/material';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../apis/auth.api';
import { User } from '../../../models/User';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [emailErrored, setEmailErrored] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErrored, setPasswordErrored] = useState(false);
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const handleLogin = async () => {
        if (!username)
            setEmailErrored(true)
        else
            setEmailErrored(false)
        if (!password)
            setPasswordErrored(true)
        else
            setPasswordErrored(false)
        try {
            const response = (await login({ username, password })) as { data: User };
            localStorage.setItem("accessToken", response.data.accessToken)
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center items-center flex-col h-screen gap-8">
            <h1 className='text-6xl'>Cryptostats</h1>
            <div className="flex flex-col gap-2">
                <TextField
                    label="Email"
                    className='w-80'
                    type="email"
                    required
                    error={emailErrored}
                    helperText={emailErrored && "Please Entter a valid Email."}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    className='w-80'
                    type="password"
                    required
                    error={passwordErrored}
                    helperText={passwordErrored && "Password may not be empty."}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Link to='/signup' className='justify-self-start self-start mt-2'>
                    <MuiLink>Sign Up</MuiLink>
                </Link>
            </div>
            <Button variant='contained' className='w-80' onClick={handleLogin}>
                <span className='p-1'>Login</span>
            </Button>
        </div>
    )
};

export { LoginForm };