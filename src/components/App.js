import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import TradeStatus from "./TradeStatus";
import PageNotFound from "./PageNotFound";

import { connect } from "react-redux";
import { loadModelPath } from "../redux/actions/pathActions";

import { toast } from "react-toastify";

const App = ({ modelPath, loadModelPath, ...props }) => {
  const [path, setPath] = useState("model");

  useEffect(() => {
    // getModelPath().then(res => setModelPath({ modelPath: res }));
    loadModelPath().catch(error => {
      alert("Loading path failed" + error);
    });
    setPath(modelPath);
  }, [modelPath]);

  return (
    <div>
      {path}
      <Switch>
        <Route exact path="/" component={TradeStatus} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
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
