//Function to generate language options
//API fetch request to get object with language codes supported by lectoAPI
function generateLanguageOptionsLecto(){
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
  
  //Use returned data to create user inputs(drop down menu, translate buttons)
  $.ajax(settings).done(function (response) {
	var languageArray = response.languages;
    //var userInputDiv = $(`<div class="user-input gap-4">`);
    var dropDown = $('#languages-lecto');
    var defaultDropDown = $(`<option value="" disabled selected>Select a language</option>`);
    dropDown.append(defaultDropDown);
    //var translateIngredientButton = $(`<button type="submit" id="translate-ingredient-btn" class="mx-1 text-black bg-yellow-500 hover:bg-yellow-600  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Translate Ingredients</button>`);
    //var translateMethodButton = $(`<button type="submit" id="translate-method-btn" class="mx-1 text-black bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Translate Instructions</button>`);
	  //for loop iterates data object to create each language option with code to be used in translation function
    for (var i = 0; i < languageArray.length; i++){
      var languageName = languageArray[i].display_name;
      var languageCode = languageArray[i].language_code;
      var languageOption = $(`<option value="${languageCode}">${languageName}</option>`);
      dropDown.append(languageOption);
    }
    //userInputDiv.append(dropDown, translateIngredientButton, translateMethodButton);
    //$(".recipe-deck-content").append(userInputDiv);
    dropDown.on("change",doTranslation);
  })

};


function doTranslation(event){
    //alert($(this).val());
    var mealDb = JSON.parse(localStorage.getItem("mealDb"));
    if(mealDb != null){
        var languageCode = $(this).val();

        for(i=0; i<mealDb.meals.length; i++){
          
          var instruction = $(`#instruction-${i}`);
          var instructionText = instruction.html();
          //translate(languageCode,oldText,instruction);
          setTimeout(function(){translate(languageCode, instructionText, instruction)}, 2000);
          setTimeout(translate, 5000, languageCode, instructionText, instruction);
          //setTimeout(function(){translate(languageCode, $(`#instruction-${i}`).html(), $(`#instruction-${i}`))}, 2000);
          var r = $(`#recipe-${i}`);
          var recipeText = r.html();
          //translate(languageCode,oldText,r);
          setTimeout(function(){translate(languageCode, recipeText, r)}, 2000);
        }
    }
}