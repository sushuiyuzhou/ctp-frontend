import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  loadRequestID,
  loadRequestMethod,
  loadRequestContent
} from "../redux/actions/requestActions";

import InfoGrid from "./InfoGrid";

const RequestStatus = ({
  path,
  requestID,
  requestMethod,
  requestContent,
  loadRequestID,
  loadRequestMethod,
  loadRequestContent,
  ...props
}) => {
  useEffect(() => {
    loadRequestID(path).catch(error => {
      alert("Loading request ID failed" + error);
    });

    loadRequestMethod(path).catch(error => {
      alert("Loading request method failed" + error);
    });

    loadRequestContent(path).catch(error => {
      alert("Loading request content failed" + error);
    });
  }, []);

  return (
    <>
      <div>requestID: {requestID}</div>
      <div>request method: {requestMethod}</div>
      <InfoGrid title={"request content:"} ctn={requestContent} />
    </>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    requestID: state.request.requestID,
    requestMethod: state.request.requestMethod,
    requestContent: state.request.requestContent
  };
}

const mapDispatchToProps = {
  loadRequestID,
  loadRequestMethod,
  loadRequestContent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestStatus);
