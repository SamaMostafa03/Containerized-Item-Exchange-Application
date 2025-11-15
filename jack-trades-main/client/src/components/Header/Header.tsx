import './Header.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const Header = () => (
  <Box className="div-parent">
    <Box className="div-intro">
      <h1>
        Exchange Your Items
      </h1>
      <Typography
        variant="subtitle2"
        sx={{
          fontSize: '1.2rem',
          paddingRight: '10rem',
          fontWeight: '800 !important',
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        amet consectetur adipisicing elit
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        amet consectetur adipisicing elit.
      </Typography>
      <Link to="/products" style={{ textDecoration: 'none' }}>
        <Button
          style={{
            text: 'See more',
            icon: 'ArrowForward',
            classes: 'btn headerBtn',
          }}
        />
      </Link>
    </Box>
  </Box>
);

export default Header;
