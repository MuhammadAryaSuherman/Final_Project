import { Box, Image, Heading, Text } from "@chakra-ui/react";
import React from "react";

const ProductDetailComponent = ({ produk }) => {
    const formattedHarga = new Intl.NumberFormat("id-ID").format(harga);
  return (
    <Box display="flex" alignItems="center" className="produk-details">
      <Box className="produk-image" mr={4}>
        <Image src={`http://localhost:3000/${image}`} alt={produk.nama} />
      </Box>
      <Box className="produk-info">
        <Heading as="h2" size="lg" mb={2}>
          {produk.nama}
        </Heading>
        <Text fontSize="lg">Jumlah: {produk.kategori_diamond}</Text>
        <Text fontSize="lg" mb={2}>
            <span>Harga: Rp.</span>
            {formattedHarga}
          </Text>
        <Text fontSize="lg" mb={2}>
          Keterangan: {produk.keterangan}
        </Text>
      </Box>
    </Box>
  );
};

export default ProductDetailComponent;
