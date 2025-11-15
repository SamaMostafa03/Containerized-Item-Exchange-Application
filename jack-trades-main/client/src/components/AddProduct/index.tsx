/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC, ChangeEvent, useState, useContext,
} from 'react';
import {
  TextField, IconButton, Box, Typography, Button, FormControl, FormHelperText,
} from '@mui/material';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import './AddProduct.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik, FormikProps } from 'formik';
import TypeRadio from './TypeRadio';
import CategoryRadio from './CategoryRadio';
import { AuthContext } from '../Context/AuthContext';
import { validateProduct } from '../../validation';
import { IImages, IFormik } from '../../interfaces';
import Loading from '../Loading/Loading';

const AddProduct:FC = () => {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState<IImages>({
    img1: {
      url: '',
      isLoading: false,
    },
    img2: {
      url: '',
      isLoading: false,
    },
    img3: {
      url: '',
      isLoading: false,
    },
  });
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const from = useLocation();
  const { userId } = useContext(AuthContext);

  const handleSubmit = async (data:IFormik) => {
    try {
      if (!userId) {
        const result = await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'SignIn first to be able to add an item',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: '#1B4B66',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, SigIn',
        });

        if (result.isConfirmed) {
          navigate('/signin', {
            state: { from },
            replace: true,
          });
        }
      }

      const response = await axios.post('/api/v1/products', data);

      const alert = await Swal.fire({
        title: response.data.message,
        confirmButtonColor: '#1b4b66',
      });

      if (alert.isConfirmed) { navigate(`/profile/${userId}`); }
    } catch (error) {
      if (error.name === 'ValidationError') {
        await Swal.fire({
          title: error.message,
          confirmButtonColor: '#1b4b66',
        });
      }
    }
  };

  const formik: FormikProps<IFormik> = useFormik<IFormik>({
    initialValues: {
      title: '',
      description: '',
      type: '',
      gallery: [],
      category_id: '',
    },
    validationSchema: validateProduct,
    onSubmit: async (values) => {
      if (gallery.img1.isLoading || gallery.img2.isLoading || gallery.img3.isLoading) {
        const result = await Swal.fire({
          title: 'Ignore loading images?',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: '#1B4B66',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        });

        if (result.isConfirmed) handleSubmit(values);
      } else handleSubmit(values);
    },
  });

  const handleImage = async (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        setGallery((prev) => ({ ...prev, [e.target.name]: { url: '', isLoading: true } }));

        const data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('upload_preset', 'mohammed');
        data.append('cloud_name', 'dginxclgp');
        const response = await axios
          .post('https://api.cloudinary.com/v1_1/dginxclgp/image/upload', data);

        setGallery((prev) => {
          const newObj = {
            ...prev,
            [e.target.name]: { url: response.data.url, isLoading: false },
          };

          formik.setValues((pre) => ({
            ...pre, gallery: Object.values(newObj).filter((el) => !!el.url).map((el) => el.url),
          }));
          return newObj;
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      className="newProduct"
      onSubmit={formik.handleSubmit}
    >
      <fieldset>
        <legend>Add new product:</legend>
        <TextField
          id="outlined-text"
          label="Title"
          name="title"
          className="info"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.touched.title && !!formik.errors.title}
          helperText={formik.touched.title && formik.errors.title}
        />

        <TextField
          id="outlined-textarea"
          label="Description"
          name="description"
          placeholder="description"
          minRows={3}
          maxRows={6}
          className="info"
          onChange={formik.handleChange}
          value={formik.values.description}
          error={formik.touched.description && !!formik.errors.description}
          helperText={formik.touched.description && formik.errors.description}
          multiline
        />

        <TypeRadio formik={formik} />
        <CategoryRadio formik={formik} />

        <Typography variant="h5">Choose Images</Typography>
        <FormControl
          className="images"
          error={formik.touched.gallery && !!formik.errors.gallery}
        >
          <Box
            className="upload-img"
            sx={{
              backgroundImage: `url(${gallery.img1.url})`,
            }}
          >
            {gallery.img1.isLoading ? <Loading className="loading" /> : (
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  name="img1"
                  onChange={handleImage}
                />
                <PhotoCamera />
              </IconButton>
            )}
          </Box>

          <Box
            className="upload-img"
            sx={{
              backgroundImage: `url(${gallery.img2.url})`,
            }}
          >
            {gallery.img2.isLoading ? <Loading className="loading" /> : (
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  name="img2"
                  onChange={handleImage}
                />
                <PhotoCamera />
              </IconButton>
            )}
          </Box>

          <Box
            className="upload-img"
            sx={{
              backgroundImage: `url(${gallery.img3.url})`,
            }}
          >
            {gallery.img3.isLoading ? <Loading className="loading" /> : (
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  name="img3"
                  onChange={handleImage}
                />
                <PhotoCamera />
              </IconButton>
            )}
          </Box>

          {formik.touched.gallery && formik.errors.gallery ? (
            <FormHelperText
              sx={{ width: '100%' }}
            >
              {formik.errors.gallery}

            </FormHelperText>
          ) : null}
        </FormControl>
        {/* last */}
        <Button variant="contained" type="submit">Submit</Button>
      </fieldset>
    </form>
  );
};

export default AddProduct;
