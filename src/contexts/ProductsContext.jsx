import { createContext, useContext, useEffect, useReducer } from "react";
import {
  getCategories,
  getProducts,
  getSingleProduct,
  insertProduct,
  updateCart,
  updateOrders,
} from "../services/apiProducts";
import { useCallback } from "react";
import { useUser } from "./UserContext";

const ProductsContext = createContext();

const initialState = {
  allProducts: [],
  filteredProducts: [],
  someProducts: [],
  isLoading: false,
  singleProductDetails: {},
  error: "",
  categories: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "startLoading":
      return { ...state, isLoading: true };
    case "allProductsLoaded":
      return {
        ...state,
        isLoading: false,
        allProducts: action.payload,
        filteredProducts: action.payload,
      };
    case "filteredProductsChanged":
      return { ...state, filteredProducts: action.payload };
    case "someProductsLoaded":
      return { ...state, isLoading: false, someProducts: action.payload };
    case "singleProductLoaded":
      return {
        ...state,
        isLoading: false,
        singleProductDetails: action.payload,
      };
    case "categoriesLoaded":
      return { ...state, isLoading: false, categories: action.payload };
    case "error":
      return { ...state, isLoading: false, error: action.payload };
    case "addProduct":
      return {
        ...state,
        isLoading: false,
        allProducts: [...state.allProducts, action.payload],
      };
    default:
      throw new Error("Unknown action");
  }
};

const ProductsProvider = ({ children }) => {
  const [
    {
      allProducts,
      filteredProducts,
      someProducts: products,
      isLoading,
      error,
      singleProductDetails: productDetails,
      categories,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numPages = Math.ceil(filteredProducts.length / 8);
  const productsCount = allProducts.length;
  const { id, cart, orders, dispatch: userDispatcher } = useUser();

  useEffect(() => {
    dispatch({ type: "startLoading" });
    const loadAllProducts = async () => {
      try {
        const data = await getProducts();
        dispatch({ type: "allProductsLoaded", payload: data });
      } catch {
        dispatch({
          type: "error",
          payload: "Something went wrong with fetching products",
        });
      }
    };
    loadAllProducts();
  }, []);

  const loadProducts = useCallback(
    ({ page, category, inStock, outOfStock, min, max }) => {
      dispatch({ type: "startLoading" });

      let filteredProducts = allProducts;

      if (category) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }

      if (inStock !== outOfStock) {
        if (inStock) {
          filteredProducts = filteredProducts.filter(
            (product) => product.available === true
          );
        } else if (outOfStock) {
          filteredProducts = filteredProducts.filter(
            (product) => product.available === false
          );
        }
      }

      if (min) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= min
        );
      }

      if (max) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= max
        );
      }

      const tempPage = page ? page : 1;
      const start = (tempPage - 1) * 8;
      const paginatedProducts = filteredProducts.slice(start, start + 8);

      dispatch({ type: "filteredProductsChanged", payload: filteredProducts });
      dispatch({ type: "someProductsLoaded", payload: paginatedProducts });
    },
    [allProducts]
  );

  const loadProductDetails = useCallback(async (id) => {
    dispatch({ type: "startLoading" });
    try {
      const data = await getSingleProduct(id);
      dispatch({ type: "singleProductLoaded", payload: data });
    } catch {
      dispatch({
        type: "error",
        payload: "Something went wrong with fetching your product",
      });
    }
  }, []);

  const loadCategories = useCallback(async () => {
    dispatch({ type: "startLoading" });
    try {
      const data = await getCategories();
      dispatch({ type: "categoriesLoaded", payload: data });
    } catch {
      dispatch({
        type: "error",
        payload: "Something went wrong with fetching your product",
      });
    }
  }, []);

  const getMinMaxValues = useCallback(() => {
    const prices = allProducts.map((product) => {
      return product.price;
    });
    const values = {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
    return values;
  }, [allProducts]);

  const addToCart = async (product) => {
    if (!id) {
      const cartPromise = new Promise((resolve) => {
        const currentCart = JSON.parse(sessionStorage.getItem("cart"));
        const tempCart = { ...currentCart };
        tempCart[product.id] = product;
        resolve(sessionStorage.setItem("cart", JSON.stringify(tempCart)));
        userDispatcher({ type: "tempCartChange", payload: tempCart });
      });
      cartPromise.then();
    } else {
      try {
        const newCart = cart;
        if (!newCart[product.id]) {
          newCart[product.id] = product;
          await updateCart(id, JSON.stringify(newCart));
          userDispatcher({ type: "cartChange", payload: newCart });
        }
      } catch {
        dispatch({
          type: "error",
          payload: "Something went wrong with adding your product",
        });
      }
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const newCart = Object.entries(cart).reduce((acc, [key, item]) => {
        if (item.id !== productId) acc[key] = item;
        return acc;
      }, {});

      if (Object.keys(newCart).length === 0) {
        console.log("Cart is empty, updating Supabase with an empty object");
        await updateCart(id, JSON.stringify({}));
      } else {
        console.log("Updating cart with:", newCart);
        await updateCart(id, JSON.stringify(newCart));
      }

      userDispatcher({ type: "cartChange", payload: newCart });
    } catch {
      dispatch({
        type: "error",
        payload: "Something went wrong with removing your product",
      });
    }
  };

  const addOrder = async (order) => {
    try {
      const newOrders = orders;
      newOrders.push(order);
      await updateOrders(id, newOrders);
      userDispatcher({ type: "ordersChange", payload: newOrders });
    } catch {
      dispatch({
        type: "error",
        payload: "Something went wrong with adding your product",
      });
    }
  };

  const clearCart = useCallback(async () => {
    try {
      const newCart = {};
      await updateCart(id, JSON.stringify(newCart));
      userDispatcher({ type: "cartChange", payload: newCart });
    } catch {
      dispatch({
        type: "error",
        payload: "Something went wrong with removing your product",
      });
    }
  }, [id, userDispatcher]);

  const addNewProduct = async (newProduct) => {
    const { name, price, category, images, description } = newProduct;
    dispatch({ type: "startLoading" });
    try {
      const data = await insertProduct({
        name,
        price,
        description,
        images,
        category,
      });
      dispatch({ type: "addProduct", payload: data[0] });
    } catch {
      dispatch({
        type: "error",
        payload: "Something went wrong with adding your product",
      });
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        error,
        productDetails,
        numPages,
        categories,
        productsCount,
        loadProducts,
        getMinMaxValues,
        loadProductDetails,
        loadCategories,
        addToCart,
        removeFromCart,
        clearCart,
        addOrder,
        addNewProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined)
    throw new Error("ProductsContext was used outside of the ProductsProvider");
  return context;
};

export { ProductsProvider, useProducts };
