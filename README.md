# Recipe-Translator

## Table of Contents:

- User Story
- Description
- Source
- Screenshot
- Deployed link

## User Story

AS A user  
I WANT to search for a recipe by ingredient, and view in different languages  
SO THAT I can view and the recipe, and share with anyone  

## Description

No more waiting to get the right choice of recipe and spending lots of time searching on internet to how to make it.
It's here now. Recipe translator is home to more than 300 recipes that you can search by key-words or ingredients! 
Each recipe comes with measurements and step-by-step instructions in how to prepare, then it's up to you to make something delicious.

We were inspired by the spirit of bringing together, via the simple act of cooking. Sharing a meal, a recipe, culinary inspiration all serve to foster community. This app brings the ability to discover new dishes, enjoy and share them across the globe.

We have constructed a simple, clean user-interface, with initial instructions that are hidden once they begin searching and search button stay on  fixed position! HTML elements are dynamically generated from JavaScript, while three Application Programming Interface make up the core of the site. "TheMealDB" provides a multitude of data for each recipe, from which individual "recipe cards" are created to display information and there is  "autogenerate" meal name as well that's saves users time, those name saved in local storage. The translation is handled by "Lecto Translation"; the POST request needs several criteria to function, the most important of which is the text we wish to translate and the language code of the language we wish to convert to (these codes were provided by a separate API FETCH request from "Lecto Translation").However, since the translation API can only handle 1000 characters, the contents of the "recipe cards" is split into two different functions, and any recipes with instructions longer than the character limit are not displayed to the user. Listener events trigger the translate functions, targeting the specific recipe that is interacted with.

TailwindCSS was used to add styling on the site, making a simple but aesthetically pleasing User Interface. 

We hope to improve and add more features in the future, such as:
- Improved styling of returned text, notably the ingredient list
- Translations not being limited by 1000 character and user can search recipe without any restriction
- Addition of sharing to socials function, to spread the joy of cooking!

## Sources:

- https://www.themealdb.com/api.php
- https://rapidapi.com/lecto-lecto-default/api/lecto-translation/
- https://github.com/lecto-ai/docs
- https://tailwindcss.com/
- https://jquery.com/
- https://jqueryui.com/

## Screenshot:

![User inputs key-words into search bar, results matching that are displayed. Recipe ingredients and instructions are translated into different languages. The search bar aut-completes previously searched words](./assets/images/Screen-recording-demo.gif)

## Deployed link:

- https://blealan.github.io/recipe-translator/