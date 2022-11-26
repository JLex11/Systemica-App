import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useField } from '../../hooks/useField';
import Select from '../Select';
import styles from './setTarea.module.css';

const SetTarea = ({ tarea, action = 'update' }) => {
  const titulo = useField({ type: 'text', defaultValue: tarea?.titulo });
  const descripcion = useField({ type: 'text', defaultValue: tarea?.descripcion });
  const tarea_estado = useField({ type: 'text', defaultValue: tarea?.tarea_estado || 'En progreso' });
  const id_alfabetizacion = useField({ type: 'text' });

  const alfabetizaciones = useSelector(
    ({ alfabetizaciones }) => action == 'create'
      ? alfabetizaciones
      : null
  );

  const alumnos = useSelector(
    ({ alumnos }) => action == 'create'
      ? alumnos
      : null
  );

  const alfabetizacionOptions = alfabetizaciones?.flatMap(
    ({ id_alumno, id_alfabetizacion }) => alumnos.flatMap((alumno) => {
      if (alumno.id_alumno == id_alumno) {
        return ({ id: id_alfabetizacion, label: `${id_alfabetizacion}: ${alumno.nombres} ${alumno.apellidos}` });
      }
      return [];
    })
  );

  const stateOptions = ['En progreso', 'Finalizado', 'Detenido', 'Cancelado'];

  const styleContainerInputs = clsx(styles.ContainerInputs, [
    tarea_estado.value == 'En progreso' && styles.ContainerInputs_Progress,
    tarea_estado.value == 'Finalizado' && styles.ContainerInputs_Finalized,
    tarea_estado.value == 'Detenido' && styles.ContainerInputs_Pending,
    tarea_estado.value == 'Cancelado' && styles.ContainerInputs_Canceled,
  ]);

  return (
    <div className={styleContainerInputs}>
      <header className={styles.Header}>
        <input
          name='titulo'
          id='titulo'
          placeholder='Escribe el titulo'
          type={titulo.type}
          onChange={titulo.onChange}
          value={titulo.value}
        />
        <div className={styles.Estado}>
          <span>Estado:</span>
          <Select
            field={tarea_estado}
            name='tarea_estado'
            options={stateOptions}
          />
        </div>
        {action == 'create' && (
          <div className={styles.Alfabetizacion}>
            <span>Alfabetizacion:</span>
            <Select
              field={id_alfabetizacion}
              name='id_alfabetizacion'
              options={alfabetizacionOptions}
            />
          </div>
        )}
      </header>
      <textarea
        name='descripcion'
        id='descripcion'
        placeholder='Escribe la descripcion'
        type={descripcion.type}
        onChange={descripcion.onChange}
        value={descripcion.value}
      />
    </div>
  );
};

export default memo(SetTarea);
