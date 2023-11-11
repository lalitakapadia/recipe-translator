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
    var recipeDiv = $('<div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 lg:w-1/4 flex flex-col justify-between leading-normal">');
    
    var mealP = $('<p>');
    var categoryP = $('<p>');
    var tagsH4 = $('<h4>');

    var ingredientP = $('<p>');
    ingredientP.text('Ingredients:');
    ingredientP.addClass('text-gray-700 text-base font-bold');
    var ingredientUL = $('<ul>');
    ingredientUL.addClass('text-gray-700 text-base list-disc ml-5');

    //recipe name
    mealP.text((data.meals[i].strMeal));
    mealP.addClass("text-gray-900 font-bold text-xl mb-2");
    //recipe category like vegetarian or non vegetarian , recipe area origion from
    categoryP.text((data.meals[i].strCategory) + ', ' + (data.meals[i].strArea));
    categoryP.addClass("text-gray-700 text-base");    
    tagsH4.text('Tags: ' + (data.meals[i].strTags));
    tagsH4.addClass('text-gray-700 text-base');

    //adding list of ingredient one bye one
    if(data.meals[i].strIngredient1 != "" && data.meals[i].strIngredient1 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient1 + '</li>');
    }
    if(data.meals[i].strIngredient2 != "" && data.meals[i].strIngredient2 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient2  + '</li>');
    }
    if(data.meals[i].strIngredient3 != "" && data.meals[i].strIngredient3 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient3  + '</li>');
    }
    if(data.meals[i].strIngredient4 != "" && data.meals[i].strIngredient4 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient4  + '</li>');
    }
    if(data.meals[i].strIngredient5 != "" && data.meals[i].strIngredient5 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient5  + '</li>');
    }
    if(data.meals[i].strIngredient6 != "" && data.meals[i].strIngredient6 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient6  + '</li>');
    }
    if(data.meals[i].strIngredient7 != "" && data.meals[i].strIngredient7 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient7  + '</li>');
    }
    if(data.meals[i].strIngredient8 != "" && data.meals[i].strIngredient8 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient8  + '</li>');
    }
    if(data.meals[i].strIngredient9 != "" && data.meals[i].strIngredient9 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient9  + '</li>');
    }
    if(data.meals[i].strIngredient10 != "" && data.meals[i].strIngredient10 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient10  + '</li>');
    }
    if(data.meals[i].strIngredient11 != "" && data.meals[i].strIngredient11 != null){
        ingredientUL.append('<li>' + data.meals[i].strIngredient11 + '</li>');
    }
    if(data.meals[i].strIngredient12 != "" && data.meals[i].strIngredient12 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient12  + '</li>');
    }
    if(data.meals[i].strIngredient13 != "" && data.meals[i].strIngredient13 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient13  + '</li>');
    }
    if(data.meals[i].strIngredient14 != "" && data.meals[i].strIngredient14 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient14  + '</li>');
    }
    if(data.meals[i].strIngredient15 != "" && data.meals[i].strIngredient15 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient15  + '</li>');
    }
    if(data.meals[i].strIngredient16!= "" && data.meals[i].strIngredient16 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient13 + '</li>');
    }
    if(data.meals[i].strIngredient17 != "" && data.meals[i].strIngredient17 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient17  + '</li>');
    }
    if(data.meals[i].strIngredient18 != "" && data.meals[i].strIngredient18 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient18  + '</li>');
    }
    if(data.meals[i].strIngredient19 != "" && data.meals[i].strIngredient19 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient19  + '</li>');
    }
    if(data.meals[i].strIngredient20 != "" && data.meals[i].strIngredient20 != null){
      ingredientUL.append('<li>' + data.meals[i].strIngredient20  + '</li>');
    }
    
    recipeDiv.append(mealP);
    recipeDiv.append(categoryP);
    recipeDiv.append(ingredientP);
    recipeDiv.append( ingredientUL);
    recipeDiv.append(tagsH4);
    displayCard.append(recipeDiv);

    // insruction for recipe display div with tailwind css style
    var instructionDiv = $('<div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 lg:w-1/2 flex flex-col leading-normal">');
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