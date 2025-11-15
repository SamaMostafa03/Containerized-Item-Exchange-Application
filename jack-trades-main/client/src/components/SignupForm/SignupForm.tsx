import axios from 'axios';
import * as yup from 'yup';

import {
  Box, Typography,
  TextField,
} from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

import { useState } from 'react';

import Loading from '../Loading/Loading';

import IUser from '../../interfaces/Iuser';

import Button from '../Button/Button';

import './SignupForm.css';

const SignupForm = () => {
  // validation
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';

  const [loading, setLoading] = useState<boolean>(false);
  const validationSchema = yup.object({
    firstName: yup.string()
      .matches(/^\s*[a-zA-z]{2,20}\s*$/, 'Enter valid first name')
      .required('First name is required'),

    lastName: yup.string()
      .matches(/^\s*[a-zA-z]{2,20}$\s*/, 'Enter valid last name')
      .required('Last name is required'),

    email: yup.string().email('Enter valid email')
      .required('Email is required'),

    password: yup.string()
      .matches(
        /^(?!.*[\s])(?=.*[0-9])(?=.*\W)[a-zA-Z0-9\W]{6,15}$/,
        `Password must be at least 6 characters
        and contain letters, digits and special characters only.`,
      )
      .required('Password is required'),

    confirmPassword: yup.string().required('Confirm Password')
      .oneOf([yup.ref('password'), null], 'Password must be match'),
  });

  const addNewUser = async (user: IUser) => {
    try {
      setLoading(true);
      await axios.post('/api/v1/account/signup', user);
      setLoading(false);
      navigate(from);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        titleText: error.response.data.message,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (userData: IUser) => {
      addNewUser(userData);
    },
  });

  return (
    <Box className="account-part">
      <form onSubmit={(e) => formik.handleSubmit(e)}>
        <Box className="header-2">
          <Typography sx={{
            marginTop: '10px',
          }}
          >
            Already have an account ?
          </Typography>
          <Link
            to="/signin"
            style={{
              textDecoration: 'none',
            }}
            state={from}
          >
            <Button style={{
              text: 'Sign in',
              classes: 'btn btn-login',
            }}
            />
          </Link>
        </Box>

        {/* Form section */}
        <main>
          <Typography variant="h2">Create free account</Typography>
          <Box className="content-2">
            <Box className="inputs-names-container">
              <Box>
                <TextField
                  inputProps={{
                    style: {
                      padding: '0px',
                    },
                  }}
                  className="inputs"
                  id="firstName"
                  name="firstName"
                  label="First name"
                  variant="standard"
                  onChange={formik.handleChange}
                  error={formik.touched.firstName
                    && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName
                    && formik.errors.firstName}
                />

              </Box>

              <Box>
                <TextField
                  inputProps={{
                    style: {
                      padding: '0px',
                    },
                  }}
                  className="lastName"
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  variant="standard"
                  onChange={formik.handleChange}
                  error={formik.touched.lastName
                    && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName
                    && formik.errors.lastName}
                />
              </Box>
            </Box>

            <TextField
              inputProps={{
                style: {
                  padding: '0px',
                },
              }}
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
              inputProps={{
                style: {
                  padding: '0px',
                },
              }}
              className="inputs"
              type="password"
              variant="standard"
              label="Password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              error={formik.touched.password
                    && Boolean(formik.errors.password)}
              helperText={formik.touched.password
                    && formik.errors.password}
            />
            <TextField
              inputProps={{
                style: {
                  padding: '0px',
                },
              }}
              type="password"
              className="inputs"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword
                  && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword
                  && formik.errors.confirmPassword}
              variant="standard"
            />

            <Box className="buttons-container">
              {loading ? <Loading className="sign-up-loading" /> : (
                <button
                  type="submit"
                  className="btn create-account-btn"
                >
                  Create my account
                </button>
              )}

              <Typography
                className="terms"
                sx={{
                  marginTop: '16px',
                  fontSize: '12px',
                }}
              >
                By signing up, you agree
                with our communications and usage terms
              </Typography>
            </Box>

          </Box>
        </main>
      </form>
    </Box>
  );
};
export default SignupForm;
