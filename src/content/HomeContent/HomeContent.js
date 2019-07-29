import React, { Component } from 'react';
import DownshiftMultiple from './DownshiftMultiple';
import Grid from '@material-ui/core/Grid';

class HomeContent extends Component {
  render() {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={9} direction="row"
          justify="center"
          alignItems="center">
          <DownshiftMultiple />
        </Grid>
      </Grid>

    )
  }
}
  
export default HomeContent;