import { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CardContratista from '../../components/CardContratista'
import FilterInput from '../../components/FilterInput'
import SectionHeader from '../../components/SectionHeader'
import { useContratistas } from '../../hooks/useContratistas'
import { filterItems } from '../../utils/filterItems'
import styles from './contratistas.module.css'

const Contratistas = () => {
  const { id } = useParams()
  const [filterText, setFilterText] = useState(id ? `id:${id}` : '')

  const token = useSelector(({ user }) => user?.results?.token)
  const { init: initContratistas } = useContratistas()

  useEffect(() => {
    initContratistas(token)
  }, [token])


  const contratistas = useSelector(({ contratistas }) => id
    ? contratistas.filter(({ id_contratista }) => id_contratista == id)
    : contratistas
  )

  const { filteredItems: contratistasFiltered, ObjectKey, inKey } = useCallback(
    filterItems(contratistas, filterText)
  )
  
  if (ObjectKey && !filterText.includes(`${ObjectKey}:`)) {
    setFilterText([ObjectKey, ':', filterText.replace(`${inKey}:`, '')].join(''))
  }

  return (
    <section className={styles.ContratistasSection}>
      <SectionHeader title='Contratistas' >
        <FilterInput filterText={filterText} setFilterText={setFilterText} />
      </SectionHeader>
      <div className={styles.CardList}>
        {contratistasFiltered.map(contratista => (
          <CardContratista
            key={contratista.id_contratista}
            contratista={contratista}
          />
        ))}
      </div>
    </section>
  )
}

export default memo(Contratistas)
