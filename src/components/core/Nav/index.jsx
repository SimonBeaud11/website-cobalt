import { Link } from 'hyperstatic'
import { objByProperty } from '/src/lib/Data'

export const Nav = (state) => {
  if (!state.menus.length) {
    return ''
  }
  
  return state.menus
    .find( objByProperty('slug', 'navigation') )
    .menuItems.nodes
    .map( (menu) =>
      <li><Link href={menu.url}>{menu.label}</Link></li>
    )
}