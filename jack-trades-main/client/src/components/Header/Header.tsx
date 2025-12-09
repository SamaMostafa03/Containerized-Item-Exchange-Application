/* eslint-disable jsx-a11y/heading-has-content */
import './Header.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import Typed from 'typed.js';
import Button from '../Button/Button';

const Header = () => {
  const typed = useRef<any>(null);

  useEffect(() => {
    const options = {
      strings: [
        'Jack Trades',
      ],
      typeSpeed: 120,
      backSpeed: 50,
    };

    typed.current = new Typed('.website-heading', options);

    return () => {
      typed.current.destroy();
    };
  }, []);

  return (
    <Box className="div-parent">
      <Box className="div-intro">
        <div>
          <h1 className="website-heading" />
          <Typography
            variant="subtitle1"
          >
            Exchange your items
          </Typography>
        </div>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          amet consectetur adipisicing elit
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          amet consectetur adipisicing elit.
        </Typography>
        <Link to="/products/all" style={{ textDecoration: 'none' }}>
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
};

export default Header;
