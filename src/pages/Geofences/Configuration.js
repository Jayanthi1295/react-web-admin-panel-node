import { CloudUpload, ControlPoint } from "@material-ui/icons";
import React, { useState, useEffect, useMemo, useRef, Component } from "react";
import { Card, Breadcrumb, Container, Row , Col} from "react-bootstrap";
import { Grid } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
//import Map from './Map';
import MMIServices from '../../../src/services/mmi.services';

// import jsonp from "jsonp";
 import axios from "axios";
// import jsonpAdapter from "axios-jsonp";
import { Modal  } from 'react-bootstrap';

export default class Configuration extends Component{
   state = {
     geofenses : [],
     selecteddata : [],
     modalView : false,
     bulkuploadModal : false,
     error:[],
     selected: '',
   }
  constructor(props){
    super(props);

    MMIServices.getAllGeofences()
    .then((response) => {
      console.log(">>> geofence data ",response)
      //this.setState({geofenses : response.data});
    })
    .catch((e) => {
      console.log("geofence error: ",e);
    });

    // this.config = {
    //   method: 'get',
    //   url: 'https://intouch.mapmyindia.com/iot/api/geofences',
    //   headers: {
    //     'accept': 'application/json',
    //     'Authorization': 'Bearer c45a7107-844d-4ab5-95fe-e517a497d995'  /* put your token here without <>*/
    //   }
    // };
    // console.log(">>>  config ",this.config);
    // axios({
    //   method: 'get',
    //   url: 'https://intouch.mapmyindia.com/iot/api/geofences',
    //   headers: {
    //     'accept': 'application/json',
    //     'Authorization': 'Bearer c45a7107-844d-4ab5-95fe-e517a497d995'  /* put your token here without <>*/
    //   }
    // })
    // .then(function (response) {
    //   console.log("response>>>>>>>>> ",JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //   console.log(">>>>>>>>>>>>>>>> error",error);
    // });
    // axios.get({
    //   url: this.baseURL,
    //   adapter: jsonpAdapter,
    //   headers: {
    //     "Authorization": this.token
    //   },
    // }).then((res) => {
    //   console.log(">>>>>>>>>>>>>> res ",res);
    // }).catch((err)=>{
    //   console.log(">>>>>>>>>> error ",err)
    // });

    // let config = {
    //   headers: {'Authorization': this.token},
    // }
    // axios.get(this.baseURL, config)
    // .then((response)=>{
    //     console.log(">>> ressponse ",response);
    // })
    // .catch((error)=>{
    //   console.error(">>>> error fetch data:",error);
    // })

    // const options = {
    //   method: 'GET',
    //   headers: { "Authorization": "Bearer 18e9660f-db2b-4e7d-ad7f-caf23f383dff"},
    //   dataType: "jsonp",
    //   url: this.baseURL
    // };
    // axios(options).then((rs)=>{
    //  console.log(">>>>>>>>>>> axios res ",rs);
    // }).catch((er)=>{
    //   console.log(">>>>>>>>>>>>>  axios er ",er)
    // });
   // adapter: jsonpAdapter,
    // headers: {
    //   "Authorization": "Bearer 55055f1d-2361-40ac-9c64-5992908ed87e"
    // }
    // jsonp(this.baseURL, { headers: {
    //   "Authorization": this.token
    // } }, (err, data) => {
    //   if (err) {
    //     console.error(">>> error block",err.message);
    //   } else {
    //     console.log(">>>> data block ",data);
    //   }
    // });
  }
  createData = (event) => {
    console.log(">>>> create geofence data ",event);
		event.preventDefault();
		//this.setState({msg: ''});

		// let data = new FormData();
		// data.append('file', this.state.file);
    //     console.log(">> this.state.file) ",this.state.file);
		// fetch('http://localhost:8080/upload', {
		// 	method: 'POST',
		// 	body: data
		// }).then(response => {
		// 	this.setState({msg: "File successfully uploaded"});
		// }).catch(err => {
		// 	this.setState({error: err});
		// });
    } 
    openModal = () => this.setState({ modalView: true });
    closeModal = () => this.setState({ modalView: false });

