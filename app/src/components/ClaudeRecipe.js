import Markdown from 'react-markdown'

export default function ClaudeRecipe(props) {
  return (
    <section className="suggested-recipe-container">
      <Markdown>{props.recipe}</Markdown>
    </section>
  )
}
