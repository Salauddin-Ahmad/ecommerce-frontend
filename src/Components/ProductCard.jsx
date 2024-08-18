// src/Components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="p-4 border rounded shadow">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p>{product.description}</p>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
