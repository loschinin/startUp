import React, { FC, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'

const AppRouter: FC<{ isAuth: boolean }> = ({ isAuth }) => {
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
