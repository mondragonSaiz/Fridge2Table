var ingredientsInput = document.querySelector("#inputIngredients");
var cusineInput = document.querySelector("#cuisineSelect");
var mealInput = document.querySelector("#mealTypeSelect");
var receiptsInput = document.querySelector("#numberReceiptsSelect");
var submitBoton = document.querySelector("#submit-btn");
var formEL = document.querySelector("form");
var secu = 25;
var mainRcontiner = document.querySelector("#main-recipe-container");
const apiKEY = "930f918afd26488d8f51336d71c5b45d";

var submitInfo = function (event) {
  event.preventDefault();
  var recipeCONT = document.querySelector("recipe-home");
  //recipeCONT.remove();
  console.log("HOLAA");
  var ingredients = ingredientsInput.value.trim();
  if (ingredients === "") {
    console.log("Invalid input");
    return;
  }

  //console.log(ingredients);
  requestRecipe(ingredients);
};

// function dividirIngredientes(ingredients) {
//   var ingredientsArray = ingredients.split(" ");
//   if (ingredientsArray.length === 1) {
//     ingredientsArray = ingredients;
//   } else {
//     for (var i = 0; i < ingredientsArray.length; i++) {
//       if (i == ingredientsArray.length - 1) {
//         ingredientsArray[i] += "";
//       } else {
//         ingredientsArray[i] + ",+";
//       }
//     }
//   }
//   console.log("ZZZ", ingredientsArray);
//   requestRecipe(ingredientsArray);
// }

var requestRecipe = function (ingredientsArray) {
  // var actualING = "";
  // //console.log("INGREDIENTSSS", ingredientsArray);
  // for (var i = 0; i < ingredientsArray.length; i++) {
  //   //console.log("INGREDIENTZZZ", ingredientsArray[i]);

  //   if (i !== ingredientsArray.length - 1) {
  //     actualING += ingredientsArray[i] + ",+";
  //   } else {
  //     actualING += ingredientsArray[i];
  //   }
  // }
  //console.log("ACTUAL ING", actualING);
  var requestURL =
    "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" +
    apiKEY +
    "&ingredients=" +
    ingredientsArray;

  fetch(requestURL)
    .then((Response) => Response.json())
    .then((data) => renderRecipes(data, ingredientsArray));
};

var requestRandomRecipe = function () {
  var randomRequestURL =
    "https://api.spoonacular.com/recipes/random?number=10&apiKey=" + apiKEY;
  fetch(randomRequestURL)
    .then((Response) => Response.json())
    .then((randomData) => renderOnLoad(randomData));
};

var renderOnLoad = function (randomData) {
  console.log("RRR", randomData);
  //console.log("Recipe title :", randomData.recipes[0].title);
  console.log("LOCAL STORAGE", localStorage.getItem("hiddenC"));

  var recipeContainer = document.createElement("div");
  recipeContainer.classList.add("randomRecipe");
  recipeContainer.style.maxWidth = "740px";

  for (var i = 0; i < randomData.recipes.length; i++) {
    var recipeName = randomData.recipes[i].title;
    var recipeID = randomData.recipes[i].id;
    var randomRecipeCard = document.createElement("div");
    randomRecipeCard.classList.add(
      "card",
      "text-bg-dark",
      "p-3",
      "border-light-subtle",
      "mb-3"
    );
    assignRecipeTitleID(recipeID);
    var randomRecipeImgageSrc = randomData.recipes[i].image;
    //console.log("RECIPE TITLE", recipeName);
    var ingredients = randomData.recipes[i].extendedIngredients;
    //console.log("MISSED INGREDIENTS :", ingredients);

    var rowDiv = document.createElement("div");
    rowDiv.classList.add("row", "g-0");

    var imgDiv = document.createElement("div");
    imgDiv.classList.add("col-md-4");
    var img = document.createElement("img");
    img.setAttribute("src", randomRecipeImgageSrc);
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
    recipeDetails.classList.add("card-text", "c-link");
    recipeDetails.style.textDecoration = "none";
    recipeDetails.style.color = "white";
    recipeDetails.setAttribute("href", "instructions.html");
    recipeDetails.setAttribute("target", "_blank");
    var detailsText = document.createElement("small");
    detailsText.textContent = "See instruction details";
    recipeDetails.append(detailsText);

    var ingredientsText = document.createElement("p");
    ingredientsText.classList.add("card-text");
    ingredientsText.textContent = "Ingredients : ";

    for (var j = 0; j < ingredients.length; j++) {
      //console.log("INDIVIDUAL MI", ingredients[j].name);
      ingredientsText.textContent += ingredients[j].name;
      if (j !== ingredients.length - 1) {
        ingredientsText.textContent += ", ";
      } else {
        ingredientsText.textContent += ".";
      }
    }

    bodyDIV.append(recipeTitle);
    bodyDIV.append(ingredientsText);
    bodyDIV.append(recipeDetails);
    bodyContainer.append(bodyDIV);

    rowDiv.append(imgDiv);
    rowDiv.append(bodyContainer);
    randomRecipeCard.append(rowDiv);
    recipeContainer.append(randomRecipeCard);
    mainRcontiner.append(recipeContainer);
  }
  console.log("RECIPE CONTAINER", recipeContainer);
};

requestRandomRecipe();

var renderRecipes = function (data, ingredients) {
  //localStorage.setItem("hiddenC", "hidden");
  //console.log("DDDTA", data);
  var recipeTrendContainer = document.querySelector(".randomRecipe");
  //console.log("CONTAINER 2", recipeTrendContainer);
  recipeTrendContainer.remove();
  console.log("Holi");
  var child = recipeTrendContainer.lastElementChild;
  console.log(child);
  while (child) {
    recipeTrendContainer.removeChild(child);
    child = recipeTrendContainer.lastElementChild;
  }
  var trendingTitle = document.querySelector(".trending");
  trendingTitle.innerHTML = "Displaying recipes with : " + ingredients;
  console.log("RECIPE TITLE", data[0].title);
  for (var i = 0; i < data.length; i++) {
    var recipeName = data[i].title;
    var recipeImgaeSrc = data[i].image;
    //console.log("RECIPE TITLE", recipeName);
    var missedING = data[i].missedIngredients;
    //console.log("MISSED INGREDIENTS :", missedING);

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
    img.setAttribute("src", recipeImgaeSrc);
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
      //console.log("INDIVIDUAL MI", missedING[j].name);
      missedIngredientsText.textContent += missedING[j].name;
      if (j !== missedING.length - 1) {
        missedIngredientsText.textContent += ", ";
      } else {
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

var assignRecipeTitleID = function (id) {
  var recipeNameID;
  return (recipeNameID = id);
};

export { secu };
