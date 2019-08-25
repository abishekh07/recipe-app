const form = document.querySelector('.form')
const recipes = document.querySelector('.recipes')

const APP_ID = '********'  // Refer to Readme.md
const APP_KEY = '************************' // Refer to Readme.md

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

fetchData(inputValue) // Initially Load values to the Screen!!

form.addEventListener('submit', (e) => {
  e.preventDefault()

  inputValue = e.target.searchInput.value
  fetchData(inputValue)
  e.target.searchInput.value = ''
})
