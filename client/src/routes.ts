import Persons from './pages/Persons'
import Person from './pages/Person'
import MyPersons from './pages/MyPersons'

export const authRoutes = [
  {
    path: '/:id',
    Component: Person,
  },
  {
    path: '/',
    Component: MyPersons,
  },
]

export const publicRoutes = [
  {
    path: '/',
    Component: Persons,
  },
]
