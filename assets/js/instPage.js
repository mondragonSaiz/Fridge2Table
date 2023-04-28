// import { secu } from "./script.js";
// console.log("INSTRUCTIONS PAGE");
// console.log(secu);
var recipeId = localStorage.getItem("recipeId");
var apiKEY = "1a0fb33a6fc54f18b3bcb4f7cf0eff6c";
var mainContainer = document.querySelector(".page-wrapper");

var requestRecipeImg = function () {
  var recipeRequestUrl =
    "https://api.spoonacular.com/recipes/" +
    recipeId +
    "/information?includeNutrition=false&apiKey=" +
    apiKEY;
  fetch(recipeRequestUrl)
    .then((Response) => Response.json())
    .then((data) => fowardRecipeDetails(data));
};

// var recipeTitle = "";
// var recipeIMG = "";
var fowardRecipeDetails = function (data) {
  console.log("RAW", data);
  console.log("RAW TITLE", data.title);
  var titulo = data.title;
  var recipeIMG = data.image;
  requestInstructionsData(titulo, recipeIMG);
};
var requestInstructionsData = function (titulo, recipeIMG) {
  console.log("inside request function");
  var requestURL =
    "https://api.spoonacular.com/recipes/" +
    recipeId +
    "/analyzedInstructions?apiKey=" +
    apiKEY;

  fetch(requestURL)
    .then((Response) => Response.json())
    .then((data) => renderInstructions(data, titulo, recipeIMG));
};

var renderInstructions = function (data, titulo, recipeIMG) {
  console.log("RAW DATA:", data);

  var cardContainer = document.createElement("div");
  cardContainer.classList.add(
    "card",
    "text-bg-dark",
    "p-3",
    "border-light-subtle",
    "recipe-card"
  );
  cardContainer.style.maxWidth = "740px";

  var cardImage = document.createElement("img");
  cardImage.classList.add("card-image");
  cardImage.setAttribute("src", recipeIMG);
  cardImage.setAttribute("alt", "Recipe Image");

  var cardInstructionsText = document.createElement("p");
  cardInstructionsText.classList.add("card-title");
  //console.log("titulo", recipeTitle);
  cardInstructionsText.textContent = titulo + " Instructions";

  var cardDescriptionText = document.createElement("p");
  cardDescriptionText.classList.add("card-text", "card-desc");

  var steps = data[0].steps;
  for (var j = 0; j < steps.length; j++) {
    console.log("Instruction " + steps[j].number + " : " + steps[j].step);
    var stepEL = document.createElement("p");
    stepEL.classList.add("card-text");
    stepEL.textContent = "Step " + steps[j].number + " : " + steps[j].step;
    cardDescriptionText.append(stepEL);
  }

  cardContainer.append(cardImage);
  cardContainer.append(cardInstructionsText);
  cardContainer.append(cardDescriptionText);
  mainContainer.append(cardContainer);
};
requestRecipeImg();
//requestInstructionsData();
