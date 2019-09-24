import React from "react";
import Container from "@material-ui/core/Container";

import InfoGrid from "./InfoGrid";

const TradeStatus = () => {
  return (
    <>
      <Container maxWidth="md">
        <InfoGrid title={"TradeStatus"} ctn={{ key: 1, key2: 2 }} />
      </Container>
    </>
  );
};

export default TradeStatus;
