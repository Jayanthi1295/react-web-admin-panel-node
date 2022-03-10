import React, {Component,  useState, useEffect, useMemo, useRef} from 'react';
import MyMap from "mapmyindia-react";
import { Card, Breadcrumb, Container, Row , Col} from "react-bootstrap";
import { Modal  } from 'react-bootstrap';
import { Grid } from "@material-ui/core";
import deviceData  from './deviceData';
import _ from 'lodash';

import $ from 'jquery';
//import * as utils from '../../../src/utils/mmi.scripts';
//https://stackoverflow.com/questions/38467574/import-javascript-file-and-call-functions-using-webpack-es6-reactjs
// https://stackoverflow.com/questions/69981823/how-to-get-a-function-inside-a-script-tag-in-react-js
const MapmyIndia = window.MapmyIndia;
export default class LiveMaps extends Component{
  
  state = {
    geofenses : [],
    selecteddata : [],
    modalView : false,
    bulkuploadModal : false,
    error:[],
    selected: '',
    markers : {},
    map : {},
    search : true,
   
  }
  mapsPromise = false;
  constructor(props){
    super(props);
    this.state.markers = [
      {
        position: [18.5314, 73.845],
        editable: true,
        zoomControl: true,
        hybrid: true,
        title: "Marker title",
          // position: [18.5314, 73.845],
          // draggable: true,
          // title: "Marker title",
          // onClick: e => {
          // console.log("clicked ", e);
          // },
          // onDragend: e => {
          // console.log("dragged", e);
          // }
      }
      ]
      this.state.map ={
        center: [18.5314, 73.845],
        editable: true,
        zoomControl: true,
        hybrid: true,
        search: true,
        markers : this.state.markers
      }
     // this.drawCarMarkerOnPolyline();
    //   this.map= new MapmyIndia.Map('map', {
    //     center: center,
    //     editable: true,
    //     zoomControl: true,
    //     hybrid: true
    // });
  }
  // getMmiMaps() {
  //   // If we haven't already defined the promise, define it
  //   if (!this.mapsPromise) {
  //     this.mapsPromise = new Promise((resolve) => {
  //       // Add a global handler for when the API finishes loading
  //       window.resolveMapsPromise = () => {
  //         // Resolve the promise
  //         resolve(mapmyindia);

  //         // Tidy up
  //         delete window.resolveMapsPromise;
  //       };

  //       // Load the Google Maps API
  //       const script = document.createElement("script");
  //       const API = '709ba551f47efb30edcb5bd85cc66558';
  //       script.src = `https://apis.mapmyindia.com/advancedmaps/v1/${API}/map_load?v=1.3&plugin=editable,path.drag,polylinedecorator&callback=resolveMapsPromise`;
  //       script.async = true;
  //       document.body.appendChild(script);
  //     });
  //   }

