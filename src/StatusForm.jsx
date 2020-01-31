import React from "react";
import { RadioButtonGroup, Form, FormField, Button } from "grommet";
import { Checkmark } from "grommet-icons";

const Status = {
  green: "Green",
  yellow: "Yellow",
  red: "Red"
};

export function StatusForm(props) {
  const { status } = props;
  return (
    <Form onSubmit={props.onSubmit}>
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
        onChange={event => props.onChange(event.target.value)}
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
