const Status = {
  green: "Green",
  yellow: "Yellow",
  red: "Red"
};

const goodIcon = document.querySelector("#goodIcon > path");
const warningIcon = document.querySelector("#warningIcon > path");
const criticalIcon = document.querySelector("#criticalIcon > path");
const unknownIcon = document.querySelector("#unknownIcon > path");

function loadStatus() {
  fetch(
    "https://4kst5mok57.execute-api.eu-central-1.amazonaws.com/dev/status/object/1"
  )
    .then(function(response) {
      // The API call was successful!
      return response.json();
    })
    .then(json => {
      const status = json.status;
      switch (status) {
        case Status.green:
          goodIcon.classList.remove("invisible");
          break;
        case Status.yellow:
          warningIcon.classList.remove("invisible");
          break;
        case Status.red:
          criticalIcon.classList.remove("invisible");
          break;
        default:
          unknownIcon.classList.remove("invisible");
          break;
      }
    })
    .catch(function(err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });
}
loadStatus();
