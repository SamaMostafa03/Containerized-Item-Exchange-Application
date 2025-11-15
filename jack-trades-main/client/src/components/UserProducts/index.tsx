/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './UserProducts.css';
import {
  FC, useState, useEffect, useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box, Typography, Pagination, Stack,
} from '@mui/material';
import UserProductCard from './UserProductCard';
import NoData from '../NoData';
import Loading from '../Loading/Loading';
import { UserProduct } from '../../interfaces';

const UserProducts:FC = () => {
  const [products, setProducts] = useState< UserProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [count, setCount] = useState<number>(1);

  const pageNumber = useRef(1);
  const { userId } = useParams();

  const fetchData = async () => {
    try {
      const userProducts = await axios
        .get(`/api/v1/user/${userId}/products?offset=${offset}&limit=3`);

      setProducts(userProducts.data.rows);
      setCount(userProducts.data.count);
      setIsLoading(false);
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    if (value > pageNumber.current) setOffset(offset + 3);
    else setOffset(offset - 3);

    pageNumber.current = value;
  };

  useEffect(() => {
    fetchData();
  }, [offset, userId]);

  return (
    <Box className="user-products">
      <Typography variant="h4">Products</Typography>
      { isLoading ? <Loading className="loading" />
        : !products.length ? <NoData />
          : (
            <>
              <Box className="products">
                {products.map((e) => (
                  <UserProductCard
                    product={e}
                    key={e.id}
                    fetch={fetchData}
                  />
                ))}
              </Box>
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(count / 3)}
                  onChange={handleChange}
                />
              </Stack>
            </>
          )}
    </Box>
  );
};

export default UserProducts;
