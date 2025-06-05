import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 🔍 Search + in-stock filtering
  useEffect(() => {
    const byQuery =
      searchQuery.trim().length > 0
        ? products.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : products;

    setFilteredProducts(byQuery);
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {/* Product grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
        {filteredProducts
          .filter((p) => p.inStock)
          .map((product, idx) => (
            <ProductCard
              key={product.id ?? idx} // prefer product.id if available
              product={product}
            />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
