import Persons from './pages/Persons'
import EditPerson from './pages/EditPerson'
import MyPersons from './pages/MyPersons'
//import NewPerson from './pages/NewPerson'

export const authRoutes = [
  {
    path: '/:id',
    Component: EditPerson,
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