  //   // Return a promise for the Google Maps API
  //   return this.mapsPromise;
  // }

  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
    //this.getMmiMaps();
   
     
  }
  do_load = () => {
    var self = this;
    console.log(">>> do_load ");
    $(document).ready(function(){
     // alert("jquery");
      console.log(">>> jquery");
      // var mapContainer= document.getElementById("map1");
      // console.log(">>>> mapcontainervalue  in jquery", mapContainer);
      // var map1 =null;
  //     map1 = new MapmyIndia.Map(mapContainer, {
  //      center: center,
  //      editable: true,
  //      zoomControl: true,
  //      hybrid: true
  //  });
  //     //var block= $("#map1").text("xyz");
      //console.log(">>>> block ", block);
   })
  }

  componentDidMount() {
    // this.maps.loadMaps('map1',
    // {
    //   key:'709ba551f47efb30edcb5bd85cc66558',
    // zoom:{control:true,position:[]},
    // search:{control:true,width:'calc(100vw - 92px)'},
    // location:{control: true,initial:true,zoom:16,bounds:true,position:[]}
    // })
     this.div = document.createElement('div');
    const script = document.createElement("script");
    script.async = true;
    const API = '709ba551f47efb30edcb5bd85cc66558';
    script.src = `https://apis.mapmyindia.com/advancedmaps/v1/${API}/map_load?v=1.3&plugin=editable,path.drag,polylinedecorator`;
    var block = document.getElementById("mainContent");
    //this.div.appendChild(script);
    document.head.appendChild(script);
    // console.log(">>>>>>>> script ",script , ">>> block ",block,">>> div ",this.div);
    setTimeout(function(){
      window.getLiveDataMap();
    },500);
   
    // Once the Google Maps API has finished loading, initialize the map
    //this.getMmiMaps().then((mapmyindia) => {

       // create the maps
    //    var myOptions = {
    //     center: center,
    //     editable: true,
    //     zoomControl: true,
    //     hybrid: true
    // }
    // map = new MapmyIndia.maps.Map(document.getElementById("map1"), myOptions);

      // const uluru = {lat: -25.363, lng: 131.044};
      // const map = new google.maps.Map(document.getElementById('map1'), {
      //   zoom: 4,
      //   center: uluru
      // });
      // const marker = new google.maps.Marker({
      //   position: uluru,
      //   map: map
      // });
    //});
  }
  render(){
    // var self = this;
    // setTimeout(function () {
    //   self.do_load();
    // }, 100);
    return (
      <Container fluid> 
           <Modal show={this.state.modalView} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Create Geofence </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
              <div className="form-group">
                    <label htmlFor="name" className="col-form-label">Geofence Name</label>
                    <input type="text" className="form-control" name="name" id="name"/>
              </div>
              <div className="form-group">
                  <div className="col-md-6">
                     <label htmlFor="file2" className="col-form-label">Latitude</label>
                     <input type="text" className="form-control"  name="lat" id="lat"/>
                  </div>
                  <div className="col-md-6">
                     <label htmlFor="file2" className="col-form-label">Longitude</label>
                     <input type="text" className="form-control"  name="long" id="long"/>
                  </div>
              </div>
              <br/>
              <div className="form-group">
                      <label htmlFor="name" className="col-form-label">Choose Geofence Type</label>  <br/>
                     <input type ="radio" name="geotype" id="geotype" value="Circle" /> &nbsp; Circle  &nbsp;   
                     <input type ="radio" name="geotype" id="geotype" value="Polygon" />&nbsp; Polygon &nbsp;   
                     <input type ="radio" name="geotype" id="geotype" value="Pointer" />&nbsp; Pointer &nbsp;   
              </div>
              <br/>
              <div className="form-group">
                    <label htmlFor="speed" className="col-form-label">Max Speed(Km)</label>
                    <input type="text" className="form-control" name="speed" id="speed"/>
              </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button type="button"  onClick={this.closeModal}  className="btn btn-secondary" >Close</button>
              <button onClick={this.closeModal} className="btn btn-danger">Clear</button>
              <button className="btn btn-success">Save</button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.bulkuploadModal} onHide={this.closeBulkModal}>
            <Modal.Header closeButton>
              <Modal.Title>Bulk Upload</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
              <div className="form-group">
                    <label htmlFor="name" className="col-form-label">Upload a file</label>
                    <input type="file" className="form-control" name="file" id="file"/>
              </div>
              </form>
              <div className="card">
                 <div className="card-body">
                   <span className="danger">Note:</span>
                   <ol>
                     <li>Fields marked with asterisk(*) are mandatory in excel sheet.</li>
                     <li>Enter the data from third row in excel sheet.</li>
                     <li>For Polygon, in Lat Column use series of Latitude i.e. 28.644800, 28.654800, 28.664800,… and in Long Column use series of Longitude i.e. 77.216721, 77.217721, 77.216821,…</li>
                   </ol>
                 </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="button"  onClick={this.closeBulkModal}  className="btn btn-secondary" >Close</button>
              <button onClick={this.closeBulkModal} className="btn btn-danger">Clear</button>
              <button className="btn btn-success">Upload</button>
            </Modal.Footer>
          </Modal>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                        <Row>
                          <Col>
                           <div className="page-title">
                              <p>Maps</p>
                           </div>
                            {/* <Card.Title>Geofence Configuration</Card.Title> */}
                            <Breadcrumb>
                            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="#">
                            Maps
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Live</Breadcrumb.Item>
                          </Breadcrumb>
                        </Col> 
                        <Col>
                          {/* <div className="icon-tray">
                                        
                                        <button id="fileupload"  type="button" className="btn btn-primary " onClick={this.openBulkModal}> <i className="bi bi-upload"><CloudUpload /></i> Bulk Upload</button> &nbsp;
                                                 
                                        <a id="creategeofence" className="btn btn-primary ripple darkGreyBtn" onClick={this.openModal}> <ControlPoint/> Create New Geofence</a>
                          </div> */}
                        </Col>
                        </Row>
                       <Card>
                       <Card.Header>
                           <h5>Total Count : <span className="btn btn-primary btn-sm">1</span></h5>
                       </Card.Header>
                       <Card.Body>
                         <Row>
                           <Col md={4}>
                         
                           
                           </Col>
                           <Col md={8}>
                           <div className="content">
                           <MyMap 
                              search={this.state.search}   
                              markers = {this.state.markers}
                           >
                           
                           </MyMap>
                               {/* <div id="map1" className='map1-container' data-id="map1"></div> */}
                            </div>
                            {/* <table className="table table-hover table-striped">
                            <thead>
                              <tr>
                                <th><input type="checkbox" id="selectall"></input> </th>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Radius(m)</th>
                                <th>Tag</th>
                                <th>Creation Time</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                             
                            </tbody>
                          </table> */}
                          </Col>
                         </Row>
                          
                       </Card.Body>
                    </Card>
                   
                </Grid>
            </Grid> 
          </Container>  
    )
  }
}
// let MyIMap = () => (
//   <div className="row">
//     <div className="col-md-12">
//       <div className="card">
//         <div className="header">
//           <h4>MapMyIndia Map</h4>
//         </div>
//         <div className="content">
//           <div style={{ width: '100%', height: '500px', boxSizing: 'border-box' }}>
//           <MyMap
//                 markers={[
//                 {
//                     position: [18.5314, 73.845],
//                     draggable: true,
//                     title: "Marker title",
//                     onClick: e => {
//                     console.log("clicked ");
//                     },
//                     onDragend: e => {
//                     console.log("dragged");
//                     }
//                 }
//                 ]}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>

