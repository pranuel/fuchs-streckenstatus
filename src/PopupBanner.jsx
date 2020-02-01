import React from "react";
import { Box, Collapsible, Button, Text } from "grommet";
import { Close } from "grommet-icons";

export function PopupBanner(props) {
  const { text, open, onClose } = props;
  return (
    <Collapsible direction="vertical" open={open}>
      <Box
        width="medium"
        background="light-2"
        elevation="small"
        direction="row"
        fill
      >
        <Box align="center" justify="center" fill>
          <Text>{text}</Text>
        </Box>
        <Box fill="vertical" alignSelf="end">
          <Button icon={<Close />} onClick={onClose} justify="start" />
        </Box>
      </Box>
    </Collapsible>
  );
}
