import React, { Component } from 'react';
import {  Tabs, Tab, Modal, Card, Breadcrumb, Container, Row , Col} from "react-bootstrap";
import { Grid } from "@material-ui/core";
import Widget from "../../components/Widget/Widget";
// import ApexLineChart from "./components/ApexLineChart";
// import ApexHeatmap from "./components/ApexHeatmap";
class GeofenceStats extends Component {
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
    }
  };
   
  // componentDidMount() {
  //   window.addEventListener('resize', this._resize);
  //   this._resize();
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this._resize);
  // }

  // _resize = () => {
  //   let size = this.container.getBoundingClientRect();
  //   this.setState({
  //     viewport: {
  //       ...this.state.viewport,
  //       width: size.width - 30,
  //       height: size.height
  //     }
  //   });
  // }

  // _onViewportChange = viewport => this.setState({viewport});

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
                            Geofence
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Geofence Stats</Breadcrumb.Item>
                          </Breadcrumb>
                        </Col> 
                        </Row>
                       <Card>
                       <Card.Header>
                           <h5>Total Count : <span className="btn btn-primary btn-sm">1</span></h5>
                       </Card.Header>
                       <Card.Body>
                         <Row>
                         <Grid item xs={12} md={6}>
                            <Widget title="Apex Line Chart" upperTitle noBodyPadding>
                              
                            </Widget>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Widget title="Apex Heatmap" upperTitle noBodyPadding>
                             
                            </Widget>
                          </Grid>
                         </Row>
                          
                       </Card.Body>
                    </Card>
                   
                  </Grid>
                </Grid> 
          </Container> 
    )
  }
}

export default GeofenceStats;