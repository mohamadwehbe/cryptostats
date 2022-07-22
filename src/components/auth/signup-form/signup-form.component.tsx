import { Button, TextField, Link as MuiLink } from '@mui/material';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../apis/auth.api';
import { useCreateUserMutation } from '../../../apis/users.api';
import { useAppDispatch } from '../../../app/hooks';
import { User } from '../../../models/User';
import { setAuthState } from '../../../slices/auth.slice';

const SignupForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [emailErrored, setEmailErrored] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErrored, setPasswordErrored] = useState(false);
    const [createUser] = useCreateUserMutation();
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (!username)
            setEmailErrored(true)
        else
            setEmailErrored(false)
        if (!password)
            setPasswordErrored(true)
        else
            setPasswordErrored(false)
        try {
            await createUser({ username, password })
            const response = (await login({ username, password })) as { data: User };
            dispatch(setAuthState({ user: response.data }))
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
                <Link to='/login' className='justify-self-start self-start mt-2'>
                    <MuiLink>Login</MuiLink>
                </Link>
            </div>
            <Button variant='contained' className='w-80' onClick={handleSignUp}>
                <span className='p-1'>Sign Up</span>
            </Button>
        </div>
    )
};

export { SignupForm };