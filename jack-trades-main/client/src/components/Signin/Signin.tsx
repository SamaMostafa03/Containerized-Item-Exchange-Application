import { Box, Typography, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { IUserLogin } from '../../interfaces';
import Loading from '../Loading/Loading';
import Button from '../Button/Button';
import './Signin.css';

const Signin:FC = () => {
// handle login
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const login = async (user:IUserLogin) => {
    try {
      setLoading(true);
      await axios.post('/api/v1/account/signin', user);
      setLoading(false);
      navigate(from);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        titleText: error.response.data.message,
      });
    }
  };

  // validation
  const validationSchema = yup.object({
    email: yup.string()
      .email('Enter Valid Email ')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values:IUserLogin) => {
      login(values);
    },
  });
  return (
    <Box className="signIn-container">
      <Box className="header-2">
        <Typography sx={{
          marginTop: '10px',
        }}
        >
          You do not have an account ?
        </Typography>
        <Link
          to="/Signup"
          style={{
            textDecoration: 'none',
          }}
          state={from}
        >
          <Button style={{
            text: 'Sign up',
            classes: 'btn btn-login',
          }}
          />
        </Link>
      </Box>

      {/* Form section */}
      <main>
        <Typography variant="h3">
          Login
        </Typography>
        <form onSubmit={(e) => formik.handleSubmit(e)}>
          <TextField
            className="inputs"
            id="email"
            name="email"
            label="Email"
            variant="standard"
            onChange={formik.handleChange}
            error={formik.touched.email
                    && Boolean(formik.errors.email)}
            helperText={formik.touched.email
                    && formik.errors.email}
          />
          <TextField
            className="inputs"
            type="password"
            id="password"
            name="password"
            label="Password"
            variant="standard"
            onChange={formik.handleChange}
            error={formik.touched.password
                    && Boolean(formik.errors.password)}
            helperText={formik.touched.password
                    && formik.errors.password}
          />
          { loading ? <Loading className="loading" />
            : <button type="submit" className="submit-login"> Login </button>}

        </form>
      </main>
    </Box>
  );
};
export default Signin;
