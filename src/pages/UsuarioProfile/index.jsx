import { memo, useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../../components/Form';
import Profile from '../../components/Profile';
import SetUsuario from '../../components/SetUsuario';
import TareasList from '../../components/TareasList';
import { useAlumnos } from '../../hooks/useAlumnos';
import { useContratistas } from '../../hooks/useContratistas';
import { useUsuarios } from '../../hooks/useUsuarios';
import styles from './usuarioProfile.module.css';

const UsuarioProfile = () => {
  const [editingUser, setEditingUser] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  const results = useSelector(({ user }) => user?.results);
  const { init: initUsuarios } = useUsuarios();

  useEffect(() => {
    initUsuarios(results?.token);
  }, [results?.token]);

  const usuario = useSelector(({ usuarios }) =>
    usuarios.find(({ id_usuario }) => id_usuario == id));
  const usuarioData = useSelector(state => usuario
    ? state.alumnos.find(({ id_usuario }) => id_usuario == usuario?.id_usuario) ||
    state.contratistas.find(({ id_usuario }) => id_usuario == usuario?.id_usuario)
    : null
  );
  const alfabetizacion = useSelector(({ alfabetizaciones }) => usuarioData
    ? alfabetizaciones.find((alfabetizacion) => alfabetizacion?.id_alumno == usuarioData?.id_alumno ||
      alfabetizacion?.id_contratista == usuarioData?.id_contratista)
    : null
  );
  const tareas = useSelector(({ tareas }) => alfabetizacion
    ? tareas.filter(({ id_alfabetizacion }) => id_alfabetizacion == alfabetizacion?.id_alfabetizacion)
    : null
  );
  const tareasLabel = { 'alumno': 'Tareas asignadas', 'contratista': 'Tareas designadas' };

  const alumnoActions = useAlumnos();
  const contratistaActions = useContratistas();

  const handleSubmitUser = ({ target:{ edad, nombres, apellidos, nro_documento, telefono }}) => {
    if (usuario.rol == 'alumno') {
      alumnoActions.update(usuarioData.id_alumno, {
        edad: edad.value,
        nombres: nombres.value,
        apellidos: apellidos.value,
        nro_documento: nro_documento.value,
        telefono: telefono.value,
      }, results?.token);
    }

    if (usuario.rol == 'contratista') {
      contratistaActions.update(usuarioData.id_contratista, {
        edad: edad.value,
        nombres: nombres.value,
        apellidos: apellidos.value,
        nro_documento: nro_documento.value,
        telefono: telefono.value,
      }, results?.token);
    }
  };

  return (
    <div className={styles.AlumnoProfile}>
      <button className={styles.ReturnButton} onClick={() => navigate(-1)} >
        <AiOutlineArrowLeft />
        <span>Atras</span>
      </button>
      {usuarioData ? (
        <>
          <Profile usuario={{ ...usuario, ...usuarioData }} handleEdit={() => setEditingUser(true)} />
          <section className={styles.More}>
            <header className={styles.TareasHeader}>
              {tareas && (
                <>
                  <h2>{tareasLabel[usuario.rol]}</h2>
                  <span>{tareas.length}</span>
                </>
              )}
            </header>
            {tareas
              ? <TareasList tareas={tareas} />
              : <p className={styles.NoTareas}>No hay tareas</p>
            }
          </section>
        </>
      )
        : <p>No se encontró el usuario</p>
      }
      {editingUser && (
        <Form
          onClose={() => setEditingUser(false)}
          onSubmit={handleSubmitUser}
          titulo={'Editando usuario'}
          submitButtonLabel='Aceptar'
        >
          <SetUsuario usuario={{ ...usuario, ...usuarioData }} />
        </Form>
      )}
    </div>
  );
};

export default memo(UsuarioProfile);
