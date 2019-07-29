import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid';

class EmployeeComponent extends Component {
  state = {
    position: '',
    records: []
  }

  async componentDidMount() {
    const employeeName = this.props.match.params.id;
    try {
      const res = await axios.get(`http://api.additivasia.io/api/v1/assignment/employees/${employeeName}`);

      if (get(res.data[1], "direct-subordinates", false) || get(res.data[1], "non-direct-subordinates", false)) {
        const subordinates = get(res.data[1], "direct-subordinates", []) || get(res.data[1], "non-direct-subordinates", []);
        this.setState({ position: res.data[0], records: subordinates });
      }

    } catch (error) {
    }
  }

  renderList() {
    const list = this.state.records;
    return (list.map(item => (
      
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={item} src="https://material-ui.com/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary={item}/>
        </ListItem>
      )));
  }
  render() {
    const employeeName = this.props.match.params.id;
    const isRecordAvailable = this.state.records;
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
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >{employeeName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        { isRecordAvailable && isRecordAvailable.length > 0 ? <List> 
            {this.renderList()}
        </List> : <div>No Subordinates Available</div>}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </Grid>
      </Grid>
    )
  }
}

export default EmployeeComponent;
