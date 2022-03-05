const error = document.getElementById('error')
const cardDisplay = document.getElementById('card-display')
const cocktailDetail = document.getElementById('cocktail-detail')

const getCocktail = () => {
    const input = document.getElementById('input')
    const inputValue = input.value
    console.log(inputValue);
    
    if(inputValue >= 0 || inputValue <= 0 || inputValue === '') {
        error.innerText = "Please write a cocktail name"
    } else {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}
        `
        fetch(url)
        .then(res => res.json())
        .then(data => displayCocktail(data.drinks))
        error.innerText = ''
        cardDisplay.innerHTML = ''
    }
    input.value = ''
    cardDisplay.innerHTML = ''
    cocktailDetail.innerHTML = ''
}

const displayCocktail = drinks => {
    drinks.forEach(drink => {
        const div = document.createElement('div')
        div.classList.add('col-lg-3')
        div.innerHTML = `
        <div class="col text-center">
        <div class="card">
          <img src="${drink.strDrinkThumb}" class="card-img-top" alt="">
          <div class="card-body">
          <p>${drink.strDrink}</p>
          <a onclick="detailsDiv('${drink.idDrink}')" href="#" class="btn btn-primary">Details</a>
        </div>
        </div>
      </div>
        `
        cardDisplay.appendChild(div)
    })
}


const detailsDiv = drinksId => {
    cocktailDetail.innerHTML = ''

    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinksId}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        //console.log(data.drinks[0])
        const allData = data.drinks[0]
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card mb-3 mx-auto" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${allData.strDrinkThumb}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${allData.strDrink}</h5>
              <p class="card-text">${allData.strInstructions}</p>
              <p class="card-text"><small class="text-muted"><span class="text-primary">Modified Date: </span>
              ${allData.dateModified}</small></p>
            </div>
          </div>
        </div>
      </div>
        `
        cocktailDetail.appendChild(div)
    })
}
