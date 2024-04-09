import { Link } from 'react-router-dom'

import { Button } from 'antd'

import s from './menu.module.scss'

export const Menu = () => {
  return (
    <div className={s.menu}>
      <Button type={'primary'}>
        <Link className={s.link} to={'/garage'}>
          Garage
        </Link>
      </Button>
      <Button danger type={'primary'}>
        <Link className={s.link} to={'/winners'}>
          Winners
        </Link>
      </Button>
    </div>
  )
}
