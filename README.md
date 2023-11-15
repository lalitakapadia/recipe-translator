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
It's here now. Recipe translator is home of more than 300 recipes that you can search by key-words or ingredients! 
Each recipe comes with measurements and step-by-step instructions in how to prepare, then it's up to you to make something delicious.

We were inspired by... 

We have constructed a simple, clean user-interface, with initial instructions that are hidden once they begin searching and search button stay on  fixed position! HTML elements are dynamically generated from JavaScript, while three Application Programming Interface make up the core of the site. "TheMealDB" provides a multitude of data for each recipe, from which individual "recipe cards" are created to display information and there is  "autogenerate" meal name as well that's saves users time, those name saved in local storage. The translation is handled by "Lecto Translation"; the POST request needs several criteria to function, the most important of which is the text we wish to translate and the language code of the language we wish to convert to (these codes were provided by a separate API FETCH request from "Lecto Translation").However, since the translation API can only handle 1000 characters, the contents of the "recipe cards" is split into two different functions, and any recipes with instructions longer than the character limit are not displayed to the user. Listener events trigger the translate functions, targeting the specific recipe that is interacted with. 

We hope to improve and add more features in the future, such as:
- Improved styling of returned text, notably the ingredient list
- Translations not being limited by 1000 character and user can search recipe without any rescriction
- Addition of sharing to socials function, to spread the joy of cooking!

## Sources:

- https://www.themealdb.com/api.php
- https://rapidapi.com/lecto-lecto-default/api/lecto-translation/
- https://github.com/lecto-ai/docs

## Screenshot:


## Deployed link: