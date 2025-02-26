import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import debounce from 'lodash.debounce';
import  './App.css'

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  console.log(products)

  const fetchProducts = async (page, searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products`, {
        headers:{
          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiaWF0IjoxNzQwNTYyODI1LCJleHAiOjE3NDA1NjY0MjV9.efpFT26UPemUuz8gsJyuFV__jmN_jk_iy6ZgxBYjp4A",
          "Access-Control-Allow-Origin": "*"
        },
        params: {
          page,
          search: searchQuery
        }
      });
      
      setProducts(await response.json());
      
      
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  // Lazy Loading with Intersection Observer
  const { ref, inView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
  });

  useEffect(() => {
    fetchProducts(page, searchQuery);
  }, [page, searchQuery]);

  const handleSearch = debounce((e) => {
    setSearchQuery(e.target.value);
    setProducts([]); // Reset product list when a new search is made
    setPage(1); // Start from the first page
  }, 500); // 500ms debounce delay

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>${product.price}</span>
          </div>
        ))}
      </div>

      {loading && <div className="loading">Loading...</div>}

      <div ref={ref} className="loading-trigger"></div> {/* Lazy Loading Trigger */}
    </div>
  );
};

export default App;
