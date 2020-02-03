import React from "react";
import { RadioButtonGroup, Form, FormField, Button } from "grommet";
import { Checkmark } from "grommet-icons";
import { Status } from "./status.model";
import { StatusRadioButton } from "./StatusRadioButton";

export function StatusForm(props) {
  const { isAdmin } = props;
  const error = isAdmin
    ? undefined
    : "Sie können den Status nur als Admin speichern!";
  const [status, setStatus] = React.useState(Status.green);
  return (
    <Form onSubmit={() => props.onSubmit(status)}>
      <FormField name="status" error={error}>
        <RadioButtonGroup
          name="status"
          options={[
            {
              value: Status.green,
              label: "Grün"
            },
            {
              value: Status.yellow,
              label: "Gelb"
            },
            {
              value: Status.red,
              label: "Rot"
            }
          ]}
          value={status}
          onChange={event => setStatus(event.target.value)}
          margin="medium"
        >
          {(option, { checked }) => {
            return (
              <StatusRadioButton
                {...option}
                checked={checked}
                onChange={status => setStatus(status)}
              />
            );
          }}
        </RadioButtonGroup>
      </FormField>
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
