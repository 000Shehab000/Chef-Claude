import React from 'react'

export default function Main() {
  const [ingredients, setIngredinets] = React.useState([])

  const ingredientItems = ingredients.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>
  })

  function addIngredient(formData) {
    const newIngredient = formData.get('ingredient')
    setIngredinets((prevIngredinets) => [...prevIngredinets, newIngredient])
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
        <section>
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-list" aria-live="polite">
            {ingredientItems}
          </ul>
          {ingredients.length > 3 && (
            <div className="get-recipe-container">
              <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
              </div>
              <button>Get a recipe</button>
            </div>
          )}
        </section>
      )}
    </main>
  )
}
