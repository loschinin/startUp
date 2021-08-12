import React, { Dispatch, FC, SetStateAction } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { publicRoutes } from '../routes'
import MyPersons from '../pages/MyPersons'
import { PersonType } from '../App'
import Person from '../pages/Person'

const AppRouter: FC<{
  isAuth: boolean
  userId: number | null
  persons: { count: number; rows: PersonType[] }
  setPersons: Dispatch<SetStateAction<{ count: number; rows: PersonType[] }>>
  nextPage: number
  isMorePages: boolean
  setNextPage: Dispatch<SetStateAction<number>>
}> = ({
  isAuth,
  userId,
  persons,
  setPersons,
  nextPage,
  setNextPage,
  isMorePages,
}) => {
  //console.log('au:', isAuth)

  return (
    <Switch>
      {isAuth && userId && (
        <Switch>
          <Route
            key={'/'}
            path={'/'}
            render={() => (
              <MyPersons
                userId={userId}
                persons={persons}
                setPersons={setPersons}
                nextPage={nextPage}
                setNextPage={setNextPage}
                isMorePages={isMorePages}
              />
            )}
            exact
          />
          <Route
            key={'/:id'}
            path={'/:id'}
            render={() => <Person userId={userId} />}
            exact
          />
        </Switch>
      )}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={'/'} />
    </Switch>
  )
}

export default AppRouter
