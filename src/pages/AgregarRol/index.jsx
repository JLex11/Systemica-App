import { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import Form from '../../components/Form'
import SetEstablecimiento from '../../components/SetEstablecimiento'
import { useAlumnos } from '../../hooks/useAlumnos'
import { useAuth } from '../../hooks/useAuth'
import { useContratistas } from '../../hooks/useContratistas'
import { useCursos } from '../../hooks/useCursos'
import { useEstablecimientos } from '../../hooks/useEstablecimientos'
import { useField } from '../../hooks/useField'
import { useNotification } from '../../hooks/useNotification'
import styles from './agregarRol.module.css'
import Alumno from './Alumno'
import Contratista from './Contratista'

const AgregarRol = () => {
  const [addingCurso, setAddingCurso] = useState(null)
  const [addingEstablecimiento, setAddingEstablecimiento] = useState(null)

  const curso = useField({ type: 'number' })
  const grupo = useField({ type: 'text' })

  const notifications = useNotification()
  const cursosActions = useCursos()
  const establecimientosActions = useEstablecimientos()

  const { rol } = useParams()
  const { state: { results }} = useLocation()
  
  const alumno = useAlumnos()
  const contratista = useContratistas()
  
  const auth = useAuth()

  const cursos = useSelector(({ cursos }) => cursos)
  const establecimientos = useSelector(({ establecimientos }) => establecimientos)

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      nombres: e.target.nombres.value,
      apellidos: e.target.apellidos.value,
      edad: e.target.edad.value,
      nro_documento: e.target.nro_documento.value,
      id_tipo_documento: e.target.id_tipo_documento.value,
      telefono: e.target.telefono.value,
      id_usuario: results?.user_info?.id_usuario
    }

    if (rol == 'alumno') data.id_curso = e.target?.id_curso.value
    if (rol == 'contratista') data.id_establecimiento = e.target?.id_establecimiento.value

    notifications.add({ message: `Agregando datos de ${rol}...`, type: 'loading' })

    if (rol == 'alumno') alumno.add(data, results?.token)
    else if (rol == 'contratista') contratista.add(data, results?.token)
    else {
      notifications.add({ message: 'El rol no existe', type: 'error' })
      return
    }

    auth.Logged({ email: results?.user_info?.email, password: results?.user_info?.password })
  }

  const handleAddCurso = () => {
    notifications.add({ type:'loading', message:'agrendo curso' })
    cursosActions.add({
      curso: curso.value,
      grupo: grupo.value,
      id_institucion_educativa: 1
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
          ? <Alumno cursos={cursos} tipos_documento={results?.tipos_documento} setAddingCurso={setAddingCurso} />
          : <Contratista establecimientos={establecimientos} tipos_documento={results?.tipos_documento} setAddingEstablecimiento={setAddingEstablecimiento} />
        }
        <button type='submit' className={styles.SubmitButton}>Agregar</button>
      </form>
      {addingCurso && (
        <Form onSubmit={handleAddCurso} onClose={()=>setAddingCurso(false)} submitButtonLabel='agregar' >
          <div className={styles.ContainerInputsCurso}>
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