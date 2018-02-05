"use strict";

import React from "react";
import PropTypes from "prop-types";
import { Context } from "almin";
import AppLocator from "../AppLocator.js"
import EntryList from "./EntryList.js";

export default class App extends React.Component {

  componentWillMount() {
    let appContext = AppLocator.context;
    let onChangeHandler = () => {
      this.setState(appContext.getState());
    };
    onChangeHandler();
    this.unSubscribe = appContext.onChange(onChangeHandler);
  }

  componentWillUnmount() {
    this.unSubscribe();
  }

  render() {
    return (
      <div className="content">
        <EntryList
          appContext={this.props.appContext}
          blogState={this.state.blog} />
        <div className="pagination">
        </div>
        <div style={{ clear: "both"}}></div>
      </div>
    )
  }
}
