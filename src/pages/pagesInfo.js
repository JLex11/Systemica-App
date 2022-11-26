import { BsListTask, BsPeopleFill } from 'react-icons/bs';
import { FaBuilding, FaProjectDiagram } from 'react-icons/fa';
import { GoHome } from 'react-icons/go';
import { MdWork } from 'react-icons/md';

export const pages = [
  {
    id: 1,
    title: 'Inicio',
    path: '/inicio',
    icon: GoHome,
    key: 'alt+1',
  },
  {
    id: 2,
    title: 'Alumnos',
    path: '/alumnos',
    icon: BsPeopleFill,
    key: 'alt+2',
  },
  {
    id: 3,
    title: 'Contratistas',
    path: '/contratistas',
    icon: MdWork,
    key: 'alt+3',
  },
  {
    id: 4,
    title: 'Establecimientos',
    path: '/establecimientos',
    icon: FaBuilding,
    key: 'alt+4',
  },
  {
    id: 5,
    title: 'Proyectos',
    path: '/proyectos',
    icon: FaProjectDiagram,
    key: 'alt+5',
  },
  {
    id: 6,
    title: 'Tareas',
    path: '/tareas',
    icon: BsListTask,
    key: 'alt+6',
  }
];
