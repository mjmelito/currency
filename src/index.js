import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './exchange-service.js';


// // Business Logic

function exchange(dollar, currency) {
  let promise = ExchangeService.exchange(dollar, currency);
  promise.then(function(response) {
    printElements(response, dollar, currency);
  }, function(errorMessage) {
    printError(errorMessage);
  });
}


// UI Logic

function printElements(results) {
  if (results[0].conversion_result === undefined) {
    document.querySelector('#response').setAttribute('class', 'bg-danger');
    document.querySelector('#response').innerText = `It appears you haven't entered an amount to calculate. Please double check that you have completed the form above`;
  } else {
    document.querySelector('#response').innerText = `${results[1]} USD is equal to ${results[0].conversion_result} ${results[2]}.`;
  }
}

function printError(error) {
  document.querySelector('#response').setAttribute('class', 'bg-danger');
  if (error[1]['error-type'] === 'unsupported-code') {
    document.querySelector('#response').innerText = `Sorry! ${error[3]} is not a supported currency code.`;
  } else {
    document.querySelector('#response').innerText = `Sorry! There was an error accessing the exchange rate data for ${error[3]}: ${error[0].status} ${error[0].statusText}`;
  }
}


function handleFormSubmission(event) {
  event.preventDefault();
  const dollar = document.querySelector('#dollar').value;
  const currency = document.querySelector('#currency').value;
  exchange(dollar, currency);
  document.querySelector('#response').removeAttribute('class');
}

window.addEventListener("load", function() {
  this.document.querySelector('form').addEventListener("submit", handleFormSubmission);
});