import { Cars } from '@/common/components/cars/cars'
import { GarageFooter } from '@/common/components/garage/garageFooter/garageFooter'
import { Settings } from '@/common/components/garage/settings/settings'
import { Menu } from '@/common/components/menu/menu'

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
