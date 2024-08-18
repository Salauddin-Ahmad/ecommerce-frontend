// src/Components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="p-4 border rounded shadow">
      <div className='mx-auto'>
      <img src={product.image} alt={product.name} className="w-[47%] h-56 object-cover mb-2 rounded " />
      </div>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p>{product.description}</p>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
