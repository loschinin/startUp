import Persons from './pages/Persons'
import Person from './pages/Person'

export const authRoutes = [
  {
    path: '/:id',
    Component: Person,
  },
]

export const publicRoutes = [
  {
    path: '/',
    Component: Persons,
  },
]
