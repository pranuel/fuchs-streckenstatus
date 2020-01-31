import React from "react";
import { Box } from "grommet";
import { StatusCritical, StatusGood, StatusWarning } from "grommet-icons";
import { Status } from "./status.model";

const getStatusIcon = status => {
  switch (status) {
    case Status.red:
      return <StatusCritical color="status-critical" size="large" />;
    case Status.yellow:
      return <StatusWarning color="status-warning" size="large" />;
    default:
      return <StatusGood color="status-ok" size="large" />;
  }
};

export function StatusDisplay(props) {
  const { status } = props;
  return (
    <Box direction="row" flex>
      <label>Aktuell gespeicherter Status:</label>
      {getStatusIcon(status)}
    </Box>
  );
}
