

const form = document.querySelector('form');
const input = document.querySelector('input');
const mainSection = document.querySelector('.recipe-list');
const light = document.querySelector('.light');
const dark = document.querySelector('.dark');
const country = document.querySelector('.country');
const container = document.querySelector('.recipe-container');

let searchQuery = "";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchData();
    inputShrink();
})


async function fetchData() {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=fbff24b6&app_key=7e9144a510bf236d86ecc1d50f5c5dc3`
    const res = await fetch(url);
    const data = await res.json();
    showData(data.hits);
    console.log(data);
}


function showData(items) {
    mainSection.style.display = "grid";
    let displayData = items.map((item) => {
        return `<div class="recipe-container">
                  
                  <img src=${item.recipe.image} />
                  <div class="desc">
                      <h3>${item.recipe.label}</h3>
                      <div class="meal-type">
                          <p>Meal: ${item.recipe.mealType[0]}</p>
                          <a href=${item.recipe.url} target="_blank"><button class="recipe-btn">Show Recipe</button></a>
                      </div>   
                      <p>Type:  ${item.recipe.dishType[0]}</p>
                      <p class="country">Country:  ${item.recipe.cuisineType[0].toUpperCase()}</p>
                  </div>
              </div>`;
});
  displayData = displayData.join('');
  
  mainSection.innerHTML = displayData;
}

function inputShrink() {
    input.classList.remove('grow')
}



  light.addEventListener("click", toggleLight);
  dark.addEventListener("click", toggleDark);

  function toggleLight() {
      light.style.visibility = "hidden";
      dark.style.visibility = "visible";
      document.body.style.background = 'linear-gradient(to right, #f9ffb7, #feffd0, #fffff6, #feffd0)';
      document.body.style.color = "black";
      input.classList.add('color');
  }
  function toggleDark() {
      dark.style.visibility = "hidden";
      light.style.visibility = "visible";
      document.body.style.background = 'linear-gradient(to right, #3e3e3e, #515050, #797777, #363535)';
      document.body.style.color = "white";
      input.classList.remove('color');
  }

 