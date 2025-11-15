/* eslint-disable max-len */
import { FC, useState, useEffect } from 'react';
import {
  Box, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { formatDistance, parseISO } from 'date-fns';
import { Image, Button } from '../index';
import { IUserRequest } from '../../interfaces';

const UserRequestCard
: FC<{ request: IUserRequest, fetch: () => void }> = ({ request, fetch }) => {
  const [requestObj, setRequestObj] = useState<IUserRequest | null>(null);

  const states = {
    pending: 'pending',
    fail: 'fail',
    success: 'success',
  };

  useEffect(() => {
    setRequestObj(request);
  }, [request]);

  const handleDelete = async () => {
    try {
      const alert = await Swal.fire({
        title: 'Are you sure?',
        text: 'The request will be cancelled',
        showCancelButton: true,
        confirmButtonColor: '#1b4b66',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (alert.isConfirmed) {
        await axios.delete(`/api/v1/requests/${request.id}`);
        fetch();
      }
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  if (!requestObj) return <p />;
  return (
    <Box className="request-card">
      <Image attributes={{
        src: request['product.gallery'][0],
        alt: `an image of ${request['product.title']}`,
        className: 'request-img',
      }}
      />
      <Box className="request-details">
        <Box className="title-date-box">
          <h3
            className="request-title"
            id="title"
          >
            {requestObj['product.title']}
          </h3>
          <Typography sx={
              {
                fontSize: '30',
                marginRight: '17px',
                fontWeight: 'bold',
              }
            }
          >
            {formatDistance(
              parseISO(requestObj.createdAt),
              new Date(),
              { addSuffix: true },
            )}
          </Typography>
        </Box>
        <p
          className="request-description"
          id="description"
        >
          {requestObj['product.title']}
        </p>
        <Link to={`/product/${requestObj.product_id}/details`}>View details</Link>
        <Typography
            // eslint-disable-next-line max-len
          className={`${states[requestObj.status as keyof typeof states]} status `}
        >
          {requestObj.status}
        </Typography>

        <Box className="buttons">
          <Button
            style={{
              text: 'Cancel',
              handleClick: handleDelete,
            }}
          />
        </Box>
      </Box>
    </Box>

  );
};

export default UserRequestCard;
