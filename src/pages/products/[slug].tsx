import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import AppError from "../../errors/AppError";

interface FullProductProps {
  productData: {
    title: string;
    price: number;
  };
}

const FullArticle: React.FC<FullProductProps> = ({ productData }) => {
  return (
    <div>
      <h1>{productData.title}</h1>
      <h2>U$ {productData.price.toFixed(2)}</h2>
    </div>
  );
};

export default FullArticle;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<FullProductProps> = async (
  context
) => {
  const { slug } = context.params;

  const response = await fetch(`http://localhost:3333/products?slug=${slug}`);

  const products = await response.json();

  const selectedProduct = products[0];

  if (!selectedProduct) {
    throw new AppError(404);
  }

  return {
    props: {
      productData: selectedProduct,
    },
    revalidate: 300,
  };
};
