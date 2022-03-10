import http from "./http-common";
import  UrlConfig from './UrlConfig';
// Telematics API
//let telematicsURL = 'https://intouch.mapmyindia.com/iot/api';
 console.log(">>> UrlConfig ",UrlConfig);
//console.log(">>> MMI REACT_APP_API_URI ",process.env.REACT_APP_API_URI,">>>> API_URL ",API_URL, "urls ",urls) ;
const getAllGeofences = () => {
    console.log(">>> UrlConfig inside",UrlConfig);
    let userURL = UrlConfig.API_URL;
    console.log(">>>> user url ", userURL);
    return http.get('/');
  };
  
  const get = (id) => {
    return http.get(`/tutorials/${id}`);
  };
  
  const create = (data) => {
    return http.post("/tutorials", data);
  };
  
  const update = (id, data) => {
    return http.put(`/tutorials/${id}`, data);
  };
  
  const remove = (id) => {
    return http.delete(`/tutorials/${id}`);
  };
  
  const removeAll = () => {
    return http.delete(`/tutorials`);
  };
  
  const findByTitle = (title) => {
    return http.get(`/tutorials?title=${title}`);
  };
  
  const MMIService = {
    getAllGeofences,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
  };
  
  export default MMIService;