/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC, useState, useEffect, useContext,
} from 'react';
import {
  Button, Modal, ImageList, ListSubheader, ImageListItem, Typography,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IProductPopup, IOfferedProducts } from '../../interfaces';
import PopupCard from './PopupCard';
import { AuthContext } from '../Context/AuthContext';

const NotificationPopUp:FC<IProductPopup> = ({
  open, handleClose, id, setStatus, senderId,
}) => {
  const [products, setProducts] = useState<IOfferedProducts[]>([]);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>(0);
  const { socket, fullName } = useContext(AuthContext);
  const fetchOfferedProducts = async () => {
    try {
      const response = await axios
        .get(`/api/v1/requests/products/${id}`);
      setProducts(response.data.message);
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  const handleExchange = async () => {
    try {
      if (productId) {
        setShowMessage(false);
        const response = await axios
          .put(`/api/v1/requests/${id}`, {
            receiverApproval: true,
            productId,
          });

        const alert = await Swal.fire({
          title: response.data,
          confirmButtonColor: '#1b4b66',
        });
        handleClose();
        socket.emit('requests', {
          receiverId: senderId,
          senderName: fullName,
        });

        if (setStatus) setStatus('success');
      } else setShowMessage(true);
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  useEffect(() => {
    if (open) fetchOfferedProducts();
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="popupModal"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {products.length ? (
        <ImageList
          sx={{
            width: 700, height: 550, backgroundColor: '#fff', padding: '1rem',
          }}
          cols={3}
          gap={13}
        >
          <ImageListItem key="Subheader" cols={3}>
            <ListSubheader component="div">
              Choose products for exchange
            </ListSubheader>
          </ImageListItem>
          {products.map((item) => (
            <PopupCard item={item} key={item.id} setProductId={setProductId} />
          ))}
          <ImageListItem cols={3}>
            {showMessage
            && <Typography variant="h5">Choose one item</Typography>}
            <Button
              variant="contained"
              onClick={handleExchange}
            >
              confirm

            </Button>
          </ImageListItem>

        </ImageList>

      ) : (<h1>Loading ...</h1>)}
    </Modal>
  );
};

export default NotificationPopUp;
