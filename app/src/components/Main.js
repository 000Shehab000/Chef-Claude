import React from 'react'
import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from './IngredientsList'
import { getRecipeFromMistral } from '../ai'
import chefLogo from '../images/chef-claude-icon.png'

export default function Main() {
  const [ingredients, setIngredinets] = React.useState([])
  const [recipe, setRecipe] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [displayedText, setDisplayedText] = React.useState('')
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0)
  const [currentCharIndex, setCurrentCharIndex] = React.useState(0)
  const recipeSection = React.useRef(null)

  const welcomeText = [
    "Hey there, I'm TasteGPT your smart cooking assistant!",
    "Give me at least 4 ingredients you have in your kitchen, and I'll whip up a delicious recipe idea for you.",
  ]

  React.useEffect(() => {
    if (recipe && recipeSection.current) {
      recipeSection.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [recipe])

  React.useEffect(() => {
    // Start typing animation after component mounts
    const timer = setTimeout(() => {
      startTyping()
    }, 300) // Reduced initial delay
    return () => clearTimeout(timer)
  }, [])

  const startTyping = () => {
    if (currentLineIndex < welcomeText.length) {
      const currentLine = welcomeText[currentLineIndex]

      if (currentCharIndex < currentLine.length) {
        const timer = setTimeout(() => {
          setDisplayedText((prev) => {
            if (currentLineIndex === 0) {
              return currentLine.substring(0, currentCharIndex + 1)
            } else {
              return (
                welcomeText[0] +
                '\n' +
                currentLine.substring(0, currentCharIndex + 1)
              )
            }
          })
          setCurrentCharIndex((prev) => prev + 1)
        }, 25) // Much faster typing speed (25ms per character)

        return () => clearTimeout(timer)
      } else {
        // Move to next line
        const timer = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1)
          setCurrentCharIndex(0)
          // Add the new line immediately when moving to next line
          if (currentLineIndex === 0) {
            setDisplayedText(welcomeText[0] + '\n')
          }
        }, 100) // Shorter pause between lines (100ms)

        return () => clearTimeout(timer)
      }
    }
  }

  React.useEffect(() => {
    if (currentLineIndex < welcomeText.length) {
      startTyping()
    }
  }, [currentCharIndex, currentLineIndex])

  function addIngredient(formData) {
    const newIngredient = formData.get('ingredient')
    setIngredinets((prevIngredinets) => [...prevIngredinets, newIngredient])
  }

  async function getRecipe(ingredients) {
    setIsLoading(true)
    try {
      const recipeResult = await getRecipeFromMistral(ingredients)
      setRecipe(recipeResult)
    } catch (error) {
      console.error('Error getting recipe:', error)
      setRecipe(
        'Sorry, there was an error generating your recipe. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
      <div className="welcome-section">
        <div className="bot-container">
          <img src={chefLogo} alt="TasteGPT Bot" className="bot-icon" />
          <div className="speech-bubble">
            <div className="typing-text">
              <pre className="typing-content">
                {displayedText}
                {currentLineIndex < welcomeText.length && (
                  <span className="typing-cursor">|</span>
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>

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
          isLoading={isLoading}
        />
      )}

      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Cooking up your recipe...</p>
        </div>
      )}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  )
}
