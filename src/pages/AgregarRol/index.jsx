import { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import Form from '../../components/Form'
import Select from '../../components/Select'
import SetEstablecimiento from '../../components/SetEstablecimiento'
import SetInstitucion from '../../components/SetInstitucion'
import { useAlumnos } from '../../hooks/useAlumnos'
import { useAuth } from '../../hooks/useAuth'
import { useContratistas } from '../../hooks/useContratistas'
import { useCursos } from '../../hooks/useCursos'
import { useEstablecimientos } from '../../hooks/useEstablecimientos'
import { useField } from '../../hooks/useField'
import { useInstituciones } from '../../hooks/useInstituciones'
import { useNotification } from '../../hooks/useNotification'
import styles from './agregarRol.module.css'
import Alumno from './Alumno'
import Contratista from './Contratista'

const AgregarRol = () => {
  const [addingCurso, setAddingCurso] = useState(null)
  const [addingInstitucion, setAddingInstitucion] = useState(null)
  const [addingEstablecimiento, setAddingEstablecimiento] = useState(null)

  const curso = useField({ type: 'number' })
  const grupo = useField({ type: 'text' })
  const id_institucion_educativa = useField({ type: 'number' })

  const notifications = useNotification()
  const cursosActions = useCursos()
  const establecimientosActions = useEstablecimientos()
  const institucionesActions = useInstituciones()

  const { rol } = useParams()
  const { state: { results }} = useLocation()
  
  const alumno = useAlumnos()
  const contratista = useContratistas()
  
  const auth = useAuth()

  const cursos = useSelector(({ cursos }) => cursos)
  console.log(cursos)
  const establecimientos = useSelector(({ establecimientos }) => establecimientos)
  const instituciones = useSelector(({ instituciones }) => instituciones)

  const handleSubmit = (e) => {
    e.preventDefault()
    // advanced destructuring to get the value of the input
    const {
      nombres: { value: nombres },
      apellidos: { value: apellidos },
      edad: { value: edad },
      nro_documento: { value: nro_documento },
      id_tipo_documento: { value: id_tipo_documento },
      telefono: { value: telefono },
    } = e.target

    const id_usuario = results?.user_info?.id_usuario

    const data = { nombres, apellidos, edad, nro_documento, id_tipo_documento, telefono, id_usuario }

    if (rol == 'alumno') data.id_curso = e.target?.id_curso.value
    if (rol == 'contratista') data.id_establecimiento = e.target?.id_establecimiento.value

    notifications.add({ message: `Agregando datos de ${rol}...`, type: 'loading' })

    if (rol == 'alumno') alumno.add(data, results?.token)
    else if (rol == 'contratista') contratista.add(data, results?.token)
    else return notifications.add({ message: 'El rol no existe', type: 'error' }), null

    auth.Logged({ email: results?.user_info?.email, password: results?.user_info?.password })
  }

  const handleAddCurso = () => {
    notifications.add({ type:'loading', message:'agrendo curso' })
    cursosActions.add({
      curso: curso.value,
      grupo: grupo.value,
      id_institucion_educativa: id_institucion_educativa.value
    }, results?.token)
  }

  const handleAddInstitucion = ({ target }) => {
    notifications.add({ type:'loading', message:'agrendo institucion educativa' })
    institucionesActions.add({
      nombre: target.nombre.value,
      direccion: target.direccion.value,
      nit: target.nit.value,
      telefono: target.telefono.value,
      url: target.url.value,
      img_url: target.img_url.value
    }, results?.token)
  }

  const handleAddEstablecimiento = ({ target }) => {
    notifications.add({ type:'loading', message:'agrendo establecimiento' })
    establecimientosActions.add({
      nombre: target.nombre.value,
      tipo: target.tipo.value,
      direccion: target.direccion.value,
      nit: target.nit.value,
      telefono: target.telefono.value,
      url: target.url.value,
      img_url: target.img_url.value
    }, results?.token)
  }

  return (
    <section className={styles.AgregarRolSection}>
      <h1 className={styles.AgregarRolTitle}>Agregar {rol}</h1>
      <form
        onSubmit={handleSubmit}
        className={styles.AgregarRolForm}
      >
        {rol == 'alumno'
          ? <Alumno
            instituciones={instituciones}
            cursos={cursos}
            tipos_documento={results?.tipos_documento}
            setAddingInstitucion={setAddingInstitucion}
            setAddingCurso={setAddingCurso}
          />
          : <Contratista
            establecimientos={establecimientos}
            tipos_documento={results?.tipos_documento}
            setAddingEstablecimiento={setAddingEstablecimiento}
          />
        }
        <button type='submit' className={styles.SubmitButton}>Agregar</button>
      </form>
      {addingCurso && (
        <Form onSubmit={handleAddCurso} onClose={()=>setAddingCurso(false)} submitButtonLabel='agregar' >
          <div className={styles.ContainerInputsCurso}>
            <div>
              <input
                name='curso'
                id='curso'
                placeholder='11, 10, 9'
                className={styles.CursoInput}
                type={curso.type}
                value={curso.value}
                onChange={curso.onChange}
              />
              <span>-</span>
              <input
                name='grupo'
                id='grupo'
                placeholder='A, B, C, D...'
                className={styles.CursoInput}
                type={grupo.type}
                value={grupo.value}
                onChange={grupo.onChange}
              />
            </div>
            <Select
              field={id_institucion_educativa}
              name='id_institucion_educativa'
              options={
                instituciones.map(({ id_institucion_educativa, nombre }) => ({
                  id: id_institucion_educativa,
                  label: nombre
                }))
              } />
          </div>
        </Form>
      )}
      {addingInstitucion && (
        <Form
          onSubmit={handleAddInstitucion}
          onClose={()=>setAddingInstitucion(false)}
          submitButtonLabel='agregar'
        >
          <SetInstitucion />
        </Form>
      )}
      {addingEstablecimiento && (
        <Form
          onSubmit={handleAddEstablecimiento}
          onClose={()=>setAddingEstablecimiento(false)}
          submitButtonLabel='agregar'
        >
          <SetEstablecimiento />
        </Form>
      )}
    </section>
  )
}

export default memo(AgregarRol)