import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import Input from "../components/UserForm/Input";
import UserForm from "../components/UserForm/UserForm";
import { useReducer } from "react";

const initialState = {
  email: "",
  password: "",
  message: "",
  messageColor: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "emailChange":
      return { ...state, email: action.payload };
    case "passwordChange":
      return { ...state, password: action.payload };
    case "messageChange":
      return { ...state, ...action.payload };
    case "formSubmit":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
};

function SignUpPage() {
  const [{ email, password, message, messageColor }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { signUp } = useUser();

  const handleEmailChange = (newEmail) => {
    dispatch({ type: "emailChange", payload: newEmail });
  };

  const handlePasswordChange = (newPassword) => {
    dispatch({ type: "passwordChange", payload: newPassword });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch({ type: "formSubmit" });
    const result = await signUp(email, password);
    if (result)
      dispatch({
        type: "messageChange",
        payload: {
          message: "Account created successfully",
          messageColor: "green",
        },
      });
    else
      dispatch({
        type: "messageChange",
        payload: {
          message: "There was a problem creating your account",
          messageColor: "red",
        },
      });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center text-xs sm:text-sm md:text-base">
      <div className="bg-white w-full sm:w-2/3 md:w-1/4 flex flex-col justify-center items-center rounded-md py-4">
        <img src="Identity.svg" alt="logo" />
        <UserForm
          error={message}
          onSubmit={handleSignUp}
          submitText="Sign up"
          messageColor={messageColor}
        >
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
        <Link to="/login" className="text-xs self-center my-4">
          Have an account?
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