    openBulkModal = () => this.setState({ bulkuploadModal: true });
    closeBulkModal = () => this.setState({ bulkuploadModal: false });
    componentDidMount(){
   
  }
  render(){
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
  
            
              <div className="modal fade"   id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Upload Files for verification</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                                <div className="modal-body">
                                <form>
                                    <span id="entryId"></span>
                                    <p> selectedData
                                    {/* {this.state.selectedData._id}<br/>
                                    {this.state.selectedData.customerName}<br/>
                                    {this.state.selectedData.wtgName} */}
                                    </p>
                                    <div className="form-group">
                                    <label htmlFor="file1" className="col-form-label">Select File 1</label>
                                    <input type="file" className="form-control" name="file1" id="file1"/>
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="file2" className="col-form-label">Select File 2</label>
                                    <input type="file" className="form-control"  name="file2" id="file2"/>
                                </div>
                                <div className="form-group">
                                <label htmlFor="file3" className="col-form-label">Select File 3</label>
                                <input type="file" className="form-control"  name="file3" id="file3"/>
                                </div>
                                <div className="form-group">
                                <label htmlFor="file4" className="col-form-label">Select File 4</label>
                                <input type="file" className="form-control"  name="file4" id="file4"/>
                                </div>
                                <div className="form-group">
                                <button onClick={this.createData}>Upload</button>
                                </div>
                                </form>
                                </div>
                                <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Clear</button>
                                <button type="button" className="btn btn-success">Submit</button>
                                </div>
                            </div>
                      </div>
              </div>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                          <Row>
                          <Col>
                           <div className="page-title">
                              <p>Geofence Configuration</p>
                           </div>
                            {/* <Card.Title>Geofence Configuration</Card.Title> */}
                            <Breadcrumb>
                            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="#">
                            Geofence
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Geofence Configuration</Breadcrumb.Item>
                          </Breadcrumb>
                        </Col> 
                        <Col>
                          <div className="icon-tray">
                                        
                                        <button id="fileupload"  type="button" className="btn btn-primary " onClick={this.openBulkModal}> <i className="bi bi-upload"><CloudUpload /></i> Bulk Upload</button> &nbsp;
                                                  {/* {this.state.view.showModal ? <Modal handleHideModal={this.handleHideModal}/> : null} */}
                                        <a id="creategeofence" className="btn btn-primary ripple darkGreyBtn" onClick={this.openModal}> <ControlPoint/> Create New Geofence</a>
                          </div>
                        </Col>
                        </Row>
                       <Card>
                       <Card.Header>
                           <h5>Total Count : <span className="btn btn-primary btn-sm">1</span></h5>
                       </Card.Header>
                       <Card.Body>
                         <Row>
                            <table className="table table-hover table-striped">
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
                              {/* {this.state.geofenses.map(item => (
                                <tr key={item.id}>
                                  <td>{item.id}</td>
                                  <td>{item.name}</td>
                                  <td>$ {item.salary}</td>
                                  <td>{item.country}</td>
                                  <td>{item.city}</td>
                                </tr>
                              ))} */}
                            </tbody>
                          </table>
                         </Row>
                          
                       </Card.Body>
                    </Card>
                   
                  </Grid>
                </Grid> 
          </Container>  
    )
  }
}

// let GoogleMap = () => (

//   <div className="row">
//     <div className="col-md-12">
//       <div className="card">
//         <div className="header">
//           <h4>Google Map</h4>
//         </div>
//         <div className="content">
//           <div style={{ width: '100%', height: '500px', boxSizing: 'border-box' }}>
//             <Map
//               location={{ latitude: -25.363882, longitude: 131.044922 }}
//               containerElement={
//                 <div style={{ width: '100%', height: '100%' }} />
//               }
//               mapElement={
//                 <div style={{ height: `100%`, height: '100%' }} />
//               } />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>

// );

// export default GoogleMap;