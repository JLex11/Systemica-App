import clsx from 'clsx'
import { memo, useEffect, useRef, useState } from 'react'
import { pages } from '../../pages/pagesInfo'
import styles from './aside.module.css'
import ListPage from './ListPage'

const Aside = () => {
  const [expanded, setExpanded] = useState(true)
  const asideRef = useRef(null)

  useEffect(() => {
    const aside = asideRef.current
    aside.addEventListener('mouseleave', () => setExpanded(false))
    aside.addEventListener('mouseenter', () => setExpanded(true))
    const timer = setTimeout(() => setExpanded(false), 2000)
    
    return () => {
      clearTimeout(timer)
      aside.removeEventListener('mouseleave', () => setExpanded(false))
      aside.removeEventListener('mouseenter', () => setExpanded(true))
    }
  }, [])

  const cssAside = clsx(styles.Aside, [expanded && styles.Expanded])

  return (
    <aside className={cssAside} ref={asideRef}>
      <div className={styles.AsideContent}>
        <ul className={styles.PagesList}>
          {pages.map((page) => {
            const Icon = page.icon
            return (
              <ListPage key={page.id} page={page}>
                <Icon />
              </ListPage>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}

export default memo(Aside)
