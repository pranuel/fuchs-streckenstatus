import React from "react";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import { Grommet, Main, Heading, Paragraph } from "grommet";
import { StatusForm } from "./StatusForm";
import { ErrorBoundary } from "./ErrorBoundary";
import { fetchCurrentStatus, saveStatus } from "./api";
import { StatusDisplay } from "./StatusDisplay";

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
    hasErrors: false,
    isAdmin: false
  };

  async componentDidMount() {
    const cognitoGroups = this.props.authData.signInUserSession.idToken.payload[
      "cognito:groups"
    ];
    const isAdmin =
      !!cognitoGroups && cognitoGroups.some(group => group === "Admins");
    this.setState({ isAdmin });
    await this.refreshStatus();
  }

  handleSubmit = async status => {
    this.setState({ hasErrors: false });
    try {
      await saveStatus(status);
      await this.refreshStatus();
    } catch (error) {
      this.setState({ hasErrors: true });
    }
  };

  async refreshStatus() {
    this.setState({ hasErrors: false });
    try {
      const status = await fetchCurrentStatus();
      this.setState({ status });
    } catch (error) {
      this.setState({ hasErrors: true });
    }
  }

  render() {
    const { status, hasErrors, isAdmin } = this.state;
    return (
      <ErrorBoundary>
        <Grommet theme={theme} full>
          <Main flex pad="large" fill overflow={{ horizontal: "hidden" }}>
            <Heading>Streckenstatus</Heading>
            <StatusForm
              isAdmin={isAdmin}
              status={status}
              onSubmit={this.handleSubmit}
            />
            {hasErrors && (
              <Paragraph margin="none" color="status-critical">
                Es ist ein Fehler aufgetreten...
              </Paragraph>
            )}
            <StatusDisplay status={status} />
          </Main>
        </Grommet>
      </ErrorBoundary>
    );
  }
}

export default withAuthenticator(App, true);
