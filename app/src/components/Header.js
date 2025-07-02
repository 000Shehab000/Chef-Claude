import '../App.css'
import chefLogo from '../images/chef-claude-icon.png'

export default function Header() {
  return (
    <header>
      <nav>
        <img src={chefLogo} alt="chef logo" />
        <span>Chef Claude</span>
      </nav>
    </header>
  )
}
