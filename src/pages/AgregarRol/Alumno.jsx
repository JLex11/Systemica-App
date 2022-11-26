import { memo } from 'react';
import { MdAdd } from 'react-icons/md';
import InputLabel from '../../components/Input/InputLabel';
import Select from '../../components/Select';
import { useField } from '../../hooks/useField';
import styles from './agregarRol.module.css';

const Alumno = ({ cursos, tipos_documento, setAddingCurso }) => {
  const nombres = useField({ type: 'text' });
  const apellidos = useField({ type: 'text' });
  const edad = useField({ type: 'number' });
  const documento = useField({ type: 'number' });
  const tipo_documento = useField({ type: 'number', defaultValue: tipos_documento[0]?.id_tipo_documento });
  const telefono = useField({ type: 'number' });
  const id_curso = useField({ type: 'number', defaultValue: cursos[0]?.id_curso });

  return (
    <div className={styles.InputsContainer}>
      <InputLabel {...nombres} id='nombres' labelText='Nombres' />
      <InputLabel {...apellidos} id='apellidos' labelText='Apellidos' />
      <InputLabel {...edad} id='edad' labelText='Edad' />
      <InputLabel {...documento} id='nro_documento' labelText='Documento' />
      {tipos_documento && (
        <Select
          name='id_tipo_documento'
          field={tipo_documento}
          options={tipos_documento.map(({ id_tipo_documento, tipo }) => (
            { id: id_tipo_documento, label: tipo }
          ))}
        />)}
      <InputLabel {...telefono} id='telefono' labelText='Telefono' />
      <div className={styles.SelectWithButton}>
        {cursos && (<Select
          name='id_curso'
          field={id_curso}
          options={cursos.map(({ id_curso, curso, grupo }) => (
            { id: id_curso, label: `${curso} - ${grupo}` }
          ))}
        />)}
        <button
          className={styles.AddButton}
          title='agrega un curso'
          onClick={()=>setAddingCurso(true)}
          type='button'
        >
          <MdAdd />
        </button>
      </div>
    </div>
  );
};

export default memo(Alumno);
