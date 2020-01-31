import React from "react";
import { RadioButtonGroup, Form, FormField, Button, Paragraph } from "grommet";
import { Checkmark } from "grommet-icons";
import { Status } from "./status.model";

export function StatusForm(props) {
  const { status, isAdmin } = props;
  return (
    <Form onSubmit={({ value }) => props.onSubmit(value.status)}>
      <FormField
        name="status"
        component={RadioButtonGroup}
        options={[
          {
            value: Status.green,
            label: "Grün",
            id: "greenRadio"
          },
          {
            value: Status.yellow,
            label: "Gelb",
            id: "yellowRadio"
          },
          {
            value: Status.red,
            label: "Rot",
            id: "redRadio"
          }
        ]}
        value={status}
        margin="medium"
      />
      {!isAdmin && (
        <Paragraph margin="none" color="status-critical">
          Sie können den Status nur als Admin speichern!
        </Paragraph>
      )}
      <Button
        disabled={!isAdmin}
        type="submit"
        label="Status speichern"
        icon={<Checkmark />}
        primary={true}
      />
    </Form>
  );
}
