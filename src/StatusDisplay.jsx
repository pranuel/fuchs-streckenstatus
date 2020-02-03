import React from "react";
import { Box, Heading } from "grommet";
import {
  getStatusIcon
} from "./StatusIcons";

export function StatusDisplay(props) {
  const { status } = props;
  return (
    <Box flex pad="large" align="center">
      <Heading level={3}>Aktuell gespeicherter Status:</Heading>
      {getStatusIcon(status, "large")}
    </Box>
  );
}
