import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  addUser,
  getAllOrders,
  getAllUsers,
  getUser,
  getUserById,
} from "../services/apiUser";
import { updateCart } from "../services/apiProducts";

const UserContext = createContext();

const initialState = {
  email: "",
  password: "",
  id: "",
  cart: {},
  orders: [],
  role: "",
  tempCart: {},
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "emailChange":
      return { ...state, email: action.payload };
    case "passwordChange":
      return { ...state, password: action.payload };
    case "login":
      return {
        ...state,
        ...action.payload,
        cart: { ...JSON.parse(action.payload.cart) },
        orders: JSON.parse(action.payload.orders),
        tempCart: {},
      };
    case "cartChange":
      return { ...state, cart: action.payload };
    case "tempCartChange":
      return { ...state, tempCart: action.payload };
    case "ordersChange":
      return { ...state, orders: action.payload };
    case "logout":
      return initialState;
    case "startLoading":
      return { ...state, isLoading: true };
    case "stopLoading":
      return { ...state, isLoading: false };
    default:
      throw new Error("Unknown action");
  }
};

const UserProvider = ({ children }) => {
  const [
    { email, password, id, cart, orders, role, tempCart, isLoading },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const LoadUser = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        if (userId != id) {
          const userData = await getUserById(JSON.parse(userId));
          dispatch({ type: "login", payload: userData });
        }
      }
    };
    LoadUser();
  }, [id]);

  const login = async (email, password) => {
    try {
      const data = await getUser(email, password);
      if (!data) return false;
      dispatch({ type: "login", payload: data });
      sessionStorage.setItem("userId", data.id);
      sessionStorage.setItem("role", data.role);
      if (sessionStorage.getItem("cart")) {
        const newCart = {
          ...JSON.parse(data.cart),
          ...JSON.parse(sessionStorage.getItem("cart")),
        };
        sessionStorage.removeItem("cart");
        updateCart(data.id, JSON.stringify(newCart));
        dispatch({
          type: "cartChange",
          payload: newCart,
        });
      }
      return true;
    } catch {
      return false;
    }
  };

  const signUp = async (email, password) => {
    try {
      await addUser(email, password);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("userId");
    dispatch({ type: "logout" });
  };

  const loadAllUsers = useCallback(async () => {
    dispatch({ type: "startLoading" });
    try {
      const data = await getAllUsers();
      console.log(data);
      return data;
    } catch {
      throw new Error("Something went wrong with fetching users info");
    } finally {
      dispatch({ type: "stopLoading" });
    }
  }, []);

  const loadAllOrders = useCallback(async () => {
    dispatch({ type: "startLoading" });
    try {
      const data = await getAllOrders();
      const result = [];
      data.map((record) => {
        const recordOrders = JSON.parse(record.orders);
        recordOrders.map((recordOrder) => {
          const products = [];
          let total = 0;
          Object.values(recordOrder).map((order) => {
            products.push(order);
            total += order.price;
          });
          result.push({ userId: record.id, order: products, total });
        });
      });
      return result;
    } catch {
      throw new Error("Something went wrong with fetching orders info");
    } finally {
      dispatch({ type: "stopLoading" });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        id,
        cart,
        email,
        password,
        orders,
        role,
        tempCart,
        isLoading,
        login,
        signUp,
        logout,
        loadAllUsers,
        loadAllOrders,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UserContext was used outside of the UserProvider");
  return context;
};

export { UserProvider, useUser };
