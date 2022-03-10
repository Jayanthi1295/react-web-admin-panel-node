import React, { useState } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
  requirePropFactory
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";
import {Card, Panel,Row,Col, ListGroup, ListGroupItem } from 'react-bootstrap';
// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import { useHistory } from 'react-router-dom';
import ImagePath  from '../../../src/images/devices/drone.jpg';
const mainChartData = getMainChartData();
const PieChartData = [
  { name: "Inactive", value: 400, color: "primary" },
  { name: "Idle", value: 300, color: "secondary" },
  { name: "Disabled", value: 300, color: "warning" },
  { name: "Active", value: 200, color: "success" },
];

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();  
  let history = useHistory();

  var redirecttoPage= (path) => {
    history.push(path)
  }
  // local
  var [mainChartState, setMainChartState] = useState("monthly");  

    
  return (
    <>
      <PageTitle title="Dashboard" button={<Button
      variant="contained"
      size="medium"
      color="secondary" 
      onClick={() => redirecttoPage('/app/live/maps')}
    >
        Visit Tracking
    </Button>} />
    <Grid container spacing={4}>
      <Grid item sm={4}  md={4} sm={6} xs={12}>
      <Card  border="success">
        {/* <Card.Img variant="top" src={`https://materializecss.com/images/sample-1.jpg` }/> */}
        <Card.Img variant="top" src={require("../../images/devices/drone.jpg") } className="card-img"/>
        <Card.Body>
          <Card.Title>UAV-Alpha</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem><strong>Drone ID :</strong> Alpha1</ListGroupItem>
            <ListGroupItem><strong>Drone type :</strong>MultiRotor</ListGroupItem>
            <ListGroupItem><strong>Status :</strong>  &nbsp;<span class="btn btn-success">Active</span> <Card.Link href="/app/live/maps">Track</Card.Link></ListGroupItem>
         </ListGroup>
        {/* <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body> */}
      </Card>
      </Grid>
      <Grid item sm={4} md={4} sm={6} xs={12}>
      <Card border="secondary">
        <Card.Img variant="top" src={require("../../images/devices/device2.jpeg")} className="card-img" />
        <Card.Body>
          <Card.Title>UAV-Beta</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroupItem><strong>Drone ID :</strong> Beta 1</ListGroupItem>
            <ListGroupItem><strong>Drone type :</strong>Fixed Wing</ListGroupItem>
            <ListGroupItem><strong>Status :</strong>  &nbsp;<span class="btn btn-secondary">Inactive</span></ListGroupItem>
         </ListGroup>
      </Card>
      </Grid>
      <Grid item sm={4} md={4} sm={6} xs={12}>
      <Card border="warning">
        <Card.Img variant="top" src={require("../../images/devices/device3.jpg")}  className="card-img"/>
        <Card.Body>
          <Card.Title>UAV-Comma</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroupItem><strong>Drone ID :</strong> Comma 1</ListGroupItem>
            <ListGroupItem><strong>Drone type :</strong>Hybrid</ListGroupItem>
            <ListGroupItem><strong>Status :</strong>  &nbsp;<span class="btn btn-warning">Idle</span> </ListGroupItem>
         </ListGroup>
      </Card>
      </Grid>
    </Grid>
    {/* <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Domestic UAV's"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            disableWidgetMenu ={true}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
              <Typography size="xl" weight="medium" noWrap>
                112
              </Typography>
                </Grid>
                
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Active
                </Typography>
                <Typography size="md">80</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Inactive
                </Typography>
                <Typography size="md">32</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Idle
                </Typography>
                <Typography size="md">10</Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Tracking Performance"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
            disableWidgetMenu ={true}
          >
            <div className={classes.performanceLegendWrapper}>
              <div className={classes.legendElement}>
                <Dot color="warning" />
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                >
                  Inside 
                </Typography>
              </div>
              <div className={classes.legendElement}>
                <Dot color="primary" />
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                >
                  Outside 
                </Typography>
              </div>
            </div>
            <div className={classes.progressSection}>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                Inside
              </Typography>
              <LinearProgress
                variant="determinate"
                value={77}
                classes={{ barColorPrimary: classes.progressBarPrimary }}
                className={classes.progress}
              />
            </div>
            <div>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                Outside
              </Typography>
              <LinearProgress
                variant="determinate"
                value={73}
                classes={{ barColorPrimary: classes.progressBarWarning }}
                className={classes.progress}
              />
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Counts Overview"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
            disableWidgetMenu ={true}
          >
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
               34
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
               
                 UAV Count
               
              </div>
            </div>
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
               54
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                Pilot's Count
              </div>
            </div>
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                57
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                 Manufacturer Count
              </div>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="UAV Status" 
          upperTitle className={classes.card}
          disableWidgetMenu ={true}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={PieChartData}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {PieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {PieChartData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            title="Recent UAV Details"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
            
          >
            <Table data={mock.uavs_latest} />
          </Widget>
        </Grid>
    </Grid>  */}
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
