import React from 'react';
import { Route } from 'react-router-dom';
import Configuration from './Configuration';
import GeofenceGroup from './GeofenceGroup';
import GeofenceStats from './GeofenceStats';

const GeofencePage = ({match}) => (
  <div className="content">
    <div className="container-fluid">
      <Route path={`${match.url}/geofence-config`} component={Configuration} />
      <Route path={`${match.url}/geofence-group`} component={GeofenceGroup} />
      <Route path={`${match.url}/geofence-allstats`} component={GeofenceStats} />
    </div>
  </div>
);

export default GeofencePage;