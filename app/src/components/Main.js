import React from 'react'
import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from './IngredientsList'

export default function Main() {
  const [ingredients, setIngredinets] = React.useState([
    'all the main spices',
    'pasta',
    'ground beef',
    'tomato paste',
  ])
  const [recipeShown, setRecipeShown] = React.useState(false)

  function addIngredient(formData) {
    const newIngredient = formData.get('ingredient')
    setIngredinets((prevIngredinets) => [...prevIngredinets, newIngredient])
  }

  function showRecipe() {
    setRecipeShown((prevState) => !prevState)
  }

  return (
    <main>
      <form action={addIngredient}>
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>+ Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} handleClick={showRecipe} />
      )}

      {recipeShown && <ClaudeRecipe />}
    </main>
  )
}
