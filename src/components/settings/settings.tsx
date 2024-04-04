import { CustomInput } from '@/components/settings/customInput'
import StartReset from '@/components/settings/startReset'
import { Button } from 'antd'

import s from '@/features/AsyncRace/asyncRace.module.scss'

export const Settings = () => {
  return (
    <>
      <div className={s.settings}>
        <StartReset />
        <CustomInput name={'Create'} placeholder={'TYPE CAR BRAND'} />
        <CustomInput name={'Update'} placeholder={'TYPE CAR BRAND'} />
        <Button type={'primary'}>Generate Cars</Button>
      </div>
    </>
  )
}
