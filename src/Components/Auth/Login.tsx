import {useState} from 'react';
import axios, {AxiosError} from 'axios';
import {useNavigate, NavigateFunction} from 'react-router-dom';
import {Alert, Button, FormControl, Paper, TextField} from '@mui/material';


interface ILoginResponse {
    data: {
        access_token: string;
        expires_in: number;
    }
}

const LoginAction: (login: string, password: string) => Promise<any> = (
    login: string,
    password: string,
): Promise<ILoginResponse> => axios.post('/api/login', {
    login,
    password,
});

function Login() {
    const navigate: NavigateFunction = useNavigate();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const res = await LoginAction(user, password);
            const {access_token, expires_in} = res.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('expires_in', expires_in.toString());
            setSuccess(true);
            setError('');
            setTimeout(() => navigate('/elements'), 2000);
        } catch (err) {
            if (err instanceof AxiosError) {
                setSuccess(false);
                setError(err.response?.data.message?.toString() || 'Error');
            }
        }
    };
    return (
        <Paper elevation={3}>
            <FormControl
                component="form"
                fullWidth
                id="login-form"
                data-testid="login"
                onSubmit={(event) => submitForm(event)}
            >
                <TextField
                    fullWidth
                    name="user"
                    id="user"
                    label="Name"
                    variant="filled"
                    required
                    onChange={(event) => setUser(event.target.value)}
                />
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    variant="filled"
                    required
                    fullWidth
                    onChange={(event) => setPassword(event.target.value)}
                />
                {error && <Alert severity="error" data-testid="error">{error}</Alert>}
                {success && <Alert severity="success">Successfully logged in</Alert>}
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Login
                </Button>
            </FormControl>
        </Paper>
    );
}

export default Login;
