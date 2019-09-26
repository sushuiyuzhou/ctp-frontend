import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import TradeStatus from "./TradeStatus";
import PageNotFound from "./PageNotFound";

import { connect } from "react-redux";
import { loadModelPath } from "../redux/actions/pathActions";

import Spinner from "./common/Spinner";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ({ modelPath, loadModelPath, ...props }) => {
  const [path, setPath] = useState("");

  useEffect(() => {
    // getModelPath().then(res => setModelPath({ modelPath: res }));
    loadModelPath().catch(error => {
      alert("Loading path failed" + error);
    });
    setPath(modelPath);

    // notify if model is returned
    if (modelPath != "") {
      toast.success("Server returned model path: " + modelPath);
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
            render={props => <TradeStatus {...props} path={path} />}
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
    modelPath: state.modelPath
  };
}

const mapDispatchToPropos = {
  loadModelPath
};

export default connect(
  mapStateToProps,
  mapDispatchToPropos
)(App);
