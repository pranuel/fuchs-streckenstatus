import React from "react";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import { Grommet, Main, Heading, Paragraph } from "grommet";
import { StatusForm } from "./StatusForm";
import { ErrorBoundary } from "./ErrorBoundary";
import { fetchCurrentStatus, saveStatus } from "./api";
import { StatusDisplay } from "./StatusDisplay";
import { PopupBanner } from "./PopupBanner";

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

Amplify.configure(awsconfig);

class App extends React.Component {
  constructor(props) {
    super(props);
    props.swConfig.onUpdate = this.onSwUpdate;
    props.swConfig.onSuccess = this.onSwSuccess;
    this.state = {
      hasErrors: false,
      isAdmin: false,
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
    const {
      status,
      hasErrors,
      isAdmin,
      showOfflineReadyBanner,
      showNewContentBanner
    } = this.state;
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

export default withAuthenticator(App, true);
