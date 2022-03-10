// export default function UrlConfig() {
//     const API_URL ="http://localhost:8000/api/";
//     const urls ={
//         USER_URL : API_URL + 'user',
//         AUTH_URL : API_URL + 'auth'
//     }
// }

const API_URL ="http://localhost:8000/api/";
function UrlConfig(){
    var config = {
        API_URL : API_URL,
        urls : {
            USER_URL : API_URL + 'user',
            AUTH_URL : API_URL + 'auth'
        }
    };
    return  config;
}

export default  UrlConfig;