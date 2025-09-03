import { useState } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import store from './Store/Store'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Outlet, RouterProvider } from 'react-router-dom'
import { Addpost, Allpost, EditPost, Home, Login, Post, SignUp } from './Pages/index'
import { Layout } from './Component/Index'
import SessionLoader from './Component/SeesionLoadder'
const route = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },

        {
          path: '/sign-up',
          element: <SignUp />
        },
        {
          path: '/all-post',
          element: <Allpost />
        },

        {
          path: '/add-post',
          element: <Addpost />
        },

        {
          path: '/edit-post/:slug',
          element: <EditPost/>
        },

        {
          path: '/post/:slug',
          element: <Post />
        },
      ]
    }
  ]
)

function App() {
  return (
    <Provider store={store}>
      <SessionLoader>
        <RouterProvider router={route} />
      </SessionLoader>
    </Provider>
  )
}

export default App