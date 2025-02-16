import { JSX } from 'react'

export interface IMenuItem {
  title: string | JSX.Element
  onClick: () => void
  icon?: string
}

export interface IMenuProps {
  showMenu: boolean
  items: IMenuItem[]
  onShowMenu: (value: boolean) => void
}
