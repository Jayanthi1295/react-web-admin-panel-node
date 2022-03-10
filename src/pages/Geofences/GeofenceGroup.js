import React, { Component } from 'react';
import { CloudUpload, ControlPoint } from "@material-ui/icons";
import { Modal, Card, Breadcrumb, Container, Row , Col} from "react-bootstrap";
import { Grid } from "@material-ui/core";

class GeofenceGroup extends Component {
  state = {
    geofencegroups : [],
    modalView : false,
    geofences:[],
    optionSelected: null,
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
   
  constructor(props){
    super(props);

    // get geofences
    this.state.geofences = [
      { value: "ocean1", label: "Ocean", color: "#00B8D9" },
      { value: "blue", label: "Blue", color: "#0052CC" },
      { value: "purple", label: "Purple", color: "#5243AA" },
      { value: "red", label: "Red", color: "#FF5630" },
      { value: "orange", label: "Orange", color: "#FF8B00" },
      { value: "yellow", label: "Yellow", color: "#FFC400" },
      { value: "green", label: "Green", color: "#36B37E" },
      { value: "forest", label: "Forest", color: "#00875A" },
      { value: "slate", label: "Slate", color: "#253858" },
      { value: "silver", label: "Silver", color: "#666666" }
    ];

  }
  
  handleChange = (selected) => {
    this.setState({
      optionSelected: selected
    });
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
  openModal = () => this.setState({ modalView: true });
  closeModal = () => this.setState({ modalView: false });

  render() {
    let { width, height } = this.state;
    return (
      <div className="row">
      <Modal show={this.state.modalView} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Create Geofence Group </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
              <div className="form-group">
                    <label htmlFor="name" className="col-form-label">Geofence Group Name</label>
                    <input type="text" className="form-control" name="name" id="name"/>
              </div>
             
              <div className="form-group">
                    <label htmlFor="speed" className="col-form-label"> Add Groups</label>
                    {/* <input type="text" className="form-control" name="speed" id="speed"/> */}
                   
              </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button type="button"  onClick={this.closeModal}  className="btn btn-secondary" >Close</button>
              <button onClick={this.closeModal} className="btn btn-danger">Clear</button>
              <button className="btn btn-success">Save</button>
            </Modal.Footer>
      </Modal>  
      <Grid container spacing={4}>
                  <Grid item xs={12}>
                          <Row>
                          <Col>
                           <div className="page-title">
                              <p>Geofence Group</p>
                           </div>
                            {/* <Card.Title>Geofence Configuration</Card.Title> */}
                            <Breadcrumb>
                            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="#">
                            Geofence
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Geofence Group</Breadcrumb.Item>
                          </Breadcrumb>
                        </Col> 
                        <Col>
                          <div className="icon-tray">
                                        
                                      
                                                  {/* {this.state.view.showModal ? <Modal handleHideModal={this.handleHideModal}/> : null} */}
                                        <a id="creategeofence" className="btn btn-primary ripple darkGreyBtn" onClick={this.openModal}> <ControlPoint/> Create New Geofence group</a>
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
                                <th>Name</th>
                                <th>No of Geofences</th>
                                <th>Created On</th>
                                <th>Updated On</th>
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
    </div>
    )
  }
}

export default GeofenceGroup;