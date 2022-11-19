import { Container, Stack } from '@mui/material';

function LoginLayout({ children }: any): JSX.Element {
    return (
        <div className="login">
            <Container
                component={Stack}
                direction="column"
                justifyContent="center"
                maxWidth="sm"
            >
                {children}
            </Container>
        </div>
    );
}

export default LoginLayout;
