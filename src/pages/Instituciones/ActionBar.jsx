import { memo, useCallback, useState } from 'react'
import { HiOutlineViewGridAdd } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import Form from '../../components/Form'
import SetInstitucion from '../../components/SetInstitucion'
import { useInstituciones } from '../../hooks/useInstituciones'
import { useNotification } from '../../hooks/useNotification'
import styles from './instituciones.module.css'

const ActionBar = () => {
  const [isAdding, setIsAdding] = useState(false)

  const userResults = useSelector(({ user }) => user?.results)
  const institucionActions = useInstituciones()

  const notification = useNotification()

  const handleAddInstitucion = useCallback(() => setIsAdding(true))

  const handleSubmit = useCallback(({ target: { nombre, direccion, nit, telefono, url, img_url }}) => {
    notification.add({ type: 'loading', message: 'Creando Institucion...' })
    institucionActions.add({
      nombre: nombre.value,
      direccion: direccion.value,
      nit: nit.value,
      telefono: telefono.value,
      url: url.value,
      img_url: img_url.value
    }, userResults.token)
    
    setIsAdding(false)
  })

  return (
    <div className={styles.ActionBar}>
      <div className={styles.ActionsButtons}>
        {userResults.user_info.rol == 'contratista' && (
          <button className={styles.AddTareaIcon} onClick={handleAddInstitucion}>
            <HiOutlineViewGridAdd />
            Agregar institucion
          </button>
        )}
      </div>
      {isAdding && (
        <Form
          onSubmit={handleSubmit}
          submitButtonLabel='Agregar'
          onClose={() => setIsAdding(false)}
          titulo={'Nueva Institucion'}
        >
          <SetInstitucion action='create' />
        </Form>
      )}
    </div>
  )
}

export default memo(ActionBar)