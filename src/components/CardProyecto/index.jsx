import clsx from 'clsx';
import { memo } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { TbReport } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StateLabel from '../StateLabel';
import TareasCarousel from '../TareasCarousel';
import styles from './cardProyecto.module.css';

const CardProyecto = ({ proyecto, onEdit, onDelete, handleReport }) => {
  const user = useSelector(({ user }) => user?.results?.user_info);

  const alumno = useSelector(({ alumnos }) =>
    alumnos.find(({ id_alumno }) => id_alumno == proyecto.id_alumno));

  const tareas = useSelector(({ tareas }) =>
    tareas.filter(({ id_alfabetizacion }) => id_alfabetizacion == proyecto.id_alfabetizacion)
  );

  const contratista = useSelector(({ contratistas }) =>
    contratistas.find(({ id_contratista }) => id_contratista == proyecto.id_contratista)
  );

  const styleCardProyecto = clsx(styles.CardProyecto, [
    proyecto.estado == 'En progreso' && styles.CardState_Progress,
    proyecto.estado == 'Finalizado' && styles.CardState_Finalized,
    proyecto.estado == 'Detenido' && styles.CardState_Pending,
    proyecto.estado == 'Cancelado' && styles.CardState_Canceled,
  ]);

  const activeActions = (user.id_usuario == contratista.id_usuario) && (user.rol == 'contratista');

  return (
    <li className={styleCardProyecto}>
      <header className={styles.CardHeader}>
        <div className={styles.Actions}>
          {proyecto.estado == 'Finalizado' && (
            <button
              onClick={() => handleReport({ proyecto, tareas, alumno, contratista })}
              className={styles.ActionButton}
              title='Generar report'
            >
              <TbReport />
            </button>
          )}
          {activeActions && (
            <>
              <button
                onClick={() => onEdit(proyecto)}
                className={styles.ActionButton}
                title='Editar proyecto'  
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => onDelete(proyecto)}
                className={styles.ActionButton}
                title='Eliminar proyecto'
              >
                <AiOutlineDelete />
              </button>
            </>
          )}
        </div>
      </header>
      <div className={styles.CardBody}>
        <Link to={`/usuarios/${alumno?.id_usuario}`} className={styles.InfoAlumno}>
          <h5 className={styles.Nombres}>{alumno?.nombres} {alumno?.apellidos}</h5>
          <span className={styles.curso}>{alumno?.curso} - {alumno?.grupo}</span>
        </Link>
        <div className={styles.AlfEstado}>
          <span>Estado actual del proyecto:</span>
          <StateLabel state={proyecto.estado} />
        </div>
        <Link to={`/usuarios/${contratista?.id_usuario}`} className={styles.InfoAlumno}>
          <span>Contratista:</span>
          <h5 className={styles.Nombres}>{contratista?.nombres} {contratista?.apellidos}</h5>
        </Link>
        <div className={styles.Footer}>
          <p className={styles.Horas}>Horas realizadas: {proyecto.horas_realizadas}/80</p>
          <span>Tareas: {tareas?.length}</span>
        </div>
        {tareas?.length > 0
          ? <TareasCarousel tareas={tareas} />
          : <h5>No hay tareas</h5>
        }
      </div>
    </li>
  );
};

export default memo(CardProyecto);