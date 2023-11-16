//mealdb API key
const apikey = "1";
// declared var for autogenerate meal name
var availableTags = [];

// FLOW-1: Page load, initialization, configuration etc.
// FLOW-2: Search button click
// FLOW-3: fetch supported Languages
// FLOW-4: trnslation
// FLOW-5: Auto Complete

// Function gets called in FLOW-2:
function getMealdbByName(mealName) {

 // FLOW-2-4: fetch mealdb api url
  const requestMealdbUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + mealName;

  fetch(requestMealdbUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //FLOW-2-5: received meal db data, now call display fuction
      displayMealData(data);

      localStorage.setItem("mealDb",JSON.stringify(data));
      
    });
}

//flow-1 page load - funtion for autogenrate, mealname stores in local storage 
$(function() {
  //Flow-1-1 get the data from local storage
  availableTags = JSON.parse(localStorage.getItem("recipe"));
   //Flow-1-2 check if the data exist
  if(availableTags == null){
    availableTags = [];
  }
  // //Flow-1-3 - this stored mealname will autogenerate when  the search button
  $('#search-input').autocomplete({
    source: availableTags
  });
  } 
);


//FLOW-2: add event listener for search button
$('#searchButton').on('click',searchMealEvent);
function searchMealEvent(event){
  event.preventDefault();
  //FLOW-2-1:get value from the text box
  var mealName = $("#search-input").val().trim();
  console.log(mealName);

  // FLOW-2-2: check that text box has value
  if(mealName != ""){
    // FLOW-2-3: get meal db data
    getMealdbByName(mealName);

    // FLOW-2-4 set defult language to english
    $('#languages-lecto').val('en');

    // FLOW-2-5 for (autocomplete) that stores meal name in localstorage 
    if(availableTags.indexOf(mealName) == -1){
      // FLOW-2-6 mealname does not exist in local storage, add it to array
      availableTags.push(mealName);
      // FLOW-2-7 store the latest array to local storage
      localStorage.setItem('recipe', JSON.stringify(availableTags));
    }
    
    //// FLOW-2-8 user-instruction "how to use" will hide from the page when clicked on search button
    $('.user-instruction').hide();

    $('#languages-lecto').removeClass('invisible');
    }  
}

 // FLOW-2-5  data comes in loops 
function displayMealData(data){
  $('#recipe-deck').empty();
  // FLOW-2-5-1 loop through all the meals
  for(i = 0; i < data.meals.length; i++){
   
    // to omit any recipe above 1000 character due to api limit
    //if (data.meals[i].strInstructions.length>1000){
    //  continue
    // }

    //FLOW-2-5-2 create display card dynamic html with tailwind css style
    var displayCard = $('<div class=" recipe-deck-content lg:flex mb-2 ml-5 mr-5">');
    
    //FLOW-2-5-3 display recipe image
    addImage(data, i, displayCard);
    //FLOW-2-5-4 display title, ingredients, measurement
    addRecipe(data, i, displayCard);
    //FLOW-2-5-5 display recipe instruction
    addRecipeInstruction(data, i, displayCard);
    
    // FLOW-2-5-6 add display card to recipe deck div
    $('#recipe-deck').append(displayCard);

    // FLOW-2-5-7 save each recipe (key = name, value = data object) to local storage, if needed for future use
    var savedRecipe = data.meals[i].strMeal;
    var savedObject = JSON.stringify(data.meals[i]);
    localStorage.setItem(savedRecipe, savedObject)
  }
}
//FLOW-2-5-3 to display recipe image
function addImage(data, index, displayCard){
    // FLOW-2-5-3-1 image displays with tailwind css style
    var imgDiv = $('<div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden lg:w-1/4">');
   // FLOW-2-5-3-2 set url for recipe image
    imgDiv.attr('style', 'background-image: url(' + data.meals[index].strMealThumb + ')');
    // FLOW-2-5-3-2 add image div to display card
    displayCard.append(imgDiv);
}

  //FLOW-2-5-4 display title, ingredients, measurement for the given recipe
