import { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNotification } from '../../hooks/useNotification'
import { useTareas } from '../../hooks/useTareas'
import CardTarea from '../CardTarea'
import Form from '../Form'
import SetTarea from '../SetTarea'
import styles from './tareasList.module.css'

const TareasList = ({ tareas }) => {
  const [showForm, setShowForm] = useState(false)
  const [editingTarea, setEditingTarea] = useState(null)

  const token = useSelector(({ user }) => user?.results?.token)
  const tareaActions = useTareas()

  const handleEdit = (tarea) => {
    setEditingTarea(tarea)
    setShowForm(true)
  }

  const notification = useNotification()

  const handleDelete = ({ id_tarea }) => {
    notification.add({ type: 'loading', message: 'Eliminando tarea...' })
    tareaActions.remove(id_tarea, token)
  }

  const handleSubmit = ({ target: { titulo, descripcion, tarea_estado }}) => {
    tareaActions.update(editingTarea.id_tarea, {
      ...editingTarea,
      titulo: titulo.value.replace(/\n+/, ' ').trim(),
      descripcion: descripcion.value.replace(/\n+/, ' ').trim(),
      tarea_estado: tarea_estado.value
    }, token)
  }

  return (
    <>
      <ul className={styles.TareasList}>
        {tareas.map(tarea => (
          <CardTarea
            key={tarea.id_tarea}
            tarea={tarea}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      {showForm && (
        <Form
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
          submitButtonLabel='Aceptar'
        >
          <SetTarea tarea={editingTarea} />
        </Form>
      )}
    </>
  )
}

export default memo(TareasList)