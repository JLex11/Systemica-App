import { memo } from 'react'
import { AiOutlineDelete, AiOutlineFieldTime } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { toRtf } from '../../utils/toRtf'
import styles from './tareaCard.module.css'

const CardHeader = (props) => {
  return (
    <header className={styles.Header}>
      <div className={styles.TaskDate}>
        <AiOutlineFieldTime />
        <h2>{toRtf(props.tarea.fecha)}</h2>
      </div>
      <div className={styles.Actions}>
        {props.id_usuario == props.contratista?.id_usuario && (
          <>
            <button
              onClick={() => props.onEdit(props.tarea)}
              className={styles.ActionButton}
              title='Editar tarea'
            >
              <FiEdit2 />
            </button>
            <button
              onClick={() => props.onDelete(props.tarea)}
              className={styles.ActionButton}
              title='Eliminar tarea'
            >
              <AiOutlineDelete />
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default memo(CardHeader)