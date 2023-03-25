import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './exchange.js';


// // Business Logic

function exchange(dollar, currency) {
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    const url =`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${currency}/${dollar}`;
    request.addEventListener("loadend", function() {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        resolve([response, dollar, currency]);
      } else {
        reject([this, response, dollar, currency]);
      }
    });
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function(response) {
    printElements(response, dollar, currency);
  }, function(errorMessage) {
    printError(errorMessage);
  });
}


// UI Logic

function printElements(results) {
  document.querySelector('#response').innerText = `${results[1]} USD is equal to ${results[0].conversion_result} ${results[2]}.`;
}

function printError(error) {
  document.querySelector('#response').innerText = `Sorry! There was an error accessing the exchange rate data for ${error[3]}: ${error[0].status} ${error[0].statusText}`;
}


function handleFormSubmission(event) {
  event.preventDefault();
  const dollar = document.querySelector('#dollar').value;
  const currency = document.querySelector('#currency').value;
  exchange(dollar, currency);
}

window.addEventListener("load", function() {
  this.document.querySelector('form').addEventListener("submit", handleFormSubmission);
});