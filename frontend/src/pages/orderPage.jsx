import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../modules/fetch';
import ProductDetailComponent from '../component/detailedProduct';
import OrderForm from '../component/orderForm';
import ReviewsComponent from '../component/reviewTemplate';
import { HStack, VStack } from '@chakra-ui/react';

const Orderpage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        console.log('Product Data:', productData);
        if (productData && productData.data){
        setProduct(productData);
        } else{
            console.log('Product data or productData.data is undefined/null');
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);
  

  return (
    <div className="product-container">
      {product ? (
        <VStack>
        <HStack>
        <ProductDetailComponent product={product} />
        <OrderForm/>
        </HStack>
        <ReviewsComponent/>
        </VStack>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Orderpage;
