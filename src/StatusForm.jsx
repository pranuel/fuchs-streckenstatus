import React from "react";
import { RadioButtonGroup, Form, FormField, Button } from "grommet";
import { Checkmark } from "grommet-icons";
import { Status } from "./status.model";

export function StatusForm(props) {
  const { status } = props;
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
      <Button
        type="submit"
        label="Status speichern"
        icon={<Checkmark />}
        primary={true}
      />
    </Form>
  );
}
