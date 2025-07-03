import React from 'react'

export default function Main() {
  const [ingredients, setIngredinets] = React.useState(['tomato'])

  // const ingredients = ['tomato', 'onion', 'apple']
  const ingredientItems = ingredients.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>
  })

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newIngredient = formData.get('ingredient')
    setIngredinets((prevIngredinets) => [...prevIngredinets, newIngredient])
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>+ Add ingredient</button>
      </form>
      <ul>{ingredientItems}</ul>
    </main>
  )
}
