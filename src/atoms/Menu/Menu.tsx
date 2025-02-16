import { MouseEventHandler, ReactElement, useEffect, useRef } from 'react'
import Icon from '@mdi/react'
import { mdiDotsHorizontal } from '@mdi/js'
import { IMenuProps } from './Menu.interface'

export const YaMenu = ({
  items,
  showMenu,
  onShowMenu
}: IMenuProps): ReactElement<IMenuProps> => {
  const menuRef = useRef<HTMLDivElement>(null)

  const clickOutside = (e: Event) => {
    if (
      showMenu &&
      !(
        menuRef.current &&
        (menuRef.current === e.target ||
          menuRef.current?.contains(e.target as Element))
      )
    ) {
      onShowMenu(false)
    }
  }

  const onClickToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()

    onShowMenu(!showMenu)
  }

  useEffect(() => {
    document.addEventListener('click', clickOutside, true)

    return () => document.removeEventListener('click', clickOutside)
  })

  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex hover:cursor-pointer justify-center items-center border-none rounded-full px-3 py-2 text-sm font-semibold text-gray-900 outline-none"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={onClickToggle}
          >
            <Icon path={mdiDotsHorizontal} size={1} />
          </button>
        </div>

        {showMenu && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
            ref={menuRef}
          >
            <div className="py-1 divide-y divide-gray-200/60" role="none">
              {items.map((item, index) => (
                <button
                  key={index}
                  className="flex items-center w-full gap-x-2 px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100"
                  role="menuitem"
                  onClick={item.onClick}
                >
                  {item.icon && <Icon path={item.icon} size={0.8} />}

                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
