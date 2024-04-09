import { Route, Routes } from 'react-router-dom'

import { NotFoundPage } from '@/common/components/notfoundpage'
import { Winners } from '@/common/components/winners/winners'
import { Garage } from '@/features/garage/garage'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Garage />} path={'/'} />
        <Route element={<Garage />} path={'/garage'} />
        <Route element={<Winners />} path={'/winners'} />
        <Route element={<NotFoundPage />} path={'*'} />
      </Routes>
    </>
  )
}

export default App
