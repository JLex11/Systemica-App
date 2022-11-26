import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardProyecto from '../../components/CardProyecto';
import FilterInput from '../../components/FilterInput';
import Form from '../../components/Form';
import SectionHeader from '../../components/SectionHeader';
import SetProyecto from '../../components/SetProyecto';
import { useAlfabetizaciones } from '../../hooks/useAlfabetizaciones';
import { useNotification } from '../../hooks/useNotification';
import { filterItems } from '../../utils/filterItems';
import ActionBar from './ActionBar';
import styles from './proyectos.module.css';

const Proyectos = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProyecto, setEditingProyecto] = useState(null);
  const { id } = useParams();
  const [filterText, setFilterText] = useState(id ? `id:${id}` : '');

  const token = useSelector(({ user }) => user?.results?.token);
  const { init: initAlfabetizaciones } = useAlfabetizaciones();

  useEffect(() => {
    initAlfabetizaciones(token);
  }, [token]);

  let proyectos = useSelector(({ alfabetizaciones }) => id
    ? alfabetizaciones.filter(({ id_alfabetizacion }) => id_alfabetizacion == id)
    : alfabetizaciones
  );

  const alumnos = useSelector(({ alumnos }) => alumnos);
  const contratistas = useSelector(({ contratistas }) => contratistas);

  proyectos = useCallback(proyectos.map(proyecto => {
    const alumno = alumnos?.find(({ id_alumno }) => id_alumno == proyecto?.id_alumno);
    const contratista = contratistas?.find(({ id_contratista }) => id_contratista == proyecto?.id_contratista);
    return { ...alumno, ...contratista, ...proyecto };
  }), [proyectos]);

  const filteredProyectos = filterItems(proyectos, filterText);

  const notification = useNotification();
  const proyectoActions = useAlfabetizaciones();

  const navigate = useNavigate();

  const handleReport = ({ proyecto, tareas, alumno, contratista }) => {
    
    navigate(`/reportes/${proyecto.id_alfabetizacion}`, {
      state: { proyecto, tareas, alumno, contratista },
    });
  };

  const handleEdit = (proyecto) => {
    setEditingProyecto(proyecto);
    setShowForm(true);
  };

  const handleDelete = ({ id_alfabetizacion }) => {
    notification.add({ type: 'loading', message: 'Eliminando proyecto...' });
    proyectoActions.remove(id_alfabetizacion, token);
  };

  const handleSubmit = ({ target: { fecha_inicio, fecha_finalizacion, horas_realizadas, estado, id_alumno, id_contratista }}) => {
    proyectoActions.update(editingProyecto.id_alfabetizacion, {
      ...editingProyecto,
      fecha_inicio: fecha_inicio.value,
      fecha_finalizacion: fecha_finalizacion.value,
      horas_realizadas: horas_realizadas.value,
      estado: estado.value,
      id_alumno: id_alumno.value,
      id_contratista: id_contratista.value,
    }, token);
  };

  return (
    <section className={styles.Proyectos}>
      <SectionHeader title='Proyectos'>
        <FilterInput filterText={filterText} setFilterText={setFilterText} />
      </SectionHeader>
      <ActionBar />
      <div className={styles.SectionBody}>
        <ul className={styles.ProyectsList}>
          {filteredProyectos.map(proyecto => (
            <CardProyecto
              key={proyecto.id_alfabetizacion}
              proyecto={proyecto}
              onEdit={handleEdit}
              onDelete={handleDelete}
              handleReport={handleReport}
            />
          ))}
        </ul>
      </div>
      {showForm && (
        <Form
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
          submitButtonLabel='Aceptar'
        >
          <SetProyecto proyecto={editingProyecto} />
        </Form>
      )}
    </section>
  );
};

export default memo(Proyectos);