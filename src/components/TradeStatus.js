import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";

import {
  loadRequestID,
  loadRequestMethod
} from "../redux/actions/requestActions";

import InfoGrid from "./InfoGrid";

const TradeStatus = ({
  path,
  requestID,
  requestMethod,
  requestCtn,
  loadRequestID,
  loadRequestMethod,
  ...props
}) => {
  useEffect(() => {
    loadRequestID(path).catch(error => {
      alert("Loading request ID failed" + error);
    });

    loadRequestMethod(path).catch(error => {
      alert("Loading request method failed" + error);
    });
  }, []);

  return (
    <>
      <h3>requestID: {requestID}</h3>
      <h3>request method: {requestMethod}</h3>
      <InfoGrid title={"request content:"} ctn={{ key: 1, key2: 2 }} />
    </>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    requestID: state.request.requestID,
    requestMethod: state.request.requestMethod
  };
}

const mapDispatchToProps = {
  loadRequestID,
  loadRequestMethod
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeStatus);
