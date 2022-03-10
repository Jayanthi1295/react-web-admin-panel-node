import React from "react";

import AuthService from "../services/auth.services";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "SIGNUP_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGNUP_FAILURE":
      return { ...state, isAuthenticated: false }; 
    case "LOGIN_FAILURE":
        return { ...state, isAuthenticated: false };   
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

function getUserInfo(field){
  var currentUser = JSON.parse(localStorage.getItem("user"));
 // console.log(">>> current user in test ",currentUser," field ",field, " type of ",typeof currentUser);
  let value = currentUser[field];
  return value;
}
export { UserProvider, useUserState, useUserDispatch, loginUser, signUpUser, signOut, getUserInfo };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  dispatch({ type: "LOGIN_FAILURE" });
  setError(false);
  setIsLoading(true);
   console.log(">> login user ", login, password);
  if (!!login && !!password) {
    setTimeout(() => {
      AuthService.login(login, password).then(
        (resp) => {
          console.log(">>>> usercontext resp ",resp);
           if(resp.status===200 && resp!==undefined)
           {
          console.log(">>>> resp ",resp);
          localStorage.setItem('id_token', 1)
          setError(null)
          setIsLoading(false)
          dispatch({ type: 'LOGIN_SUCCESS' })
          history.push('/app/dashboard')
           }
        else {
         //  console.log(">> error on UI ",error);
            dispatch({ type: "LOGIN_FAILURE" });
            setError(true);
            setIsLoading(false);
        }
      }
      ).catch(err=>{

        console.log(">> error block ",err);
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);
        history.push("/login");
      });
      // localStorage.setItem('id_token', 1)
      // setError(null)
      // setIsLoading(false)
      // dispatch({ type: 'LOGIN_SUCCESS' })

      // history.push('/app/dashboard')
    }, 2000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signUpUser(dispatch, name, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
   console.log(">> signup user ",name, login, password);
  if (!!login && !!password && !!name) {
    setTimeout(() => {
      AuthService.register(name,login, password).then(
        (resp) => {
           if(resp!==undefined)
           {
          console.log(">>>> resp ",resp);
          localStorage.setItem('id_token', 1)
          setError(null)
          setIsLoading(false)
          dispatch({ type: 'SIGNUP_SUCCESS' })
          history.push('/login')
           } 
        else {
           // console.log(">> error on UI ",error);
            dispatch({ type: "SIGNUP_FAILURE" });
            setError(true);
            setIsLoading(false);
        }
      }
      ).catch(err=>{

        console.log(">> error block ",err);
        dispatch({ type: "SIGNUP_FAILURE" });
        setError(true);
        setIsLoading(false);
        history.push("/login");
      });
      // localStorage.setItem('id_token', 1)
      // setError(null)
      // setIsLoading(false)
      // dispatch({ type: 'LOGIN_SUCCESS' })

      // history.push('/app/dashboard')
    }, 2000);
  } else {
    dispatch({ type: "SIGNUP_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}
function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  localStorage.removeItem("user");
  localStorage.removeItem("title");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
