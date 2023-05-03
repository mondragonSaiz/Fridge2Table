var ingredientsInput = document.querySelector("#inputIngredients");
var numberInput = document.getElementById("number-recipes");
var errorNotification = document.querySelector(".notification");
var formEL = document.querySelector("form");
var ingredientsLabelHelp = document.querySelector("#ingredeientsHelp");
//var formIngredientsLable = document.querySelector(".form-ing");
//var cusineInput = document.querySelector("#cuisineSelect");
//var mealInput = document.querySelector("#mealTypeSelect");
//var receiptsInput = document.querySelector("#numberReceiptsSelect");
//var submitBoton = document.querySelector("#submit-btn");

var secu = 25;
var mainRcontiner = document.querySelector("#main-recipe-container");
const apiKEY = "dda6aa93032448f584c1421d3ebf826c";
const unplashKEY = "SnWkM7KRwky1k7cOxKhqwpOlrLFM-AXHuJjz4gQbSa4";

// numberInput.addEventListener("change", function () {
//   console.log("You selected: ", this.value);
//   if (this.value === "3") {
//     console.log("Eureka!!!");
//   } else {
//     console.log("what");
//   }
// });
// ingredientsInput.addEventListener("change", (event) => {
//   console.log("*", event.target.value);
// });

// var changeEvent = function (event) {
//   console.log("***CAMBIO***");
//   console.log("***", event.target.value);
// };

var submitInfo = function (event) {
  event.preventDefault();

  var ingredients = ingredientsInput.value.trim();
  console.log("Inside submit");
  console.log(ingredients);
  if (ingredients === "") {
    console.log("Invalid input");

    ingredientsLabelHelp.classList.add("text-danger");
    // var errorN = document.createElement("div");
    // errorN.classList.add("notification", "is-danger");
    // var errorBTN = document.createElement("button");
    // errorBTN.classList.add("delete");
    // errorN.append(errorBTN);
    // errorN.append("Please enter a valid input");
    // formIngredientsLable.append(errorN);

    errorNotification.classList.add("notification-visible");
    return;
  }
  var numberofrecipes = numberInput.value;
  if (numberofrecipes === "----" || numberofrecipes === null) {
    numberofrecipes = 10;
  }
  console.log("numero", numberofrecipes);
  //console.log(ingredients);
  requestRecipe(ingredients, numberofrecipes);
};

var requestRecipe = function (ingredientsArray, number) {
  console.log("Inside Request Recipe");
  console.log("INGGG", ingredientsArray);
  console.log("NUMNUM", number);

  var requestURL =
    "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" +
    apiKEY +
    "&ingredients=" +
    ingredientsArray +
    "&number=" +
    number;

  console.log("URL", requestURL);

  fetch(requestURL)
    .then((Response) => Response.json())
    .then((data) => renderRecipes(data, ingredientsArray));
};

var renderRecipes = function (data, ingredients) {
  var recipeTrendContainer = document.querySelector(".randomRecipe");
  recipeTrendContainer.remove();

  console.log("DDDTA", data);
  console.log("In", ingredients);

  if (recipeTrendContainer === null) {
    return;
  }

  var titleDesc = document.querySelector(".trending");
  titleDesc.innerHTML = "Displaying recipes with : " + ingredients;
  console.log("RECIPE TITLE", data[0].title);
  var recipeIdArray = [];
  for (var i = 0; i < data.length; i++) {
    var recipeName = data[i].title;
    var recipeId = data[i].id;
    // recipeIdArray += recipeId;
    console.log("RECIPE NAME", recipeName);
    console.log("RECIPE ID Array", recipeIdArray);
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
    img.setAttribute("alt", recipeName);
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
    recipeDetails.setAttribute("data-set", recipeId);
    recipeDetails.addEventListener("click", function (event) {
      var parentEL = event.target.parentElement;
      console.log("DATA SET", parentEL);
      var parentDataSet = parentEL.getAttribute("data-set");
      console.log("IDD", parentDataSet);
      localStorage.setItem("recipeId", parentDataSet);
    });
    recipeDetails.setAttribute("target", "_blank");
    recipeDetails.setAttribute("href", "instructions.html");
    recipeDetails.classList.add("card-text", "details-link");
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
    //var recipeLink = document.querySelector(".details-link");
    //recipeLink.addEventListener("click", setRecipe);
  }

  // var setRecipe = function (event) {
  //   console.log("HAHHS");
  //   console.log("TARGET", event.target);
  // };
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
    //assignRecipeTitleID(recipeID);
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
    img.setAttribute("alt", recipeName);
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
    recipeDetails.setAttribute("data-set", recipeID);
    recipeDetails.addEventListener("click", function (event) {
      var parentEL = event.target.parentElement;
      console.log("DATA SET", parentEL);
      var parentDataSet = parentEL.getAttribute("data-set");
      console.log("IDD", parentDataSet);
      localStorage.setItem("recipeId", parentDataSet);
      localStorage.setItem("recipeName", recipeName);
    });
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

formEL.addEventListener("submit", submitInfo);

// var assignRecipeTitleID = function (id) {
//   var recipeNameID;
//   return (recipeNameID = id);
// };
document.addEventListener("DOMContentLoaded", () => {
  (document.querySelectorAll(".notification .delete") || []).forEach(
    ($delete) => {
      const $notification = $delete.parentNode;

      $delete.addEventListener("click", () => {
        $notification.parentNode.removeChild($notification);
        ingredientsLabelHelp.classList.add("text-dark");
      });
    }
  );
});

// var requestImage = function () {
//   let randomURL =
//     "https://source.unsplash.com/random/1920x1080/?wallpaper,landscape";
//   fetch(
//     "https://source.unsplash.com/random/1920x1080/?wallpaper,landscape"
//   ).then((data) => {
//     console.log(data.url);
//   });
// };

// requestImage();
