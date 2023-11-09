var apikey = "1";

function getApi() {
// replace `octocat` with anyone else's GitHub username
	
var userSearch = $("#search-input").val();
	console.log(userSearch);
    var requestUrl = `https://themealdb.com/api/json/v1/1/search.php?s=${userSearch}`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      })}
	  ;

$("#search-button").on("click", function(){
	event.preventDefault()

	getApi();

});