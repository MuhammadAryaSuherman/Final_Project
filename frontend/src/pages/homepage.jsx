import { HStack, VStack, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Product from "../component/products";
import { getAllProduct } from "../modules/fetch";

export default function Homepage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProduct();
        setProducts(productsData.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const itemsPerRow = 5;

  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedProducts = chunkArray(products, itemsPerRow);

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <>

      {isSmallScreen ? (
        <VStack w="100%" spacing="10" justifyContent="center" mt="20px">
          {products.map((product) => (
            <Product
              key={product.id}
              {...product}
              flexBasis="100%"
              textAlign="center"
              my="10px"
            />
          ))}
        </VStack>
      ) : (
        <HStack
          w="90%"
          spacing="10"
          justifyContent="center"
          flexWrap="wrap"
          mt="20px"
        >
          {chunkedProducts.map((rowProducts, rowIndex) => (
            <HStack
              key={rowIndex}
              w="100%"
              justifyContent="space-around"
              flex="0 1 auto"
            >
              {rowProducts.map((product) => (
                <Product
                  key={product.id}
                  {...product}
                  flexBasis="18%"
                  flexGrow="0"
                  flexShrink="0"
                  textAlign="center"
                  mx="2%"
                  my="10px"
                />
              ))}
            </HStack>
          ))}
        </HStack>
      )}
    </>
  );
}
