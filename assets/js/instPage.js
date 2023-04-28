// import { secu } from "./script.js";
// console.log("INSTRUCTIONS PAGE");
// console.log(secu);
var apiKEY = "dda6aa93032448f584c1421d3ebf826c";
var mainContainer = document.querySelector(".page-wrapper");
var requestInstructionsData = function () {
  console.log("inside request function");
  var requestURL =
    "https://api.spoonacular.com/recipes/636301/analyzedInstructions?apiKey=" +
    apiKEY;

  fetch(requestURL)
    .then((Response) => Response.json())
    .then((data) => renderInstructions(data));
};

var renderInstructions = function (data) {
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
  cardImage.setAttribute("src", "assets/images/applestrudel.jpeg");
  cardImage.setAttribute("alt", "Recipe Image");

  var cardInstructionsText = document.createElement("p");
  cardInstructionsText.classList.add("card-title");
  cardInstructionsText.textContent = "Instructions";

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

requestInstructionsData();
