import React from "react";
import "./App.css";
import Amplify, { API } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";

Amplify.configure(awsconfig);

const apiUrl = "fuchsstreckenstatusapi";
const Status = {
  green: "Green",
  yellow: "Yellow",
  red: "Red"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  post = async () => {
    console.log("calling api");
    const response = await API.post(apiUrl, "/items", {
      body: {
        status: Status.green
      }
    });
    alert(JSON.stringify(response, null, 2));
  };

  get = async () => {
    console.log("calling api");
    const response = await API.get(apiUrl, "/items/object/1");
    alert(JSON.stringify(response, null, 2));
  };

  list = async () => {
    console.log("calling api");
    const response = await API.get(apiUrl, "/items");
    this.setState({ items: response });
    console.log(this.state.items);
  };

  render() {
    const { items } = this.state;
    return (
      <div className="App">
        <button onClick={this.post}>POST</button>
        <button onClick={this.get}>GET</button>
        <button onClick={this.list}>LIST</button>
        <h1>List:</h1>
        <ul>
          {items.map(item => (
            <li>item</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
