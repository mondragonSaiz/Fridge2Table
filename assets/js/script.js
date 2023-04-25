var ingredientsInput = document.querySelector("#inputIngredients");
var cusineInput = document.querySelector("#cuisineSelect");
var mealInput = document.querySelector("#mealTypeSelect");
var receiptsInput = document.querySelector("#numberReceiptsSelect");
var submitBoton = document.querySelector("#submit-btn");
var formEL = document.querySelector("form");

var mainRcontiner = document.querySelector("#main-recipe-container");
const apiKEY = "930f918afd26488d8f51336d71c5b45d";

var submitInfo = function (event) {
  event.preventDefault();
  console.log("HOLAA");
  var ingredients = ingredientsInput.value.trim();
  if (ingredients === "") {
    console.log("Invalid input");
    return;
  }
  console.log("Hola");
  console.log(ingredients);
  requestRecipe(ingredients);
};

var requestRecipe = function (ingredients) {
  var requestURL =
    "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" +
    apiKEY +
    "&ingredients=" +
    ingredients;

  fetch(requestURL)
    .then((Response) => Response.json())
    .then((data) => renderRecipes(data));
};

var renderRecipes = function (data) {
  console.log(data);
  console.log("RECIPE TITLE", data.title);
  for (var i = 0; i < data.length; i++) {
    var recipeName = data[i].title;
    console.log("RECIPE TITLE", recipeName);
    var missedING = data[i].missedIngredients;
    console.log("MISSED INGREDIENTS :", missedING);

    var recipeContainer = document.createElement("div");
    recipeContainer.classList.add(
      "card",
      "text-bg-dark",
      "p-3",
      "border-light-subtle",
      "mb-3",
      "recipe-home"
    );
    recipeContainer.style.maxWidth = "740px";

    var rowDiv = document.createElement("div");
    rowDiv.classList.add("row", "g-0");

    var imgDiv = document.createElement("div");
    imgDiv.classList.add("col-md-4");
    var img = document.createElement("img");
    img.setAttribute("src", "assets/images/applestrudel.jpeg");
    img.classList.add("img-fluid", "rounded-start");
    imgDiv.append(img);

    var bodyContainer = document.createElement("div");
    bodyContainer.classList.add("col-md-8");

    var bodyDIV = document.createElement("div");
    bodyDIV.classList.add("card-body");

    var recipeTitle = document.createElement("h5");
    recipeTitle.classList.add("card-title");
    recipeTitle.textContent = recipeName;

    var recipeDetails = document.createElement("a");
    recipeDetails.classList.add("card-text");
    recipeDetails.style.textDecoration = "none";
    recipeDetails.style.color = "white";

    var detailsText = document.createElement("small");
    detailsText.textContent = "See instruction details";
    recipeDetails.append(detailsText);

    var missedIngredientsText = document.createElement("p");
    missedIngredientsText.classList.add("card-text");
    missedIngredientsText.textContent = "Missed Ingredients : ";

    for (var j = 0; j < missedING.length; j++) {
      console.log("INDIVIDUAL MI", missedING[j].name);
      missedIngredientsText.textContent += missedING[j].name + " ,";
      if (j === missedING.length - 1) {
        missedIngredientsText.textContent += ".";
      }
    }

    bodyDIV.append(recipeTitle);
    bodyDIV.append(missedIngredientsText);
    bodyDIV.append(recipeDetails);
    bodyContainer.append(bodyDIV);

    rowDiv.append(imgDiv);
    rowDiv.append(bodyContainer);
    recipeContainer.append(rowDiv);
    mainRcontiner.append(recipeContainer);
  }
};

formEL.addEventListener("submit", submitInfo);
