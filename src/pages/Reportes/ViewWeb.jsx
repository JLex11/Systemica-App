import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './reportes.module.css';

const ViewWebp = () => {
  const { state: { proyecto, tareas, alumno, contratista }} = useLocation();
  
  const tareasFinalizadas = tareas.filter(({ tarea_estado }) => tarea_estado == 'Finalizado');

  return (
    <section className={styles.SectionReporte} id='pdfDocument'>
      <div className={styles.OverHeader}>
        <span>Informe de alfabetización</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
      <header className={styles.Header}>
        <h1>Systema de proyectos de alfabetización</h1>
      </header>
      <section className={styles.ReportBody}>
        <p>Este control de proyectos de alfabetización certificado que:</p>
        <div>
          <p>El alumno <b>{`${alumno.nombres} ${alumno.apellidos}`}</b></p>
          <p>Termino <b>{proyecto?.horas_realizadas}</b> de 80 horas obligatorias del proyecto de alfabetización</p>
          <p>Este en observación y designación de tareas por <b>{`${contratista.nombres} ${contratista.apellidos}`}</b></p>
        </div>
        <div className={styles.TareasInfo}>
          {tareasFinalizadas.length > 0 ? (
            <>
              <p>En este lapso de tiempo durante el proyecto de alfabetización el alumno realizó las siguientes tareas</p>
              {tareasFinalizadas.map((tarea, index) => (
                <div key={tarea.id_tarea} className={styles.TareaItem}>
                  <span className={styles.TareaCounter}>{index + 1}.</span>
                  <div className={styles.TareaContent}>
                    <h4>{tarea.titulo}</h4>
                    <p>{tarea.descripcion.slice(0, 400)}...</p>
                  </div>
                </div>
              ))}
            </>
          )
            : <p>En este lapso de tiempo durante el proyecto de alfabetización el alumno no ha realizado ninguna tarea</p>
          }
        </div>
      </section>
      <div className={styles.Firmas}>
        <span className={styles.Linea}></span><span className={styles.Linea}></span><span className={styles.Linea}></span>
        <span className={styles.Firmante}>Contratista</span><span className={styles.Firmante}>Alumno</span><span className={styles.Firmante}>Director</span>
      </div>
    </section>
  );
};

export default memo(ViewWebp);