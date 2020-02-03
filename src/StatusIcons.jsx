import React from "react";
import {
  StatusCritical,
  StatusGood,
  StatusWarning,
  StatusUnknown
} from "grommet-icons";
import { Status } from "./status.model";

export const getStatusIcon = (status, size) => {
  switch (status) {
    case Status.red:
      return <StatusCritical color="status-critical" size={size} />;
    case Status.yellow:
      return <StatusWarning color="status-warning" size={size} />;
    case Status.green:
      return <StatusGood color="status-ok" size={size} />;
    default:
      return <StatusUnknown color="status-unknown" size={size} />;
  }
};
