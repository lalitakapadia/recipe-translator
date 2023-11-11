const apikey = "1";
function getMealdbByName(mealName) {
  //search mealdb api by ingredient
  const requesMealdbUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + mealName;

  fetch(requesMealdbUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //calling mealdata function
      displayMealData(data);
    });
}

generateLanguageOptions()

// add event listener for search button
$('#searchButton').on('click',searchMealEvent);
function searchMealEvent(event){
  event.preventDefault();
  //get value from he text box
  var mealName = $("#search-input").val().trim();
  console.log(mealName);
  if(mealName != ""){
    getMealdbByName(mealName);
  }  
}
 //display  data to the users
function displayMealData(data){
  $('#recipe-deck').empty();
  for(i = 0; i < data.meals.length; i++){
     //create dynamic elements with tailwind css style
    var displayCard = $('<div class=" lg:flex mb-2 ml-5 mr-5">');
    
    // image display with tailwind css 
    var imgDiv = $('<div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden lg:w-1/4">');
   
    imgDiv.attr('style', 'background-image: url(' + data.meals[i].strMealThumb + ')');
    displayCard.append(imgDiv);

     // recipe display div with tailwind css style
    //  to display title, ingredients, category and area of the meal
    var recipeDiv = $('<div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 lg:w-1/4 flex flex-col justify-top leading-normal">');
    
    var mealP = $('<p>');
    var categoryP = $('<p>');
    
    var ingredientP = $('<p>');
    ingredientP.text('Ingredients:');
    ingredientP.addClass('text-gray-700 text-base font-bold');
    var ingredientUL = $('<ul>');
    ingredientUL.addClass('text-gray-700 text-base list-disc ml-5');

    //recipe name and category
    mealP.text((data.meals[i].strMeal));
    mealP.addClass("text-gray-900 font-bold text-xl mb-2");
    //recipe category like vegetarian or non vegetarian , recipe area origion from
    categoryP.text((data.meals[i].strCategory) + ', ' + (data.meals[i].strArea));
    categoryP.addClass("text-gray-700 text-base");    
  
    //loop for ingrdients x = ingredients and mesurement string
    for(x=1; x<21; x++){
      var ingredientElement = 'strIngredient' + x;
      var ingredient = data.meals[i][ingredientElement];

      // loop for measurements
      var measureElement = 'strMeasure' + x;
      var measure = data.meals[i][measureElement];
     
     if(ingredient != "" && ingredient != null){
       ingredientUL.append('<li>' + ingredient + ' ' + measure + '</li>');
     }
    }
    
    recipeDiv.append(mealP);
    recipeDiv.append(categoryP);
    recipeDiv.append(ingredientP);
    recipeDiv.append( ingredientUL);
    displayCard.append(recipeDiv);

    // insruction for recipe display div with tailwind css style
    var instructionDiv = $('<div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 lg:w-1/2 flex flex-col text-justify">');
    var instructionsPValue = $('<p>');
    var instructionsPLable = $('<p>');
    //instruction for recipe and bold text 
    instructionsPLable.text('Instuctions: ');
    instructionsPLable.addClass('text-gray-700 text-base font-bold');
    //in grey text full instruction
    instructionsPValue.text(data.meals[i].strInstructions);
    instructionsPValue.addClass('text-gray-700 text-base');
    instructionDiv.append(instructionsPLable); 
    instructionDiv.append(instructionsPValue); 
    displayCard.append(instructionDiv);

    $('#recipe-deck').append(displayCard);



    //save each recipe (key = name, value = data object) to local storage
    var savedRecipe = data.meals[i].strMeal;
    var savedObject = JSON.stringify(data.meals[i]);
    localStorage.setItem(savedRecipe, savedObject)
  }
}

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
    console.log(response);
	  var languageArray = response.languages;
	  var optionDropDown = $("#format-input");
	  for (var i = 0; i < languageArray.length; i++){
      var languageName = languageArray[i].display_name;
      var languageCode = languageArray[i].language_code;
      var languageOption = $(`<option value="${languageCode}">${languageName}</option>`);
      optionDropDown.append(languageOption);
	  }
  })
};

// var foodTest = JSON.parse(localStorage.getItem("Egg Drop Soup"));
// console.log(foodTest);
// var translateFood = JSON.stringify(foodTest);
// console.log(translateFood);

// const params = new URLSearchParams();
// params.append("to", "de");
// params.append("from", "en");
// params.append(
//   "texts",
//   `"Just try it mate. "
//   "What are you waiting for?
// `
// );
// params.append(
//   "texts",
//   `“Never memorize something that you can look up.”
// ― Albert Einstein
// `
// );

// const options = {
//   method: "POST",
//   headers: {
//     "content-type": "application/x-www-form-urlencoded",
//     "x-rapidapi-host": "lecto-translation.p.rapidapi.com",
//     "x-rapidapi-key": "239430b066msh022846479d4d091p1b3b0bjsn687400fa5797",
//   },
//   body: params,
// };

// fetch("https://lecto-translation.p.rapidapi.com/v1/translate/text", options)
//   .then((response) => response.json())
//   .then((json) => console.log(JSON.stringify(json)))
//   .catch(function (error) {
//     console.error(error);
//   });