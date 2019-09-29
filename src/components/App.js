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

const App = ({
  modelPath,
  loadModelPath,
  updateAvailable,
  loadModelUpdate,
  changeUpdateStatus,
  ...props
}) => {
  const [path, setPath] = useState("");
  const [updateStatus, setUpdateStatus] = useState(true);

  useEffect(() => {
    // getModelPath().then(res => setModelPath({ modelPath: res }));
    if (updateStatus) {
      loadModelPath().catch(error => {
        alert("Loading path failed" + error);
      });
      setPath(modelPath);
      // setUpdateStatus(false);
    }

    // notify if model is returned
    if (modelPath != "") {
      toast.success("Server returned model path: " + modelPath);
      // loadModelUpdate(modelPath);
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
                <RequestStatus {...props} path={path} />
                <ResponseStatus {...props} path={path} />
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
