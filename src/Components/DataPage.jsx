import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const DataPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products?page=${currentPage}&limit=12`);
                setProducts(response.data.products || []); // Default to empty array if undefined
                setTotalPages(response.data.totalPages || 1); // Default to 1 if undefined
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
            <div className="flex justify-between p-4">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Prev
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataPage;
