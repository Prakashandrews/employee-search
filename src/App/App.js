// React
import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Material-UI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// Custom
import settings from '../settings';
import Bar from '../layout/Bar/Bar';

import HomeContent from '../content/HomeContent/HomeContent';
import EmployeeComponent from '../content/HomeContent/EmployeeComponent';

import NotFoundContent from '../content/NotFoundContent/NotFoundContent';


let theme = createMuiTheme({
  palette: {
    primary: settings.theme.primaryColor.import,
    secondary: settings.theme.secondaryColor.import,
    type: settings.theme.type
  }
});

class App extends Component {
  render() {

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div style={{ minHeight: '100vh', backgroundColor: theme.palette.type === 'dark' ? '#303030' : '#fafafa' }}>
              <React.Fragment>
                <Bar title="Reactive way" />
                <Switch>
                  <Route path="/" exact render={() => (<HomeContent />)} />
                  <Route path="/employee/:id" component={EmployeeComponent} />
                  <Route component={NotFoundContent} />
                </Switch>
              </React.Fragment>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
