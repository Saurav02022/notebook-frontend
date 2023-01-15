export const initialState = {
  name: "",
  email: "",
  password: "",
  age: "",
};

const SignupReducer = (state, { type, payload }) => {
  switch (type) {
    case "name": {
      return {
        ...state,
        name: payload,
      };
    }
    case "email": {
      return {
        ...state,
        email: payload,
      };
    }
    case "password": {
      return {
        ...state,
        password: payload,
      };
    }
    case "age": {
      return {
        ...state,
        age: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default SignupReducer;
