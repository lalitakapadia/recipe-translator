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
    var displayCard = $('<div class="max-w-sm w-full lg:max-w-full lg:flex mb-2 ml-5 ">');
    
    // image display with tailwind css 
    var imgDiv = $('<div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">');
   
    imgDiv.attr('style', 'background-image: url(' + data.meals[i].strMealThumb + ')');
    displayCard.append(imgDiv);

    // recipe display div with tailwind css style
    // declare variables with html and tailwind css
    var recipeDiv = $('<div class="recipeDiv border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">');
    
    var mealP = $('<p>');
    var categoryP = $('<p>');
    var instructionsPValue = $('<p>');
    var instructionsPLable = $('<p>');
    var tagsH4 = $('<h4>');
   
    //recipe name
    mealP.text((data.meals[i].strMeal));
    mealP.addClass("text-gray-900 font-bold text-xl mb-2");
    //recipe category like vegetarian or non vegetarian , recipe area origion from
    categoryP.text((data.meals[i].strCategory) + ', ' + (data.meals[i].strArea));
    categoryP.addClass("text-gray-700 text-base");
   //instuction for recipe and bold text 
    instructionsPLable.text('Instuctions: ');
    instructionsPLable.addClass('text-gray-700 text-base font-bold');
    //in grey text full instuction
    instructionsPValue.text(data.meals[i].strInstructions);
    instructionsPValue.addClass('text-gray-700 text-base');
    //
    tagsH4.text('Tags: ' + (data.meals[i].strTags));
    tagsH4.addClass('text-gray-700 text-base');



    recipeDiv.append(mealP);
    recipeDiv.append(categoryP);
    recipeDiv.append(instructionsPLable); 
    recipeDiv.append(instructionsPValue); 
    recipeDiv.append(tagsH4);

    displayCard.append(recipeDiv);

    $('#recipe-deck').append(displayCard);

    //save each recipe (key = name, value = data object) to local storage
    var savedRecipe = data.meals[i].strMeal;
    var savedObject = JSON.stringify(data.meals[i]);
    localStorage.setItem(savedRecipe, savedObject)
  }
}

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