import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardAlumno from '../../components/CardAlumno';
import FilterInput from '../../components/FilterInput';
import SectionHeader from '../../components/SectionHeader';
import { useAlumnos } from '../../hooks/useAlumnos';
import { filterItems } from '../../utils/filterItems';
import styles from './alumnos.module.css';

const Alumnos = () => {
  const { id } = useParams();
  const [filterText, setFilterText] = useState(id ? `id:${id}` : '');

  const token = useSelector(({ user }) => user?.results?.token);
  const { initAssociated: initAlumnos } = useAlumnos();

  useEffect(() => {
    initAlumnos([ 'cursos', 'usuarios.alumnos'], token);
  }, [token]);

  const alumnos = useSelector(({ alumnos }) => id
    ? alumnos.filter(({ id_alumno }) => id_alumno == id)
    : alumnos
  );

  const alumnosFiltered = filterItems(alumnos, filterText);

  return (
    <section className={styles.AlumnosSection}>
      <SectionHeader title='Alumnos'>
        <FilterInput filterText={filterText} setFilterText={setFilterText} />
      </SectionHeader>
      <div className={styles.CardList}>
        {alumnosFiltered.map(alumno => (
          <CardAlumno
            key={alumno.id_alumno}
            alumno={alumno}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(Alumnos);
