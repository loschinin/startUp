import React, { FC } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'

const AppRouter: FC<{
  isAuth: boolean
}> = ({ isAuth }) => {
  console.log('au:', isAuth)
  return (
    <Switch>
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={'/'} />
    </Switch>
  )
}

export default AppRouter
