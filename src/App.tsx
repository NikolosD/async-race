import { Route, Routes } from 'react-router-dom'

import { NotFoundPage } from '@/components/notfoundpage'
import { Winners } from '@/components/winners/winners'
import { AsyncRace } from '@/features/AsyncRace'

function App() {
  return (
    <>
      <Routes>
        <Route element={<AsyncRace />} path={'/'} />
        <Route element={<AsyncRace />} path={'/garage'} />
        <Route element={<Winners />} path={'/winners'} />
        <Route element={<NotFoundPage />} path={'*'} />
      </Routes>
    </>
  )
}

export default App
