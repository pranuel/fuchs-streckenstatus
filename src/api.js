import { API } from "aws-amplify";

const apiUrl = "fuchsstreckenstatusapi";
const statusEndpoint = "/status";

export const saveStatus = async status => {
  await API.post(apiUrl, statusEndpoint, {
    body: {
      id: "1",
      status
    }
  });
};

export const fetchCurrentStatus = async () => {
  const response = await API.get(apiUrl, statusEndpoint + "/object/1");
  return response.status;
};
