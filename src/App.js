import React from "react";
import Amplify, { API } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import {
  Grommet,
  Main,
  Heading,
  RadioButtonGroup,
  Form,
  FormField,
  Button,
  Paragraph
} from "grommet";
import { Checkmark } from "grommet-icons";

const theme = {
  global: {
    colors: {
      brand: "#035951"
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px"
    }
  }
};

Amplify.configure(awsconfig);

const apiUrl = "fuchsstreckenstatusapi";
const statusEndpoint = "/status";
const Status = {
  green: "Green",
  yellow: "Yellow",
  red: "Red"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: Status.green,
      hasErrors: false
    };
  }

  setStatus = async status => {
    this.setState({ hasErrors: false });
    try {
      await API.post(apiUrl, statusEndpoint, {
        body: {
          id: "1",
          status
        }
      });
      await this.getCurrentStatus();
    } catch (error) {
      this.setState({ hasErrors: true });
    }
  };

  getCurrentStatus = async () => {
    this.setState({ hasErrors: false });
    try {
      const response = await API.get(apiUrl, statusEndpoint + "/object/1");
      return response.status;
    } catch (error) {
      this.setState({ hasErrors: true });
    }
  };

  async componentDidMount() {
    const currentStatus = await this.getCurrentStatus();
    this.setState({ status: currentStatus });
  }

  handleChange = value => this.setState({ status: value });

  handleSubmit = async () => {
    const { status } = this.state;
    await this.setStatus(status);
  };

  render() {
    const { status, hasErrors } = this.state;
    return (
      <Grommet theme={theme}>
        <Main pad="large">
          <Heading>Streckenstatus</Heading>
          <Form onSubmit={this.handleSubmit}>
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
              onChange={event => this.handleChange(event.target.value)}
            />
            <Button
              type="submit"
              label="Status speichern"
              icon={<Checkmark />}
              primary={true}
            />
          </Form>
          {hasErrors && (
            <Paragraph margin="none" color="status-critical">
              Es ist ein Fehler aufgetreten (sind Sie Admin?)
            </Paragraph>
          )}
        </Main>
      </Grommet>
    );
  }
}

export default withAuthenticator(App, true);
