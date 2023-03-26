
export default class ExchangeService {
  static exchange(dollar, currency) {
    return new Promise(function(resolve, reject) {
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
  }
}


