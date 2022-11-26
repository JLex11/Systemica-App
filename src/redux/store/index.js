import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { alfabetizacionesReducer } from '../reducers/Alfabetizaciones';
import { alumnosReducer } from '../reducers/Alumnos';
import { contratistasReducer } from '../reducers/Contratistas';
import { cursosReducer } from '../reducers/Cursos';
import { establecimientosReducer } from '../reducers/Establecimientos';
import { notificationsReducer } from '../reducers/Notifications';
import { tareasReducer } from '../reducers/Tareas';
import { userReducer } from '../reducers/User';
import { usuariosReducer } from '../reducers/Usuarios';

const rooReducer = combineReducers({
  alumnos: alumnosReducer,
  contratistas: contratistasReducer,
  tareas: tareasReducer,
  alfabetizaciones: alfabetizacionesReducer,
  usuarios: usuariosReducer,
  user: userReducer,
  notifications: notificationsReducer,
  establecimientos: establecimientosReducer,
  cursos: cursosReducer
});

export const store = configureStore({
  reducer: rooReducer,
  middleware: [thunk],
});