var apikey = "1";
function getApi() {
    // replace `octocat` with anyone else's GitHub username
    var requestUrl = 'https://themealdb.com/api/json/v1/1/search.php?s=Arrabiata';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }
  getApi();

  