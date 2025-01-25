import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import Input from "../components/UserForm/Input";
import UserForm from "../components/UserForm/UserForm";
import { useReducer } from "react";

const initialState = {
  email: "",
  password: "",
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "emailChange":
      return { ...state, email: action.payload };
    case "passwordChange":
      return { ...state, password: action.payload };
    case "error":
      return { ...state, error: action.payload };
    case "formSubmit":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
};

function LoginPage() {
  const [{ email, password, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { login } = useUser();
  const navigate = useNavigate();

  const handleEmailChange = (newEmail) => {
    dispatch({ type: "emailChange", payload: newEmail });
  };

  const handlePasswordChange = (newPassword) => {
    dispatch({ type: "passwordChange", payload: newPassword });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loggedIn = await login(email, password);
    dispatch({ type: "formSubmit" });
    if (!loggedIn) dispatch({ type: "error", payload: "Invalid credentials" });
    else navigate("/");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center text-xs sm:text-sm md:text-base">
      <div className="bg-white w-full sm:w-2/3 md:w-1/4 flex flex-col justify-center items-center rounded-md py-4">
        <img src="Identity.svg" alt="logo" />
        <UserForm error={error} onSubmit={handleLogin} submitText="Login">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          >
            E-mail
          </Input>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          >
            Password
          </Input>
        </UserForm>
        <Link to="/sign-up" className="text-xs self-center my-4">
          Create new account
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
