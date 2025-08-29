import React from 'react'
import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from './IngredientsList'
import { getRecipeFromMistral } from '../ai'

export default function Main() {
  const [ingredients, setIngredinets] = React.useState([])

  const [recipe, setRecipe] = React.useState('')
  const recipeSection = React.useRef(null)

  React.useEffect(() => {
    if (recipe && recipeSection.current) {
      recipeSection.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [recipe])

  function addIngredient(formData) {
    const newIngredient = formData.get('ingredient')
    setIngredinets((prevIngredinets) => [...prevIngredinets, newIngredient])
  }

  async function getRecipe(ingredients) {
    setRecipe(await getRecipeFromMistral(ingredients))
  }

  return (
    <main>
      <form action={addIngredient}>
        <input
          type="text"
          placeholder="e.g. Chicken"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>+ Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
        />
      )}
      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  )
}
