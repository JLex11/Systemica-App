import { memo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import EstablecimientosCarousel from '../../components/EstablecimientosCarousel'
import FilterInput from '../../components/FilterInput'
import SectionHeader from '../../components/SectionHeader'
import { filterItems } from '../../utils/filterItems'
import ActionBar from './ActionBar'
import styles from './establecimientos.module.css'

const Establecimientos = () => {
  const [filterText, setFilterText] = useState('')
  const establecimientos = useSelector(({ establecimientos }) => establecimientos)

  const { filteredItems: establecimientosFiltered, ObjectKey, inKey } = useCallback(
    filterItems(establecimientos, filterText)
  )
  
  if (ObjectKey && !filterText.includes(`${ObjectKey}:`)) {
    setFilterText([ObjectKey, ':', filterText.replace(`${inKey}:`, '')].join(''))
  }

  return (
    <section className={styles.Establecimientos}>
      <SectionHeader title='Establecimientos' >
        <FilterInput filterText={filterText} setFilterText={setFilterText} />
      </SectionHeader>
      <ActionBar />
      <EstablecimientosCarousel establecimientos={establecimientosFiltered} />
    </section>
  )
}

export default memo(Establecimientos)