import { memo } from 'react';
import { BsChevronDown, BsListTask } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import StateLabel from '../StateLabel';
import styles from './cardAlumno.module.css';

const CardHeader = ({ alumno, alfabetizacion, tarea, curso, handleVisible }) => {
  return (
    <div className={styles.CardHeader}>
      <picture className={styles.Foto}>
        <Link to={alumno.foto_url} target='_blank'>
          <img
            src={alumno.foto_url}
            alt={alumno.nombres}
            loading='lazy'
          />
        </Link>
        <span className={styles.Edad}>{alumno.edad} años</span>
      </picture>
      <div>
        <div className={styles.InfoAlumno}>
          <Link to={`/usuarios/${alumno.id_usuario}`}>
            <h3 className={styles.Nombre}>{alumno.nombres} {alumno.apellidos}</h3>
          </Link>
          <Link to={`/cursos/${curso.id_curso}`}>
            <h5 className={styles.Curso}>{curso.curso}-{curso.grupo}</h5>
          </Link>
        </div>
        {alfabetizacion && (
          <Link
            to={`/proyectos/${alfabetizacion.id_alfabetizacion}`}
            className={styles.Alf_Information}
          >
            <StateLabel state={alfabetizacion.estado}/>
            <span className={styles.Horas}>{alfabetizacion.horas_realizadas} horas</span>
          </Link>
        )}
        {tarea && (
          <button type='button' className={styles.TaskLabel} onClick={handleVisible}>
            <BsListTask className={styles.TaskIcon} />
            Tarea Reciente
            <BsChevronDown className={styles.TaskIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(CardHeader);