import { Button } from 'antd'

import s from '@/features/AsyncRace/asyncRace.module.scss'

export const Menu = () => {
  return (
    <>
      <div className={s.menu}>
        <Button type={'primary'}>Garage</Button>
        <Button danger type={'primary'}>
          Winners
        </Button>
      </div>
    </>
  )
}
