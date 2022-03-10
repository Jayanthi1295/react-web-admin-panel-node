import axios from "axios";

const API_URL = "http://localhost:8000/api/" +"auth/"; 
console.log(">>> REACT_APP_API_URI ",process.env.REACT_APP_API_URI);
// "http://localhost:8080/api/auth/";
//console.log(">>>> auth service ", API_URL)
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
          //console.log(">>> response ",response);
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response;
      }).catch(error=>{
          return error;
           
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password
    }).then(response=>{
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch(error=>{
      console.log(">>>> error ",error);
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();