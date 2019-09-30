import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import RequestStatus from "./RequestStatus";
import ResponseStatus from "./ResponseStatus";
import PageNotFound from "./PageNotFound";

import { connect } from "react-redux";
import { loadModelPath } from "../redux/actions/pathActions";
import {
  loadModelUpdate,
  changeUpdateStatus
} from "../redux/actions/updateActions";

import Spinner from "./common/Spinner";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { host, port } from "../utils/redis";

const App = ({
  modelPath,
  loadModelPath,
  updateAvailable,
  loadModelUpdate,
  changeUpdateStatus,
  ...props
}) => {
  const [path, setPath] = useState("");
  const [updateStatus, setUpdateStatus] = useState(false);
  let [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    loadModelPath().catch(error => {
      alert("Loading path failed" + error);
    });
    setPath(modelPath);
    setUpdateStatus(false);

    // notify if model is returned
    if (modelPath != path) {
      toast.success("Server returned model path: " + modelPath);
    }
  }, [modelPath, updateStatus]);

  useEffect(() => {
    if (modelPath != "") {
      fetch(host + ":" + port + "/SUBSCRIBE/" + modelPath, {
        method: "GET"
      }).then(function(response) {
        console.log(response);
        const reader = response.body.getReader();
        function go() {
          reader.read().then(function(result) {
            if (!result.done) {
              var ctn = JSON.parse(
                new TextDecoder("utf-8").decode(result.value)
              );
              console.log(ctn.SUBSCRIBE);
              setUpdateStatus(true);
              setUpdateCount(Math.random());
              go();
            }
          });
        }
        go();
      });
    }
  }, [modelPath]);

  return path == "" ? (
    <Spinner />
  ) : (
    <>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <>
                <RequestStatus {...props} path={path} count={updateCount} />
                <ResponseStatus {...props} path={path} count={updateCount} />
              </>
            )}
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    modelPath: state.modelPath,
    updateAvailable: state.updateAvailable
  };
}

const mapDispatchToProps = {
  loadModelPath,
  loadModelUpdate,
  changeUpdateStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
