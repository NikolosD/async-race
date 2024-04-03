import React from 'react'

import { AsyncRace } from '@/features/AsyncRace'
import ReactDOM from 'react-dom/client'

import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AsyncRace />
  </React.StrictMode>
)
