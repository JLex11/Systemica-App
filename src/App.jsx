import { lazy, Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import Aside from './components/Aside'
import Header from './components/Header'
import Loader from './components/Loader'
import NotificationsList from './components/NotificationsList'
import { useAlfabetizaciones } from './hooks/useAlfabetizaciones'
import { useAlumnos } from './hooks/useAlumnos'
import { useContratistas } from './hooks/useContratistas'
import { useEstablecimientos } from './hooks/useEstablecimientos'
import { useInstituciones } from './hooks/useInstituciones'
import { useTareas } from './hooks/useTareas'
import { useUsuarios } from './hooks/useUsuarios'
const AgregarRol = lazy(()=> import('./pages/AgregarRol'))
const Establecimientos = lazy(()=> import('./pages/Establecimientos'))
const Instituciones = lazy(()=> import('./pages/Instituciones'))
const Reportes = lazy(()=> import('./pages/Reportes'))
const Alumnos = lazy(()=> import('./pages/Alumnos'))
const Contratistas = lazy(()=> import('./pages/Contratistas'))
const Inicio = lazy(()=> import('./pages/Inicio'))
const Login = lazy(()=> import('./pages/Login'))
const Proyectos = lazy(()=> import('./pages/Proyectos'))
const Register = lazy(()=> import('./pages/Register'))
const Tareas = lazy(()=> import('./pages/Tareas'))
const UsuarioProfile = lazy(() => import('./pages/UsuarioProfile'))

function App() {
  const token = useSelector(({ user }) => user?.results?.token)

  const { initAssociated: initAlumnos } = useAlumnos()
  const { init: initContratistas } = useContratistas()
  const { init: initEstablecimientos } = useEstablecimientos()
  const { init: initInstituciones } = useInstituciones()
  const { init: initAlfabetizaciones } = useAlfabetizaciones()
  const { init: initTareas } = useTareas()
  const { init: initUsuarios } = useUsuarios()

  useEffect(() => {
    if (!token) return
    initAlumnos([ 'cursos', 'usuarios.alumnos'], token)
    initContratistas(token)
    initEstablecimientos(token)
    initInstituciones(token)
    initAlfabetizaciones(token)
    initTareas(token)
    initUsuarios(token)
  }, [token])

  return (
    <div className={styles.App}>
      <Header />
      <main className={styles.Main}>
        <Aside />
        <div className={styles.Content}>
          {token ? <PrivateRoutes /> : <PublicRoutes />}
        </div>
      </main>
      <NotificationsList />
    </div>
  )
}

export default App

const PrivateRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={'/inicio'} element={<Inicio />} />
        <Route path={'/alumnos'} element={<Alumnos />} />
        <Route path={'/contratistas'} element={<Contratistas />} />
        <Route path={'/usuarios/:id/*'} element={<UsuarioProfile />} />
        <Route path={'/tareas'} element={<Tareas />} />
        <Route path={'/tareas/:id'} element={<Tareas />} />
        <Route path={'/proyectos'} element={<Proyectos />} />
        <Route path={'/proyectos/:id'} element={<Proyectos />} />
        <Route path={'/establecimientos'} element={<Establecimientos />} />
        <Route path={'/establecimientos/:id'} element={<Establecimientos />} />
        <Route path={'/instituciones'} element={<Instituciones />} />
        <Route path={'/instituciones/:id'} element={<Instituciones />} />
        <Route path={'/reportes/:id'} element={<Reportes />} />
        <Route path={'*'} element={<Navigate to={'/inicio'} />} />
      </Routes>
    </Suspense>
  )
}

const PublicRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path={'/agregar/:rol'} element={<AgregarRol />} />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  </Suspense>
)