// );

// export default MyIMap;

$(document).ready(function(){
  alert(">>> jquery ");
  $("#map").addClass("liveDataMap");
   //   window.onload = function () {
                var map =null;
               // var centre = new L.LatLng(28.549948, 77.268241);
                // map=new MapmyIndia.Map('map1',{center:[28.549948, 77.268241],zoomControl: true,hybrid:true });
               
            //   }
          //   function loadScript(src,callback){
  
          //     var script = document.createElement("script");
          //     script.type = "text/javascript";
          //     if(callback)script.onload=callback;
          //     document.getElementsByTagName("head")[0].appendChild(script);
          //     script.src = src;
          //   }
            
            
          //   loadScript('https://apis.mapmyindia.com/advancedmaps/v1/709ba551f47efb30edcb5bd85cc66558/map_load?v=1.3&plugin=editable,path.drag,polylinedecorator&callback=initialize',
          //               function(){log('map-loader has been loaded, but not the maps-API ');});
          
          
          // function initialize() {
          // //   map1 = new MapmyIndia.Map('map1', {
          // //     center: center,
          // //     editable: true,
          // //     zoomControl: true,
          // //     hybrid: true
          // // });
          //    //var center = new L.LatLng(28.549948, 77.268241);
          //     log('maps-API has been loaded, ready to use');
          //     var mapOptions = {
          //       center: [28.549948, 77.268241],
          //       editable: true,
          //       zoomControl: true,
          //       hybrid: true
    
          //     };
          //     map = new MapmyIndia.maps.Map(document.getElementById('map1'),
          //             mapOptions);
          //   }
          
          // function log(str){
          //   document.getElementsByTagName('pre')[0].appendChild(document.createTextNode('['+new Date().getTime()+']\n'+str+'\n\n'));
          // }
          
})