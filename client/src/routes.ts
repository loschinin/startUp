import Persons from './pages/Persons'
import Person from './pages/Person'
import MyPersons from './pages/MyPersons'
//import NewPerson from './pages/NewPerson'

export const authRoutes = [
  {
    path: '/:id',
    Component: Person,
  },
  {
    path: '/',
    Component: MyPersons,
  },
  /*{
    path: '/new',
    Component: NewPerson,
  },*/
]

export const publicRoutes = [
  {
    path: '/',
    Component: Persons,
  },
]
