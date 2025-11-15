import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductContainer } from '../components';
import { IProduct } from '../interfaces';
import { ImageContextProvider } from '../components/Context/ImageContext';
import Loading from '../components/Loading/Loading';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        navigate('/products/');
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (!product) {
    return (
      <Loading className="loading" />
    );
  }

  return (
    <div>
      { loading ? <Loading className="loading" />
        : (
          <ImageContextProvider gallery={product.gallery}>
            <ProductContainer attributes={product} />
          </ImageContextProvider>
        )}
    </div>
  );
};

export default ProductDetails;
