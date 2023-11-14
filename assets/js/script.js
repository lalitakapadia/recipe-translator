const apikey = "1";
function getMealdbByName(mealName) {
  //search mealdb api by ingredient
  const requestMealdbUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + mealName;

  fetch(requestMealdbUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //calling mealdata function
      displayMealData(data);
    });
}

// add event listener for search button
$('#searchButton').on('click',searchMealEvent);
function searchMealEvent(event){
  event.preventDefault();
  //get value from the text box
  var mealName = $("#search-input").val().trim();
  console.log(mealName);
  if(mealName != ""){
    getMealdbByName(mealName);
    //user-instruction "how to use" will hide from the page when clicked on search button
    $('.user-instruction').hide();
  }  
}

 //display  data to the users
function displayMealData(data){
  $('#recipe-deck').empty();
  for(i = 0; i < data.meals.length; i++){
    //create dynamic elements with tailwind css style
    if (data.meals[i].strInstructions.length>1000){
      continue
    }
    var displayCard = $('<div class=" recipe-deck-content lg:flex mb-2 ml-5 mr-5">');
    
    // display images,title,ingredients,recipe instruction
    addImage(data, i, displayCard);
    addRecipe(data, i, displayCard);
    addRecipeInstruction(data, i, displayCard);
    
    //add display card to recipe div
    $('#recipe-deck').append(displayCard);

    //save each recipe (key = name, value = data object) to local storage
    var savedRecipe = data.meals[i].strMeal;
    var savedObject = JSON.stringify(data.meals[i]);
    localStorage.setItem(savedRecipe, savedObject)
  }
}

function addImage(data, index, displayCard){
    // image displays with tailwind css style
    var imgDiv = $('<div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden lg:w-1/4">');
   
    imgDiv.attr('style', 'background-image: url(' + data.meals[index].strMealThumb + ')');
    displayCard.append(imgDiv);
}

function addRecipe(data, i, displayCard){
  // recipe display div with tailwind css style
  //  to display title, ingredients, category and area of the meal
   
  var recipeDiv = $('<div class="info border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 lg:w-1/4 flex flex-col justify-top leading-normal">');
  
  var mealP = $('<p>');
  var categoryP = $('<p>');

  var ingredientP = $('<p>');
  ingredientP.text('Ingredients:');
  ingredientP.addClass('text-gray-700 text-base font-bold');
  var ingredientUL = $('<ul>');
  ingredientUL.addClass('ingredient-list text-gray-700 text-base list-disc ml-5');

  //recipe name and category
  mealP.text((data.meals[i].strMeal));
  mealP.addClass("text-gray-900 font-bold text-xl mb-2");
  //recipe category like vegetarian or non vegetarian , recipe area origin from
  categoryP.text((data.meals[i].strCategory) + ', ' + (data.meals[i].strArea));
  categoryP.addClass("text-gray-700 text-base");    

  //loop for ingredients x = ingredients and measurement string
  for(x=1; x<21; x++){
 
    var ingredientElement = 'strIngredient' + x;
    var ingredient = data.meals[i][ingredientElement];

    // loop for measurements
    var measureElement = 'strMeasure' + x;
    var measure = data.meals[i][measureElement];
    
    if(ingredient != "" && ingredient != null){
      ingredientUL.append('<li>' + ingredient.toLowerCase() + ' ' + measure.toLowerCase() + '</li>');
    }
  }
  recipeDiv.append(mealP);
  recipeDiv.append(categoryP);
  recipeDiv.append(ingredientP);
  recipeDiv.append(ingredientUL);
  displayCard.append(recipeDiv);
}


function addRecipeInstruction(data, i, displayCard){
  // instruction for recipe display div with tailwind css style
  var instructionDiv = $('<div class="instructions border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 lg:w-1/2 flex flex-col text-justify">');
  var instructionsPValue = $('<p>');
  var instructionsPLable = $('<p>');
  //instruction text in bold text 
  instructionsPLable.text('Instructions: ');
  instructionsPLable.addClass('instructions-title text-gray-700 text-base font-bold');
  //in grey text full instruction
  instructionsPValue.text(data.meals[i].strInstructions);
  instructionsPValue.addClass('content text-gray-700 text-base');
  instructionDiv.append(instructionsPLable); 
  instructionDiv.append(instructionsPValue); 
  displayCard.append(instructionDiv);
  generateLanguageOptions();
}

// ONLY NEED TO MAKE ONE CALL? SAVE VALUES AND APPEND TO EACH CARD
//Function to generate language options
function generateLanguageOptions(){
	const settings = {
    async: true,
    crossDomain: true,
    url: 'https://lecto-translation.p.rapidapi.com/v1/translate/languages',
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '239430b066msh022846479d4d091p1b3b0bjsn687400fa5797',
      'X-RapidAPI-Host': 'lecto-translation.p.rapidapi.com'
    }
  };
  
  $.ajax(settings).done(function (response) {
	  var languageArray = response.languages;
    var dropDown = $(`<select name="languages" id="language-select" class="w-100 border border-gray-300">`);
    var defaultDropDown = $(`<option value="" disabled selected>Select a language</option>`);
    var translateIngredientButton = $(`<button type="submit" id="translate-ingredient-btn">Translate Ingredients</button>`);
    var translateMethodButton = $(`<button type="submit" id="translate-method-btn">Translate Instructions</button>`);
	  for (var i = 0; i < languageArray.length; i++){
      var languageName = languageArray[i].display_name;
      var languageCode = languageArray[i].language_code;
      var languageOption = $(`<option value="${languageCode}">${languageName}</option>`);
      dropDown.append(languageOption);
    }
    dropDown.append(defaultDropDown);
    $(".recipe-deck-content").append(dropDown, translateIngredientButton, translateMethodButton);
  })
};

function translate(languageCode, oldText, targetEl){
  const params = new URLSearchParams();
  params.append("to", languageCode);
  params.append("from", "en");
  params.append(
    "texts",
    oldText
  );

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-rapidapi-host": "lecto-translation.p.rapidapi.com",
      "x-rapidapi-key": "239430b066msh022846479d4d091p1b3b0bjsn687400fa5797",
    },
    body: params,
  };

  var newText;

  fetch("https://lecto-translation.p.rapidapi.com/v1/translate/text", options)
    .then((response) => response.json())
    .then((json) => {
      newText = json.translations[0].translated[0];
      targetEl.text(newText);
      // console.log(targetEl.text());
    })
    .then((json) => console.log(JSON.stringify(json)))
    .catch(function (error) {
      console.error(error);
  })
};

// Listener event for ingredient translate click
$(document).ready(function(){
  $("#recipe-deck").on("click", "#translate-ingredient-btn", function(){
    var thisButton = $(this);
    var getLanguageCode = thisButton.siblings("#language-select");
    var languageCode = getLanguageCode.children("option:selected").val();
    // console.log(languageCode);
    var oldText = thisButton.siblings(".info").children(".ingredient-list").text();
    var listObject = thisButton.siblings(".info").children(".ingredient-list").text();
    var target = thisButton.siblings(".info").children(".ingredient-list");
    translate(languageCode, oldText, target);
    
  })
});

// Listener event for method translate click
$(document).ready(function(){
  $("#recipe-deck").on("click", "#translate-method-btn", function(){
    var thisButton = $(this);
    var getLanguageCode = thisButton.siblings("#language-select");
    var languageCode = getLanguageCode.children("option:selected").val();
    // console.log(languageCode);
    var oldText = thisButton.siblings(".instructions").children(".content").text();
    var target = thisButton.siblings(".instructions").children(".content");
    translate(languageCode, oldText, target);
  })
});
