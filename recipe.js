// Grab the contents from the HTML page
const searchInputForm = document.querySelector("form");
const recipedata = document.querySelector("#content");
const noData = document.querySelector("#no-data");
const container = document.querySelector(".container");
let recipeName = "";

// Defining the Constants
const APP_ID = "03e0caa6";
const APP_KEY = "d5cd0ae20bd99294c54f4916e7073408";

//call asynchronous function getData() after submitting the form
searchInputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    recipeName = e.target.querySelector("input").value;
    if (!recipeName && recipeName.trim().length <= 0) {
        alert("Please enter your recipe");
        return;
    }
    getData();
});

// Get the data from the API
async function getData() {
    const APP_URL = `https://api.edamam.com/search?q=${recipeName}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`;
    const response = await fetch(APP_URL);
    const data = await response.json();

    // If data is returned, then display it
    if (data.hits.length > 0) {
        recipedata.style.display = "grid";
        displayData(data.hits);
    }

    //else display "No data found"
    else {
        container.classList.remove("initial");
        recipedata.style.display = "block";
        recipedata.innerHTML = `
        <img class = "sad-face" src = "./images/sad.png" alt = "Sad Face">
        <div>No data found</div>`;

        recipedata.style.fontStyle = "italic";
        recipedata.style.textAlign = "center";
        recipedata.style.fontSize = "3rem";
        recipedata.style.color = "#ff1a1a";
    }
}

// Use the retrieved data to display on the webpage (using JSX)
function displayData(response) {
    container.classList.remove("initial");
    let content = "";

    response.map((result) => {
        content += `
      <div class="recipe">

        <img src="${result.recipe.image}" alt="recipe-image">

        <div class="flex-container">

          <h1 class="recipe-title">${result.recipe.label}</h1>

          <a class="recipe-info" target="_blank" href="${result.recipe.url}">Get the recipe</a>

        </div>

        <p class="recipe-data">Calories: ${Math.floor(result.recipe.calories)} kcal</p>
        <p class="recipe-data">Diet label: ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "Data Not Available"
        }</p>

        <p class="recipe-data">Health labels: ${result.recipe.healthLabels}</p>
        <p class="recipe-data">Estimated time: ${result.recipe.totalTime>0?result.recipe.totalTime+" minutes":"Data Not Available"}</p>

      </div>`;

    });

    recipedata.innerHTML = content;
}