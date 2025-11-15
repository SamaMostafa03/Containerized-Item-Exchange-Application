import { Box } from '@mui/material';
import { Signin, AccountIntro } from '../components';

const SignIn = () => (
  <Box className="signup-container">
    <AccountIntro title="Welcome Back " text="Login into jack trades" />
    <Signin />
  </Box>
);

export default SignIn;
