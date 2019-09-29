import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { host, port } from "../utils/redis";

import {
  loadResponseMethod,
  loadResponseKeys
} from "../redux/actions/responseActions";

import InfoGrid from "./InfoGrid";

const ResponseStatus = ({
  path,
  responseMethod,
  loadResponseMethod,
  responseKeys,
  loadResponseKeys,
  ...props
}) => {
  useEffect(() => {
    loadResponseMethod(path).catch(error => {
      alert("Loading response method failed" + error);
    });

    loadResponseKeys(path).catch(error => {
      alert("Loading response keys failed" + error);
    });
  }, []);

  return (
    <>
      <div>response method: {responseMethod}</div>
      <div>
        response keys:
        <ul>
          {responseKeys ? (
            responseKeys.map(text => (
              <li key={text}>
                <a
                  href={host + ":" + port + "/HGETALL/" + text}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {text}
                </a>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    responseMethod: state.response.responseMethod,
    responseKeys: state.response.responseKeys
  };
}

const mapDispatchToProps = {
  loadResponseMethod,
  loadResponseKeys
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponseStatus);
