import React, { useEffect } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Routes from './route';

function App(props) {
  return (<Routes/>);
}

App.propTypes = {
  token: PropTypes.string
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    token: state.profile.token
  };
};

export default connect(mapStateToProps, null)(App);
