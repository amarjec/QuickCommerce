import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.VITE_CURRENCY || "₹"; // Default currency, can be changed based on user preference

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // ✅ FIXED

  // Fetch products from a dummy data source or API
  // In a real application, you would replace this with an API call
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // Add Product to Cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  // Update Cart Item Quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  // Remove Product from Cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Removed from Cart");
    setCartItems(cartData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  // handle total cart items count in the header
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  }

  // get cart total amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((product) => product.id === item);
      if (cartItems[item] > 0) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100; // Round to two decimal places
  }



  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
