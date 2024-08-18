

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import useAxiosPublic from "../Hooks/UseAxiosPublic";

const DataPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortBy, setSortBy] = useState("priceAsc");

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosPublic.get(`/products`, {
                    params: {
                        page: currentPage,
                        limit: 12,
                        search,
                        brand,
                        category,
                        minPrice,
                        maxPrice,
                        sortBy
                    }
                });
                setProducts(response.data.products);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [currentPage, search, brand, category, minPrice, maxPrice, sortBy]);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div>
            <div className="mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="p-2 border rounded mr-2"
                />
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Brand"
                    className="p-2 border rounded mr-2"
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                    className="p-2 border rounded mr-2"
                />
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min Price"
                    className="p-2 border rounded mr-2"
                />
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max Price"
                    className="p-2 border rounded mr-2"
                />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border rounded mr-2">
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="dateAsc">Date Added: Oldest First</option>
                    <option value="dateDesc">Date Added: Newest First</option>
                </select>
                <button
                    onClick={() => setCurrentPage(1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                    Apply Filters
                </button>
            </div>
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
