import { Cars } from '@/components/cars/cars'
import { GarageFooter } from '@/components/garage/garageFooter/garageFooter'
import { Settings } from '@/components/garage/settings/settings'
import { Menu } from '@/components/menu/menu'

import s from './garage.module.scss'
export function Garage() {
  return (
    <>
      <div className={s.container}>
        <div className={s.container}>
          <Menu />
          <Settings />
          <Cars />
          <GarageFooter />
        </div>
      </div>
    </>
  )
}
