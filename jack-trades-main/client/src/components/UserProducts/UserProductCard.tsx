/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC, useState, useEffect, useContext,
} from 'react';
import {
  Box, InputBase, TextareaAutosize,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Image, Button } from '../index';
import { UserProduct } from '../../interfaces';
import { AuthContext } from '../Context/AuthContext';

const UserProductCard
:FC<{ product : UserProduct, fetch:()=>void }> = ({ product, fetch }) => {
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [productObj, setProductObj] = useState<UserProduct | null>(null);
  const [className, setClassName] = useState<string>('');

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    setProductObj(product);
  }, [product]);

  const handleEdit = () => {
    setReadOnly(false);
  };

  const handleDelete = async () => {
    try {
      const alert = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: '#1b4b66',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (alert.isConfirmed) {
        const response = await axios.delete(`/api/v1/products/${product.id}`);
        fetch();
      }
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  const saveEdit = async () => {
    try {
      const response = await axios.put(
        `/api/v1/products/${product.id}`,
        {
          title: productObj?.title,
          description: productObj?.description,
        },
      );
      await Swal.fire({
        title: response.data.message,
        confirmButtonColor: '#1b4b66',
      });
      setReadOnly(true);
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  const handleChange = (e:any) => {
    const key = e.target.id;
    if (!e.target.value) setClassName('disable');
    else setClassName('');
    if (productObj) {
      let newVal;
      if (key === 'title') newVal = { ...productObj, title: e.target.value };
      else newVal = { ...productObj, description: e.target.value };
      setProductObj(newVal);
    }
  };

  if (!productObj) return <p />;
  return (
    <Box className="product-card">
      <Image attributes={{
        src: product.gallery[0],
        alt: `an image of ${product.title}`,
        className: 'product-img',
      }}
      />
      <Box className="product-details">
        <InputBase
          className="title"
          id="title"
          value={productObj.title}
          readOnly={readOnly}
          onChange={handleChange}
        />
        <TextareaAutosize
          className="description"
          id="description"
          value={productObj.description}
          readOnly={readOnly}
          onChange={handleChange}
        />
        <Link to={`/product/${productObj.id}/details`}>View details</Link>

        {+productObj.user_id === userId && (
        <Box className="buttons">
          {
          readOnly ? (
            <Button
              style={{
                text: 'Edit',
                handleClick: handleEdit,
              }}
            />
          ) : (
            <Button
              style={{
                text: 'save',
                handleClick: saveEdit,
                classes: className,
              }}
            />
          )
        }
          <Button
            style={{
              text: 'Delete',
              handleClick: handleDelete,
            }}
          />

        </Box>
        )}
      </Box>
    </Box>

  );
};

export default UserProductCard;