function addRecipe(data, i, displayCard){

  // FLOW-2-5-4-1 create div, paragraphs and list html elements with tailwind css style
  var recipeDiv = $(`<div id="recipe-${i}"  class="info border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 lg:w-1/4 flex flex-col justify-top leading-normal">`);
  
  var mealP = $('<p>');
  var categoryP = $('<p>');

  var ingredientP = $('<p>');
  ingredientP.text('Ingredients:');
  ingredientP.addClass('text-gray-700 text-base font-bold');
  var ingredientUL = $('<ul>');
  ingredientUL.addClass('ingredient-list text-gray-700 text-base list-disc ml-5');

  // FLOW-2-5-4-2 display recipe title
  mealP.text((data.meals[i].strMeal));
  mealP.addClass("text-gray-900 font-bold text-xl mb-2");

  //FLOW-2-5-4-3 recipe category like vegetarian or non vegetarian , recipe area origin from
  categoryP.text((data.meals[i].strCategory) + ', ' + (data.meals[i].strArea));
  categoryP.addClass("text-gray-700 text-base");    

  // FLOW-2-5-4-4 loop for ingredients x = ingredients and measurement string
  for(x = 1; x < 21; x++){
    var ingredientElement = 'strIngredient' + x;
    var ingredient = data.meals[i][ingredientElement];

    // fetch measurement from mealdb and add to displaycard
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

// FLOW-2-5-5 function for instruction
function addRecipeInstruction(data, i, displayCard){
  // FLOW-2-5-5-1 create div, paragraphs html elements with tailwind css style
  var instructionDiv = $(`<div id="instruction-${i}"  class="instructions border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 lg:w-1/2 flex flex-col text-justify">`);
  var instructionsPValue = $(`<p>`);
  var instructionsPLable = $('<p>');
  // FLOW-2-5-5-2 instruction text in bold text 
  instructionsPLable.text('Instructions: ');
  instructionsPLable.addClass('instructions-title text-gray-700 text-base font-bold');
  // FLOW-2-5-5-3 in grey text full instruction
  instructionsPValue.text(data.meals[i].strInstructions);
  instructionsPValue.addClass('content text-gray-700 text-base');
  instructionDiv.append(instructionsPLable); 
  instructionDiv.append(instructionsPValue); 
  displayCard.append(instructionDiv);
  //generateLanguageOptions(); // for future use
}

//Function to generate language options
//API fetch request to get object with language codes supported by lectoAPI
// function generateLanguageOptions(){
// 	const settings = {
//     async: true,
//     crossDomain: true,
//     url: 'https://lecto-translation.p.rapidapi.com/v1/translate/languages',
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'bc97a45c89msh3eda3b2b978fb1fp1f44c1jsn30893d3a6b96',
//       'X-RapidAPI-Host': 'lecto-translation.p.rapidapi.com'
//     }
//   };
  
//   //Use returned data to create user inputs(drop down menu, translate buttons)
//   $.ajax(settings).done(function (response) {
// 	  var languageArray = response.languages;
//     var userInputDiv = $(`<div class="user-input gap-4">`);
//     var dropDown = $(`<select name="languages" id="language-select" class="inline mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md">`);
//     var defaultDropDown = $(`<option value="" disabled selected>Select a language</option>`);
//     dropDown.append(defaultDropDown);
//     var translateIngredientButton = $(`<button type="submit" id="translate-ingredient-btn" class="mx-1 text-black bg-yellow-500 hover:bg-yellow-600  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Translate Ingredients</button>`);
//     var translateMethodButton = $(`<button type="submit" id="translate-method-btn" class="mx-1 text-black bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Translate Instructions</button>`);
// 	  //for loop iterates data object to create each language option with code to be used in translation function
//     for (var i = 0; i < languageArray.length; i++){
//       var languageName = languageArray[i].display_name;
//       var languageCode = languageArray[i].language_code;
//       var languageOption = $(`<option value="${languageCode}">${languageName}</option>`);
//       dropDown.append(languageOption);
//     }
//     userInputDiv.append(dropDown, translateIngredientButton, translateMethodButton);
//     $(".recipe-deck-content").append(userInputDiv);
//   })
// };

//function to translate text - parameters gained from listener events for translate buttons
//API requires parameters of language code and text to translate
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
      "x-rapidapi-key": "bc97a45c89msh3eda3b2b978fb1fp1f44c1jsn30893d3a6b96",
    },
    body: params,
  };

  var newText;

  fetch("https://lecto-translation.p.rapidapi.com/v1/translate/text", options)
    .then((response) => response.json())
    .then((json) => {
      newText = json.translations[0].translated[0];
      //returned translated text and replaces existing text
      targetEl.html(newText);
    })
    .then((json) => console.log(JSON.stringify(json)))
    .catch(function (error) {
      console.error(error);
  })
};

// Listener event to run translate() for ingredients. "This" targets elements related to button clicked
$(document).ready(function(){
  $("#recipe-deck").on("click", "#translate-ingredient-btn", function(){
    var thisButton = $(this);
    var getLanguageCode = thisButton.siblings("#language-select");
    var languageCode = getLanguageCode.children("option:selected").val();
    var oldText = thisButton.parent(".user-input").siblings(".info").children(".ingredient-list").text();
    var target = thisButton.parent(".user-input").siblings(".info").children(".ingredient-list");
    translate(languageCode, oldText, target);
  })
});

// Listener event to run translate() for instructions. "This" targets elements related to button clicked
$(document).ready(function(){
  $("#recipe-deck").on("click", "#translate-method-btn", function(){
    var thisButton = $(this);
    var getLanguageCode = thisButton.siblings("#language-select");
    var languageCode = getLanguageCode.children("option:selected").val();
    var oldText = thisButton.parent(".user-input").siblings(".instructions").children(".content").text();
    var target = thisButton.parent(".user-input").siblings(".instructions").children(".content");
    translate(languageCode, oldText, target);
  })
});

// FLOW-3: fetch supported Languages
generateLanguageOptionsLecto();