import { Box } from '@mui/material';
import { SignupForm, AccountIntro } from '../components';

const SignUp = () => (
  <Box className="signup-container">
    <AccountIntro
      title=" WELCOME TO Jack Trades"
      text="Please create your free account to be proceed"
    />
    <SignupForm />
  </Box>
);

export default SignUp;
