import React, { Component } from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import MenuList from '@material-ui/core/MenuList';
import { withRouter, Link } from "react-router-dom";
import {styles} from './styles';
import uniq from 'lodash/uniq'

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

function getSuggestions(value, suggestions, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
      const keep =
        count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

class IntegrationDownshift extends Component {
  state = {
    suggestions: [],
    disableButton: true
  }
  componentDidMount() {
    const res = JSON.parse(localStorage.getItem('history')) || [];
    if(res.length <= 0) {
      let itemsArray = []
      localStorage.setItem('history', JSON.stringify(itemsArray))
    }
    this.getUser();
  }
  getUser = async () => {
    try {
      const response = await axios.get('http://api.additivasia.io/api/v1/assignment/employees');
      const res = response.data.map(item => { return { label: item } });
      this.setState({ suggestions: res });
    } catch (error) {
    }
  };

  selectedItem(item) {
    let data = JSON.parse(localStorage.getItem('history')) || [];
    data.push(item);
    const uniqData = uniq(data);
    localStorage.setItem('history', JSON.stringify(uniqData));
    this.setState({disableButton: false, selectedUser: item});
  }

  redirectoEmployee() {
    const user = this.state.selectedUser;
    this.props.history.push(`/employee/${user}`)
  }

  getRecentData() {
    let res = JSON.parse(localStorage.getItem('history')) || [];
    return (
      res.map(item => (
        <MenuItem >
          <Link to={`/employee/${item}`}> {item} </Link>
        </MenuItem>
      ))
    );
  }
  handle(text) {
    if(!text) {
      this.setState({disableButton: true})
    }
  }
  render() {
    const { classes } = this.props;
    const { suggestions, disableButton } = this.state;


    return (
      <Grid container>
        <Grid item xs={9}>
          <Downshift id="downshift-simple" onChange={this.selectedItem.bind(this)} onInputValueChange={this.handle.bind(this)}> 
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              selectedItem

            }) => {
              const { onBlur, onFocus, ...inputProps } = getInputProps({
                placeholder: 'Choose an employee',
              });

              return (
                <div className={classes.container}>
                  {renderInput({
                    fullWidth: true,
                    classes,
                    label: 'Employee Name',
                    InputLabelProps: getLabelProps({ shrink: true }),
                    InputProps: { onBlur, onFocus },
                    inputProps,
                  })}

                  <div {...getMenuProps()}>
                    {isOpen ? (
                      <Paper className={classes.paper} square>
                        {getSuggestions(inputValue, suggestions).map((suggestion, index) =>
                          renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({ item: suggestion.label }),
                            highlightedIndex,
                            selectedItem,
                          }),
                        )}
                        <div>
                          <div className={styles.recent}>Recent Searches</div>
                           <MenuList>{this.getRecentData()}</MenuList>

                        </div>
                      </Paper>
                    ) : null}
                  </div>
                </div>
              );
            }}
          </Downshift>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" className={classes.button} color={disableButton ? "": "secondary"}  disabled ={disableButton} onClick={()=>this.redirectoEmployee()}>
            Search
          </Button>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(withRouter(IntegrationDownshift));