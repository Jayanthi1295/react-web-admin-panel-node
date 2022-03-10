import React from "react";
// import {
//   withGoogleMap,
//   withScriptjs,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";
import  Map   from "mapmyindia-react";
import axios from "axios";
// styles
import useStyles from "./styles";


// const BasicMap = withScriptjs(
//   withGoogleMap(() => (
//     <GoogleMap
//       defaultZoom={12}
//       defaultCenter={{
//         lat: parseFloat(-37.813179),
//         lng: parseFloat(144.950259),
//       }}
//     >
//       <Marker position={{ lat: -37.813179, lng: 144.950259 }} />
//     </GoogleMap>
//   )),
// );
  // <div className={classes.mapContainer}>

export default function Maps() {
  var classes = useStyles();
  var data = {
    "grant_type": "client_credentials",
    "client_id": "33OkryzDZsJzBfpUNoVGjYBePiv_s5dNUDZimuWCr9PHopKU5DVKdTxnWwoFhFurpTcQ3XE7GQmlZp77xZQNcg==",
    "client_secret": "lrFxI-iSEg8wMQ_k6JHxMDsRoWmnV619rF3gxU3CQUeGgeEmoQZN5es4a_DXo_qk-P7BTrJhXsr1bnzVeiWQnaSuAzUMPoPo"
    };
   var reqheaders ={
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
   }  
   var tokenurl = 'https://outpost.mapmyindia.com/api/security/oauth/token';

   axios.post(tokenurl,data, { headers :reqheaders} )
   .then(resp=>{
        console.log(">>>> resp ",resp)
   }).catch(error=>{
     console.log(">>>>>>>>>>> error ",error);
   })
  return (
  
    <div>
      <Map
         
         markers={[
             {
                 position: [11.016844, 76.955833],
                 draggable: true,
                 title: "Marker1",
                 onClick: e => {
                     console.log("clicked ");
                 },
                 onDragend: e => {
                     console.log("dragged");
                 }
             },
             {
               position: [11.126844, 76.955833],
               draggable: true,
               title: "Marker2 ",
               onClick: e => {
                   console.log("clicked 2");
               },
               onDragend: e => {
                   console.log("dragged 2");
               }
           }
         ]}
         />
      {/* <BasicMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg"
        loadingElement={<div style={{ height: "inherit", width: "inherit" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      /> */}
    </div>
  );
}
