import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FilterInput from '../../components/FilterInput';
import SectionHeader from '../../components/SectionHeader';
import TareasList from '../../components/TareasList';
import { useTareas } from '../../hooks/useTareas';
import { filterItems } from '../../utils/filterItems';
import ActionBar from './ActionBar';
import styles from './tareas.module.css';

const Tareas = () => {
  const { id } = useParams();
  const [filterText, setFilterText] = useState(id ? `id:${id}` : '');

  const token = useSelector(({ user }) => user?.results?.token);
  const { init: initTareas } = useTareas();

  useEffect(() => {
    initTareas(token);
  }, [token]);
  
  const tareas = useSelector(({ tareas }) => tareas);
  
  const filteredTareas = filterItems(tareas, filterText);
  filteredTareas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <section className={styles.TareasSection}>
      <SectionHeader title='Tareas' >
        <FilterInput filterText={filterText} setFilterText={setFilterText} />
      </SectionHeader>
      <ActionBar />
      <TareasList tareas={filteredTareas} />
    </section>
  );
};

export default memo(Tareas);