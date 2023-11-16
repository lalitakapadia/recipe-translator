//// FLOW-3: fetch supported Languages - Function to generate language options
//API fetch request to get object with language codes supported by lectoAPI
function generateLanguageOptionsLecto(){
  // FLOW-3-1 setup api settings such as url, api key etc
	const settings = {
    async: true,
    crossDomain: true,
    url: 'https://lecto-translation.p.rapidapi.com/v1/translate/languages',
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'bc97a45c89msh3eda3b2b978fb1fp1f44c1jsn30893d3a6b96',
      'X-RapidAPI-Host': 'lecto-translation.p.rapidapi.com'
    }
  };
  
  $.ajax(settings).done(function (response) {
	var languageArray = response.languages;
   // FLOW-3-2 create drop down list with default option
    var dropDown = $('#languages-lecto');
    var defaultDropDown = $(`<option value="" disabled selected>Select a language</option>`);
    dropDown.append(defaultDropDown);
	  // FLOW-3-3 for loop iterates data object to create each language option with code to be used in translation function
    for (var i = 0; i < languageArray.length; i++){
      var languageName = languageArray[i].display_name;
      var languageCode = languageArray[i].language_code;
      var languageOption = $(`<option value="${languageCode}">${languageName}</option>`);
      dropDown.append(languageOption);
    }
    //FLOW-3-4 add event listener for change
    dropDown.on("change",triggerTranslation);
  })

};

 //FLOW-3-4 this triggers translation for each recipe
function triggerTranslation(event){
  //FLOW-3-4-1 get the mealdb data from local storage to loop throgh number of recipes
  var mealDb = JSON.parse(localStorage.getItem("mealDb"));
  //FLOW-3-4-2 if data is not null 
  if(mealDb != null){
    //FLOW-3-4-3 get selected languagecode from dropdown
    var languageCode = $(this).val();
    //FLOW-3-4-4 loop through all recipes
    for(i = 0; i < mealDb.meals.length; i++){
      //FLOW-3-5 get the instruction for given recipe
      var instruction = $(`#instruction-${i}`);
      //FLOW-3-6 get the html from the instruction div for given recipe
      var instructionText = instruction.html();
      //FLOW-3-4-7 call the translate function for instruction with a time dealy due to api call rate limit
      setTimeout(function(){translate(languageCode, instructionText, instruction)}, 1000 * (i + 1));
       //FLOW-3-4-8 get the recipe div for the given recipe
      var r = $(`#recipe-${i}`);
        //FLOW-3-4-9 get the recipe div html that contains title ingredients and measurement
      var recipeText = r.html();
       //FLOW-3-4-10 call the translate function for ingredient with a time dealy due to api call rate limit
      setTimeout(function(){translate(languageCode, recipeText, r)}, 1000 * (i + 3));
    }
  }
}