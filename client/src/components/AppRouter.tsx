import React, { Dispatch, FC, SetStateAction } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { PersonType } from '../App'
import EditPerson from '../pages/EditPerson'
import NewPerson from '../pages/NewPerson'
import Persons from '../pages/Persons'

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
              <Persons
                userId={userId}
                persons={persons}
                setPersons={setPersons}
              />
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
          <Route exact key={'/:id'} path={'/:id'}>
            <EditPerson
              userId={userId}
              persons={persons}
              setPersons={setPersons}
              setWarnings={setWarnings}
            />
          </Route>
          <Redirect to={'/'} />
        </Switch>
      )}
      <Route
        key={'/'}
        path={'/'}
        render={() => <Persons persons={persons} setPersons={setPersons} />}
        exact
      />
      <Redirect to={'/'} />
    </Switch>
  )
}

export default AppRouter
