import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout.jsx'
import TodoList from './components/TodoList.jsx'

// MODES
import Tasks from './components/modeComps/Tasks.jsx'
import FlaggedEmail from './components/modeComps/FlaggedEmail.jsx'
import AssignedToMe from './components/modeComps/AssignedToMe.jsx'
import Planned from './components/modeComps/Planned.jsx'
import Important from './components/modeComps/Important.jsx'
import MyDay from './components/modeComps/MyDay.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}  >
      <Route  path='mode' element={<MainLayout />} >
        <Route index path='tasks' element={<Tasks />} />
        <Route path='flagged-email' element={<FlaggedEmail />} />
        <Route path='assigned-to-me' element={<AssignedToMe />} />
        <Route path='planned' element={<Planned />} />
        <Route path='important' element={<Important/>} />
        <Route path='my-day' element={<MyDay />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} >
      <App />
    </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
