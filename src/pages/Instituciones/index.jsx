import { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FilterInput from '../../components/FilterInput'
import InstitucionesCarousel from '../../components/InstitucionesCarousel'
import SectionHeader from '../../components/SectionHeader'
import { useInstituciones } from '../../hooks/useInstituciones'
import { filterItems } from '../../utils/filterItems'
import ActionBar from './ActionBar'
import styles from './instituciones.module.css'

const Instituciones = () => {
  const [filterText, setFilterText] = useState('')
  const instituciones = useSelector(({ instituciones }) => instituciones)
  const token = useSelector(({ user }) => user?.results?.token)
  const { init: initInstituciones } = useInstituciones()

  useEffect(() => {
    initInstituciones(token)
  }, [token])

  const { filteredItems: institucionesFiltered, ObjectKey, inKey } = useCallback(
    filterItems(instituciones, filterText)
  )
  
  if (ObjectKey && !filterText.includes(`${ObjectKey}:`)) {
    setFilterText([ObjectKey, ':', filterText.replace(`${inKey}:`, '')].join(''))
  }

  return (
    <section className={styles.Instituciones}>
      <SectionHeader title='instituciones' >
        <FilterInput filterText={filterText} setFilterText={setFilterText} />
      </SectionHeader>
      <ActionBar />
      <InstitucionesCarousel instituciones={institucionesFiltered} />
    </section>
  )
}

export default memo(Instituciones)