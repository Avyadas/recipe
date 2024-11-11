// Show the main page after loading
let retryInterval;

        // Function to fetch data from API
        async function fetchData() {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
                
                if (!response.ok) throw new Error("Network response was not ok");

                const data = await response.json();
                console.log(data); // Log data for debugging
                showMainPage(); // Only show main page if data is successfully fetched
            } catch (error) {
                console.error("Fetch error: ", error);
                document.getElementById('errorMessage').innerText = "Network error. Retrying in a moment...";
                retryFetch(); // Start retrying if fetch fails
            }
        }

        // Function to start retrying the fetch
        function retryFetch() {
            if (!retryInterval) { // Only set the interval once
                retryInterval = setInterval(fetchData, 3000); // Retry every 3 seconds
            }
        }

        // Function to show the main page and clear retry attempts
        function showMainPage() {
            clearInterval(retryInterval); // Stop retrying once data is fetched
            retryInterval = null; // Reset interval
            document.getElementById('loadingPage').style.display = 'none';
            document.getElementById('mainPage').style.display = 'block';
        }

        // Start the initial data fetch when the page loads
        window.onload = fetchData;

function showMainPage() {
  document.getElementById('loadingPage').style.display = 'none';
  document.getElementById('mainPage').style.display = 'block';
}

// Call fetchData when the page loads
window.onload = fetchData;

// Start search from the main page
function startSearch(event) {
  if (event.key === 'Enter' || event.type === 'onclick') {
    const ingredient = document.getElementById("mainIngredientInput").value.trim();
    if (ingredient !== "") {
      document.getElementById("mainPage").style.display = "none";
      document.getElementById("resultsPage").style.display = "block";
      fetchRecipes(ingredient);
    }
  }
}

// Search recipes based on the ingredient on results page
function searchRecipes(event) {
  if (event.key === 'Enter' || event.type === 'onclick') {
    const ingredient = document.getElementById("ingredientInput").value.trim();
    if (ingredient !== "") {
      fetchRecipes(ingredient);
    }
  }
}

// Fetch recipes from the MealDB API
async function fetchRecipes(ingredient) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    if (data.meals) {
      displayRecipes(data.meals);
    } else {
      document.getElementById("recipes").innerHTML = "<p>No recipes found for this ingredient.</p>";
    }
  } catch (error) {
    document.getElementById("recipes").innerHTML = "<p>Error fetching data. Please try again later.</p>";
  }
}

// Display the recipes with images and links
function displayRecipes(recipes) {
  let recipesHTML = "<div class='recipe-list'>";
  recipes.forEach(recipe => {
    recipesHTML += `
      <div class="recipe-item">
        <a href="https://www.themealdb.com/meal.php?c=${recipe.idMeal}" target="_blank">
          <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-image"/>
          <p class="recipe-box">${recipe.strMeal}</p>
        </a>
      </div>
    `;
  });
  recipesHTML += "</div>";
  document.getElementById("recipes").innerHTML = recipesHTML;
}
