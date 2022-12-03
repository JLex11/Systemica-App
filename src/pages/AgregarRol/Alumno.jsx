import { memo } from 'react'
import { MdAdd } from 'react-icons/md'
import InputLabel from '../../components/Input/InputLabel'
import Select from '../../components/Select'
import { useField } from '../../hooks/useField'
import styles from './agregarRol.module.css'

const Alumno = ({ instituciones, cursos, tipos_documento, setAddingInstitucion, setAddingCurso }) => {
  const id_institucion_educativa = useField({ type: 'number', defaultValue: instituciones[0]?.id_institucion_educativa })
  const nombres = useField({ type: 'text' })
  const apellidos = useField({ type: 'text' })
  const edad = useField({ type: 'number' })
  const documento = useField({ type: 'number' })
  const tipo_documento = useField({ type: 'number', defaultValue: tipos_documento[0]?.id_tipo_documento })
  const telefono = useField({ type: 'number' })
  
  console.log(cursos)
  cursos = cursos.filter((curso) => {
    console.log(curso.id_institucion_educativa, id_institucion_educativa.value)
    return curso.id_institucion_educativa == id_institucion_educativa.value
  })
  if (cursos.length == 0) cursos = [{ id_curso: 0, curso: 'No hay cursos', grupo: 'Registra uno' }]
  
  const id_curso = useField({ type: 'number', defaultValue: cursos[0]?.id_curso })

  tipos_documento = tipos_documento.filter(({ tipo_abreviado }) => {
    if (edad.value >= 18) return true
    if (edad.value < 18 && tipo_abreviado == 'CC') return true
    return false
  })

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
        {instituciones && (
          <Select
            name='id_institucion_educativa'
            field={id_institucion_educativa}
            options={instituciones.map(({ id_institucion_educativa, nombre }) => (
              { id: id_institucion_educativa, label: `${nombre}` }
            ))}
          />
        )}
        <button
          className={styles.AddButton}
          title='agrega un institucion'
          onClick={()=>setAddingInstitucion(true)}
          type='button'
        >
          <MdAdd />
        </button>
      </div>
      <div className={styles.SelectWithButton}>
        {cursos && (
          <Select
            name='id_curso'
            field={id_curso}
            options={cursos.map(({ id_curso, curso, grupo }) => (
              { id: id_curso, label: `${curso} - ${grupo}` }
            ))}
          />
        )}
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
  )
}

export default memo(Alumno)
