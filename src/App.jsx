import React from "react";
import { Grommet, Main, Heading, Paragraph, Button, Text } from "grommet";
import { Logout } from "grommet-icons";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import { StatusForm } from "./StatusForm";
import { ErrorBoundary } from "./ErrorBoundary";
import { fetchCurrentStatus, saveStatus } from "./api";
import { StatusDisplay } from "./StatusDisplay";
import { PopupBanner } from "./PopupBanner";
import { Auth } from "aws-amplify";
import { AppBar } from "./AppBar";

Amplify.configure(awsconfig);

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

const offlineReadyText = "Du kannst die App jetzt offline nutzen!";
const newContentText = `Es gibt neuen Inhalt.
Um ihn zu sehen, schließe diesen Tab (wenn du die App im Browser nutzt)
oder schieße die App ab (wenn du sie dem Homescreen hinzgefügt hast).`;

export class App extends React.Component {
  get isLoggedIn() {
    return this.props.authState === "signedIn";
  }
  get isAdmin() {
    if (!this.props.authData) {
      return false;
    }
    const cognitoGroups = this.props.authData.signInUserSession.idToken.payload[
      "cognito:groups"
    ];
    const isAdmin =
      !!cognitoGroups && cognitoGroups.some(group => group === "Admins");
    return isAdmin;
  }
  get userName() {
    if (!this.props.authData) {
      return "?";
    }
    return this.props.authData.username;
  }
  constructor(props) {
    super(props);
    props.swConfig.onUpdate = this.onSwUpdate;
    props.swConfig.onSuccess = this.onSwSuccess;
    this.state = {
      showNewContentBanner: false,
      showOfflineReadyBanner: false
    };
  }

  onSwUpdate = () => {
    this.setState({ showNewContentBanner: true });
  };

  onSwSuccess = () => {
    this.setState({ showOfflineReadyBanner: true });
  };

  signOut = async () => {
    await Auth.signOut();
  };

  async componentDidMount() {
    await this.refreshStatus();
  }

  handleSubmit = async status => {
    this.setState({ error: undefined });
    try {
      await saveStatus(status);
      await this.refreshStatus();
    } catch (error) {
      this.setState({ error });
    }
  };

  async refreshStatus() {
    this.setState({ error: undefined });
    try {
      const status = await fetchCurrentStatus();
      this.setState({ status });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const {
      status,
      error,
      showOfflineReadyBanner,
      showNewContentBanner
    } = this.state;
    return (
      <ErrorBoundary>
        <Grommet theme={theme} full>
          <AppBar>
            <Text>Hi {this.userName}!</Text>
            <Button
              label="Ausloggen"
              icon={<Logout />}
              onClick={this.signOut}
              justify="start"
              alignSelf="end"
            />
          </AppBar>
          <Main flex pad="large" fill overflow={{ horizontal: "hidden" }}>
            <Heading>Streckenstatus</Heading>
            <StatusForm
              isAdmin={this.isAdmin}
              status={status}
              onSubmit={this.handleSubmit}
            />
            {!!error && (
              <Paragraph margin="none" color="status-critical">
                Es ist ein Fehler aufgetreten: "{error}"
              </Paragraph>
            )}
            <StatusDisplay status={status} />
            <PopupBanner
              open={showOfflineReadyBanner}
              text={offlineReadyText}
              onClose={() => this.setState({ showOfflineReadyBanner: false })}
            />
            <PopupBanner
              open={showNewContentBanner}
              text={newContentText}
              onClose={() => this.setState({ showNewContentBanner: false })}
            />
          </Main>
        </Grommet>
      </ErrorBoundary>
    );
  }
}

export default withAuthenticator(App, false);
