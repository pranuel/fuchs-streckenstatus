import React from "react";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import { Grommet, Main, Heading, Paragraph } from "grommet";
import { StatusForm } from "./StatusForm";
import { ErrorBoundary } from "./ErrorBoundary";
import { fetchCurrentStatus, saveStatus } from "./api";

const theme = {
  global: {
    colors: {
      brand: "#035951"
    },
    font: {
      family: "Roboto",
      size: "24px",
      height: "26px"
    }
  }
};

Amplify.configure(awsconfig);

class App extends React.Component {
  state = {
    hasErrors: false
  };

  async componentDidMount() {
    this.setState({ hasErrors: false });
    try {
      const status = await fetchCurrentStatus();
      this.setState({ status });
    } catch (error) {
      this.setState({ hasErrors: true });
    }
  }

  handleChange = value => this.setState({ status: value });

  handleSubmit = async () => {
    this.setState({ hasErrors: false });
    try {
      const { status } = this.state;
      await saveStatus(status);
    } catch (error) {
      this.setState({ hasErrors: true });
    }
  };

  render() {
    const { status, hasErrors } = this.state;
    return (
      <ErrorBoundary>
        <Grommet theme={theme} full>
          <Main pad="large">
            <Heading>Streckenstatus</Heading>
            <StatusForm
              status={status}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
            />
            {hasErrors && (
              <Paragraph margin="none" color="status-critical">
                Es ist ein Fehler aufgetreten (sind Sie Admin?)
              </Paragraph>
            )}
          </Main>
        </Grommet>
      </ErrorBoundary>
    );
  }
}

export default withAuthenticator(App, true);
