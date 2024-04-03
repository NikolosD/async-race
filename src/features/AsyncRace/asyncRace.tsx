import { Button, ColorPicker, Input } from 'antd'

import s from './asyncRace.module.scss'
export function AsyncRace() {
  return (
    <>
      <div className={s.container}>
        <div className={s.menu}>
          <Button type={'primary'}>Garage</Button>
          <Button danger type={'primary'}>
            Winners
          </Button>
        </div>
        <div className={s.settings}>
          <div className={s.startReset}>
            <Button type={'primary'}>Race</Button>
            <Button danger type={'primary'}>
              Reset
            </Button>
          </div>
          <div className={s.form}>
            <Input />
            <ColorPicker />
            <Button danger type={'primary'}>
              Create
            </Button>
          </div>
          <div className={s.form}>
            <Input />
            <ColorPicker />
            <Button danger type={'primary'}>
              Update
            </Button>
          </div>
          <div>
            <Button>Generate Cars</Button>
          </div>
        </div>
      </div>
    </>
  )
}
