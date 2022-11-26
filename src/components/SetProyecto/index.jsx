import clsx from 'clsx';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useField } from '../../hooks/useField';
import Select from '../Select';
import styles from './setProyecto.module.css';

const SetProyecto = ({ proyecto, /* action = 'update' */ }) => {
  const fecha_inicio = useField({ type: 'date', defaultValue: proyecto?.fecha_inicio || new Date().toISOString().slice(0, 10) });
  const fecha_finalizacion = useField({ type: 'date', defaultValue: proyecto?.fecha_finalizacion });
  const horas_realizadas = useField({ type: 'number', defaultValue: proyecto?.horas_realizadas || 0 });
  const estado = useField({ type: 'text', defaultValue: proyecto?.estado || 'En progreso' });
  const id_alumno = useField({ type: 'text', defaultValue: proyecto?.id_alumno });
  const id_contratista = useField({ type: 'text', defaultValue: proyecto?.id_contratista });

  useEffect(() => {
    if (horas_realizadas?.value >= 80) {
      horas_realizadas.setValue(80);
      estado.setValue('Finalizado');
      document.getElementById('estado').selectedIndex = 1;
    }
  }, [estado.value, horas_realizadas.value]);

  const userResults = useSelector(({ user }) => user?.results);

  const alumnos = useSelector(({ alumnos }) => alumnos);

  const contratistas = useSelector(({ contratistas }) =>
    contratistas.filter(({ id_usuario }) => id_usuario == userResults?.user_info?.id_usuario)
  );

  const alumnosOptions = alumnos?.map(({ id_alumno, nombres, apellidos }) => (
    { id: id_alumno, label: `${nombres} ${apellidos}` }
  ));

  const contratistasOptions = contratistas?.map(({ id_contratista, nombres, apellidos }) => (
    { id: id_contratista, label: `${nombres} ${apellidos}` }
  ));

  const stateOptions = ['En progreso', 'Finalizado', 'Detenido', 'Cancelado'];

  const styleContainerInputs = clsx(styles.ContainerInputs, [
    estado.value == 'En progreso' && styles.ContainerInputs_Progress,
    estado.value == 'Finalizado' && styles.ContainerInputs_Finalized,
    estado.value == 'Detenido' && styles.ContainerInputs_Pending,
    estado.value == 'Cancelado' && styles.ContainerInputs_Canceled,
  ]);

  return (
    <div className={styleContainerInputs}>
      <header className={styles.Header}>
        <div className={styles.FechaInicio}>
          <span>Fecha de inicio:</span>
          <input
            name='fecha_inicio'
            id='fecha_inicio'
            type={fecha_inicio.type}
            value={fecha_inicio.value}
            onChange={fecha_inicio.onChange}
          />
        </div>
        <div className={styles.FechaFinalizacion}>
          <span>Fecha de finalizacion</span>
          <input
            name='fecha_finalizacion'
            id='fecha_finalizacion'
            type={fecha_finalizacion.type}
            value={fecha_finalizacion.value}
            onChange={fecha_finalizacion.onChange}
          />
        </div>
        <div className={styles.Horas}>
          <span>Horas realizadas</span>
          <input
            name='horas_realizadas'
            id='horas_realizadas'
            type={horas_realizadas.type}
            value={horas_realizadas.value}
            onChange={horas_realizadas.onChange}
            placeholder={'Ingresa las horas realizadas'}
          />
        </div>
        <div className={styles.Alumno}>
          <span>Alumno:</span>
          <Select
            field={id_alumno}
            name='id_alumno'
            options={alumnosOptions}
          />
        </div>
        <div className={styles.Contratista}>
          <span>Contratista:</span>
          <Select
            field={id_contratista}
            name='id_contratista'
            options={contratistasOptions}
          />
        </div>
        <div className={styles.Estado}>
          <span>Estado del proyecto</span>
          <Select
            field={estado}
            name='estado'
            options={stateOptions}
          />
        </div>
      </header>
    </div>
  );
};

export default memo(SetProyecto);
