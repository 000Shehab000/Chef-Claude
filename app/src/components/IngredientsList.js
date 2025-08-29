export default function IngredientsList(props) {
  const ingredientItems = props.ingredients.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>
  })
  return (
    <section>
      <div className="ingredients-section">
        <h2>Ingredients on hand:</h2>
        <ul className="ingredients-list" aria-live="polite">
          {ingredientItems}
        </ul>
      </div>
      {props.ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div ref={props.ref}>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button
            onClick={() => props.getRecipe(props.ingredients)}
            disabled={props.isLoading}
            className={props.isLoading ? 'loading' : ''}
          >
            {props.isLoading ? 'Getting Recipe...' : 'Get a recipe'}
          </button>
        </div>
      )}
    </section>
  )
}
