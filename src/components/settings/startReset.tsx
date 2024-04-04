import { Button } from 'antd'

import s from '@/features/AsyncRace/asyncRace.module.scss'

const StartReset = () => {
  return (
    <>
      <div className={s.startReset}>
        <Button type={'primary'}>Race</Button>
        <Button danger type={'primary'}>
          Reset
        </Button>
      </div>
    </>
  )
}

export default StartReset
