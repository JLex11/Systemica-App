import { memo } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { TbReport } from 'react-icons/tb'
import styles from './cardProyecto.module.css'

const CardHeader = ({ proyecto, contratista, tareas, alumno, activeActions, onEdit, onDelete, handleReport }) => {
  return (
    <header className={styles.CardHeader}>
      <span>id: {proyecto.id_alfabetizacion}</span>
      <div className={styles.Actions}>
        {proyecto.estado == 'Finalizado' && (
          <button
            onClick={() =>
              handleReport({
                proyecto: proyecto,
                tareas: tareas,
                alumno: alumno,
                contratista: contratista,
              })
            }
            className={styles.ActionButton}
            title='Generar report'
          >
            <TbReport />
          </button>
        )}
        {activeActions && (
          <>
            <button
              onClick={() => onEdit(proyecto)}
              className={styles.ActionButton}
              title='Editar proyecto'
            >
              <FiEdit2 />
            </button>
            <button
              onClick={() => onDelete(proyecto)}
              className={styles.ActionButton}
              title='Eliminar proyecto'
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