import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";

class Bar extends Component {
  redirectToHome = () => {
    this.props.history.push(`/`)
  }

  render() {
    const {pathname} = this.props.location;
    const isTrue = pathname.includes("employee");

    return (
      <AppBar color="primary" position="static">
        <Toolbar variant="regular">
          <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">Reactive Way</Typography>
    { isTrue && <Button color="secondary" variant="contained" onClick={this.redirectToHome}>Back</Button> }
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(Bar);