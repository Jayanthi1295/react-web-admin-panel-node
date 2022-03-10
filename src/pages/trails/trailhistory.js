import React,{ Component } from 'react';
import MyMap from "mapmyindia-react";
import {  Tabs, Tab, Modal, Card, Breadcrumb, Container, Row , Col} from "react-bootstrap";
import { Grid } from "@material-ui/core";
import Widget from "../../components/Widget/Widget";

class TrailsHistory extends Component {
  state = {
    geofencegroups : [],
    viewport: {
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
      bearing: 0,
      pitch: 0,
      width: 500,
      height: 500
    },
   map : null,
   polygons : [],
   visbility : false,
   p1 : null,
   poly: null,
   pts: null
  };
  constructor(props){
    super(props);
  }
  render() {
    let { width, height } = this.state;
    return (
      <Container fluid> 
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                          <Row>
                          <Col>
                           <div className="page-title">
                              <p>Geofence Stats</p>
                           </div>
                            {/* <Card.Title>Geofence Configuration</Card.Title> */}
                            <Breadcrumb>
                            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="#">
                            Trails
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Trails History</Breadcrumb.Item>
                          </Breadcrumb>
                        </Col> 
                        </Row>
                       <Card>
                       <Card.Header>
                           <h5>Total Count : <span className="btn btn-primary btn-sm">1</span></h5>
                       </Card.Header>
                       <Card.Body>
                         
                    
                       
                          
                                      <MyMap
                                          markers={[
                                          {
                                              position: [18.5314, 73.845],
                                              draggable: true,
                                              title: "device 1",
                                              center: [28.549948, 77.268241],
                                              editable: true,
                                              zoomControl: true,
                                              hybrid: true,
                                              onClick: e => {
                                              console.log("clicked ");
                                              },
                                              onDragend: e => {
                                              console.log("dragged");
                                              }
                                          }
                                          ]}
                                      />
                          
                          
                         
                          
                       </Card.Body>
                    </Card>
                   
                  </Grid>
                </Grid> 
          </Container> 
    )
  }
}
export default TrailsHistory;
// let MyIMap = () => (
//   <div className="row">
//     <div className="col-md-12">
//       <div className="card">
//         <div className="header">
//           <h4>MapMyIndia Map</h4>
//         </div>
//         <div className="content">

//         <div className="top-div">
//             <span className="top-div-span1">MapmyIndia Maps API: </span>
//             <span className="top-div-span2">Map Polygon Example</span>
//           </div>
//           <div id="result">
//             <div className="btn-div"><button id="mapmyindia_geometry_of_green_polygon">Green Polygon Geometry</button></div>
//             <div className="btn-div"><button id="mapmyindia_create_polygon_noneditable">Non-editable Polygon</button></div>
//             <div className="btn-div"><button id="mapmyindia_create_polygons_editable"> Editable Polygon</button></div>
//             <div className="btn-div"><button id="mapmyindia_remove_polygons">Remove Polygon</button></div>

//             <div className="msg-cont">
//               <ul className="msg-list">
//                 <li>Click anywhere on a polygon to show info window.</li>
//                 <li>Drag the polygon to shift to a new position.</li>
//                 <li>Click on controls to create a polygon,rectangle.</li>
//                 <li>Drag the marker to see if it is under the green polygon or outside.</li>
//                 <li>Control click on the drawn items to remove from map.</li>
//               </ul>
//             </div>
//             <div className="event-header">Event Logs</div>
//             <div id="event-log"></div>
         

//         </div>

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