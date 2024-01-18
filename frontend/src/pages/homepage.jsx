import { HStack, VStack,  Button , Box} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Product from "../component/products";
import { getAllProduct } from "../modules/fetch";
import { useMediaQuery } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const itemsPerRow = 3;

  const location = useLocation();
  const pageQueryParam = new URLSearchParams(location.search).get("page");
  const initialPage = pageQueryParam ? parseInt(pageQueryParam, 10) : 1;

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
    setCurrentPage(initialPage);
  }, [initialPage]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const [isSmallScreen] = useMediaQuery("(max-width: 48em)");

  return (
    <VStack w="100%" overflowX="hidden" spacing={isSmallScreen ? "5" : "10"} justifyContent="center" mt="20px">
      {visibleProducts.map((product) => (
        <Box key={product.id} w="100%" mb={isSmallScreen ? "10px" : "0"}>
          {isSmallScreen ? (
            <VStack spacing="10" justifyContent="center">
              <Product
                key={product.id}
                {...product}
                flexBasis={`calc(100% - 20px)`}
                flexGrow="0"
                flexShrink="0"
                textAlign="center"
                my="7px"
                mx="0"
              />
            </VStack>
          ) : (
            <HStack w="100%" spacing="10" justifyContent="center">
              <Product
                key={product.id}
                {...product}
                flexBasis={`calc(${100 / itemsPerRow}% - 20px)`}
                flexGrow="0"
                flexShrink="0"
                textAlign="center"
                my="7px"
                mx="0"
              />
            </HStack>
          )}
        </Box>
      ))}
      <HStack mt="20px">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </HStack>
    </VStack>
  );
}
