import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import vector from '../../assets/homeIcon.png';
import Image from '../Image/Image';
import { IAccountProps } from '../../interfaces';
import './AccountIntro.css';

const AccountIntro = ({ title, text }: IAccountProps) => (
  <Box className="welcome-part">
    <Link to="/" className="link-home">
      <Image attributes={{
        src: vector, alt: 'icon', className: 'signupIcon',
      }}
      />
      <Typography>Home</Typography>
    </Link>

    <Box className="content">
      <Typography
        variant="h1"
        sx={{
          fontWeight: 'bold',
        }}
      >
        {title}
      </Typography>
      <Typography>{text}</Typography>
    </Box>
  </Box>
);

export default AccountIntro;
