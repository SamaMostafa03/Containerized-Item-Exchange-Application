/* eslint-disable no-nested-ternary */
import {
  Dialog, DialogTitle, DialogContent, Divider,
  Typography, Avatar, TextField, Box,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
  FC, useRef, useEffect, ChangeEvent, useState,
} from 'react';
import './popup.css';
import { useFormik } from 'formik';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { UserInfoTypes, IProfilePopupProps } from '../../interfaces';
import { updateUserValidation } from '../../validation';
import Loading from '../Loading/Loading';

const Popup : FC<IProfilePopupProps> = ({
  info, setIsPopupOpen, isPopupOpen, setInfo,
}) => {
  const {
    image, first_name: firstName, last_name: lastName, bio,
    email, id: UserId,
  } = info;
  const [imageUrl, setImageUrl] = useState <string>('');
  const [error, setError] = useState<string | false>(false);
  const [textLength, setTextLength] = useState<number>(100);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dialogRef = useRef<HTMLInputElement | null >(null);

  useEffect(() => {
    const handleClosePopup = (e:any) => {
      if (dialogRef.current?.children !== undefined) {
        if (Array.from(dialogRef.current?.children).includes(e.target)) {
          setIsPopupOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClosePopup, true);
    return () => {
      document.removeEventListener('click', handleClosePopup, true);
    };
  }, []);

  const updateUser = async (values: UserInfoTypes) => {
    try {
      // if the user does not upload a new image, save the old image
      if (!isUploaded) {
        setInfo({ ...values, image });
        setIsLoading(true);
        const response = await axios.put(
          '/api/v1/user/',
          { ...values, image },
        );
        Swal.fire({
          icon: 'success',
          text: response.data.message,
        });
        setIsLoading(false);
        setIsPopupOpen(false);
        return;
      }

      setInfo({ ...values, image: imageUrl });
      setIsLoading(true);
      const res = await axios.put(
        '/api/v1/user/',
        { ...values, image: imageUrl },
      );
      setIsLoading(false);
      Swal.fire({
        icon: 'success',
        text: res.data.message,
      });

      setIsPopupOpen(false);
    } catch (err) {
      setIsLoading(false);
      Swal.fire({
        icon: 'error',
        text: err.response.data.message,
      });
    }
  };

  const handleImage = async (e:ChangeEvent<HTMLInputElement>) => {
    setIsUploaded(true);
    if (e.target.files) {
      try {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('upload_preset', 'mohammed');
        data.append('cloud_name', 'dginxclgp');
        setIsLoading(true);
        const response = await axios
          .post('https://api.cloudinary.com/v1_1/dginxclgp/image/upload', data);
        setImageUrl(response.data.secure_url);
        setIsLoading(false);
        setError(false);
      } catch (err) {
        setIsLoading(false);
        setError('Please add a valid image');
      }
    }
  };

  const handleLength = (e:ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    setTextLength(100 - e.target.value.length);
  };
    // Formik
  const formik = useFormik({
    initialValues: {
      bio: bio || '',
      image: '',
      first_name: firstName,
      last_name: lastName,
      email,
      id: UserId,
    },
    validationSchema: updateUserValidation,
    onSubmit: (values: UserInfoTypes) => {
      updateUser(values);
    },
  });

  return (
    <Dialog
      ref={dialogRef}
      open={isPopupOpen}
      transitionDuration={{ enter: 1000, appear: 1000 }}
    >
      <DialogTitle className="profile-dialog-title">
        <Typography variant="body1" className="body1">
          Edit Your Information
        </Typography>
        <button
          type="button"
          style={{ cursor: 'pointer' }}
          onClick={() => setIsPopupOpen(false)}
        >
          <CloseIcon />
        </button>
      </DialogTitle>
      <Divider />

      <DialogContent className="profile-dialog-content">
        <form
          className="update-profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (isUploaded && imageUrl === '') {
              setError('Please wait for the image to finish uploading');
            } else {
              formik.handleSubmit(e);
              setError(false);
            }
          }}
        >
          <Box className="image-box">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`${firstName} ${lastName}`}
                className="user-img-popup"
              />
            )
              : image ? (
                <img
                  src={image}
                  alt={`${firstName} ${lastName}`}
                  className="user-img-popup"
                />
              )
                : (
                  <Avatar
                    className="user-img-popup"
                    sx={{ bgcolor: '#B9E5FF' }}
                  >
                    {firstName[0].toUpperCase()}
                    {lastName[0].toUpperCase()}
                  </Avatar>
                )}
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              className="camera-icon"
            >
              <input
                hidden
                type="file"
                id="image"
                name="image"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleImage(e);
                }}
                value={formik.values.image}
              />
              <PhotoCamera />
            </IconButton>
          </Box>

          <Divider />
          <Box className="profile-names">
            <TextField
              type="text"
              id="firstName"
              name="first_name"
              label="First Name"
              className="firstName"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              error={formik.touched.first_name
                && Boolean(formik.errors.first_name)}
              helperText={formik.touched.first_name
                && formik.errors.first_name}
            />
            <TextField
              type="text"
              id="lastName"
              name="last_name"
              label="last Name"
              className="lastName"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.last_name}
              error={formik.touched.last_name
                 && Boolean(formik.errors.last_name)}
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
          </Box>
          <TextField
            type="text"
            id="email"
            name="email"
            label="Email"
            className="email"
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email
                 && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Typography
            sx={{
              fontSize: '12px',
              marginTop: '10px',
              width: '100%',
            }}
          >
            Let the people know who are you.
            And how they can contact with you.
          </Typography>
          <TextField
            type="text"
            id="bio"
            name="bio"
            label="bio"
            variant="outlined"
            onChange={(e) => {
              formik.handleChange(e);
              handleLength(e);
            }}
            value={formik.values.bio}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
            className="profile-bio"
            maxRows={3}
            minRows={3}
            multiline
            aria-label="maximum height"
          />
          <Typography sx={{
            width: '95%',
            color: textLength < 0 ? 'red' : 'gray',
            textAlign: 'end',
          }}
          >
            {textLength}
          </Typography>
          <button type="submit" className="btn profile-submit">update</button>
        </form>
        { error && (
          <p className="profile-error">
            {error}
          </p>
        ) }
        { isLoading && (
        <Loading className="profile-popup-loading" />
        ) }
      </DialogContent>
    </Dialog>
  );
};
export default Popup;
