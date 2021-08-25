import React, { Dispatch, FC, SetStateAction } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { publicRoutes } from '../routes'
import MyPersons from '../pages/MyPersons'
import { PersonType } from '../App'
import EditPerson from '../pages/EditPerson'
import NewPerson from '../pages/NewPerson'
import { RecoilRoot } from 'recoil'

const AppRouter: FC<{
  isAuth: boolean
  userId: number | null
  persons: { count: number; rows: PersonType[] }
  setPersons: Dispatch<SetStateAction<{ count: number; rows: PersonType[] }>>
  setWarnings: Dispatch<SetStateAction<string>>
}> = ({ isAuth, userId, persons, setPersons, setWarnings }) => {
  //console.log('au:', isAuth)

  return (
    <Switch>
      {isAuth && userId && (
        <Switch>
          <Route
            key={'/'}
            path={'/'}
            render={() => (
              <RecoilRoot>
                <MyPersons
                  userId={userId}
                  persons={persons}
                  setPersons={setPersons}
                />
              </RecoilRoot>
            )}
            exact
          />
          <Route
            key={'/new'}
            path={'/new'}
            render={() => (
              <NewPerson
                userId={userId}
                persons={persons}
                setPersons={setPersons}
                setWarnings={setWarnings}
              />
            )}
            exact
          />
          <Route
            key={'/:id'}
            path={'/:id'}
            render={() => (
              <EditPerson
                userId={userId}
                persons={persons}
                setPersons={setPersons}
                setWarnings={setWarnings}
              />
            )}
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
