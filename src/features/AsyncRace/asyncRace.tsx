import { Cars } from '@/components/cars/cars'
import { Garage } from '@/components/garage/garage'
import { Menu } from '@/components/settings/menu/menu'

import s from './asyncRace.module.scss'
export function AsyncRace() {
  return (
    <>
      <div className={s.container}>
        <div className={s.container}>
          <Menu />
          <Garage />
          <Cars />
        </div>
      </div>
    </>
  )
}
