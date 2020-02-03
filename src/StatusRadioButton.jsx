import React from "react";
import { Box, RadioButton } from "grommet";
import { getStatusIcon } from "./StatusIcons";

export const StatusRadioButton = props => {
  const icon = getStatusIcon(props.value, "medium");
  return (
    <Box direction="row" pad="small" gap="small">
      {icon}
      <RadioButton
        name="status"
        {...props}
        onChange={event => props.onChange(event.target.value)}
      />
    </Box>
  );
};
