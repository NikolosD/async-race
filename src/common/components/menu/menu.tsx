import { Link } from 'react-router-dom'

import { Button } from 'antd'

import s from './menu.module.scss'

export const Menu = () => {
  return (
    <div className={s.menu}>
      <Link className={s.link} to={'/garage'}>
        <Button type={'primary'}>Garage</Button>
      </Link>

      <Link className={s.link} to={'/winners'}>
        <Button danger type={'primary'}>
          Winners
        </Button>
      </Link>
    </div>
  )
}
