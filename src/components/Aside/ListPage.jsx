import clsx from 'clsx'
import { memo, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './aside.module.css'

const ListPage = ({ page, children }) => {
  const [isActive, setIsActive] = useState(location.pathname.includes(page.path))

  const Routerlocation = useLocation()
  
  useEffect(() => {
    setIsActive(Routerlocation.pathname.match(new RegExp(page.title, 'i')))
  }, [Routerlocation])

  const cssPages = clsx(styles.AsideLink, [
    isActive && styles.ActivePage
  ])

  return (
    <li key={page.path} className={styles.ListPages}>
      <Link to={page.path} className={cssPages}>
        {children}
        {page.title}
      </Link>
    </li>
  )
}

export default memo(ListPage)