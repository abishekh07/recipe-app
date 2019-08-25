const searchBar = document.querySelector('.search-bar')
const searchBtn = document.querySelector('.search-btn')
const form = document.querySelector('.form')
const recipes = document.querySelector('.recipes')

const APP_ID = '8cf9f0f9'
const APP_KEY = 'c6d9f6243b81052483cb68327dbc8c83'

let inputValue = 'chicken'

const fetchData = async (query) => {
  const response = await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
  )

  const data = await response.json()
  runAPIScripts(data.hits)
}

const runAPIScripts = (data) => {
  recipes.innerHTML = ''
  data.map((recipe) => {
    generateDOM(recipe.recipe)
  })
}

const generateDOM = (recipe) => {
  const wrapper = document.createElement('div')

  const title = document.createElement('h1')
  title.textContent = recipe.label

  const calories = document.createElement('p')
  calories.textContent = `${Math.floor(recipe.calories)} calories`

  const listContainer = document.createElement('ul')

  recipe.ingredientLines.forEach((ingredient) => {
    const listItem = document.createElement('ol')
    listItem.textContent = ingredient
    listContainer.appendChild(listItem)
  })

  const image = document.createElement('img')
  image.setAttribute('src', recipe.image)
  image.classList.add('img')

  wrapper.appendChild(title)
  wrapper.appendChild(calories)
  wrapper.appendChild(listContainer)
  wrapper.appendChild(image)

  wrapper.classList.add('recipe')

  recipes.appendChild(wrapper)
}

fetchData(inputValue) // Initially Load values on the Screen!!

form.addEventListener('submit', (e) => {
  e.preventDefault()

  inputValue = e.target.searchInput.value
  fetchData(inputValue)
  e.target.searchInput.value = ''
})
