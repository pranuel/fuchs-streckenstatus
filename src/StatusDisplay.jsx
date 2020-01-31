import React from "react";
import { Box } from "grommet";
import {
  StatusCritical,
  StatusGood,
  StatusWarning,
  StatusUnknown
} from "grommet-icons";
import { Status } from "./status.model";

const getStatusIcon = status => {
  switch (status) {
    case Status.red:
      return <StatusCritical color="status-critical" size="large" />;
    case Status.yellow:
      return <StatusWarning color="status-warning" size="large" />;
    case Status.green:
      return <StatusGood color="status-ok" size="large" />;
    default:
      return <StatusUnknown color="status-unknown" size="large" />;
  }
};

export function StatusDisplay(props) {
  const { status } = props;
  return (
    <Box direction="row" flex pad="large">
      <label>Aktuell gespeicherter Status:</label>
      {getStatusIcon(status)}
    </Box>
  );
}
