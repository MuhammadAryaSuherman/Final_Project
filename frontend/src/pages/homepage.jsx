import { HStack, VStack, useBreakpointValue, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Product from "../component/products";
import { getAllProduct } from "../modules/fetch";
import { useLocation } from "react-router-dom";

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Get the page query parameter from the URL
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
    setCurrentPage(initialPage); // Set the initial page
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

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <VStack w="100%" spacing="10" justifyContent="center" mt="20px">
      {isSmallScreen ? (
        visibleProducts.map((product) => (
          <Product
            key={product.id}
            {...product}
            flexBasis="100%"
            textAlign="center"
            my="10px"
          />
        ))
      ) : (
        <>
          <HStack w="100%" spacing="10" justifyContent="center" flexWrap="wrap">
            {visibleProducts.map((product) => (
              <Product
                key={product.id}
                {...product}
                flexBasis={`calc(33.33% - 20px)`}
                flexGrow="0"
                flexShrink="0"
                textAlign="center"
                my="10px"
              />
            ))}
          </HStack>
        </>
      )}
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
