import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { CustomPagination } from '@/common/components/garage/garageFooter/pagination/customPagination'

import s from './garageFooter.module.scss'

type Props = {}

export const GarageFooter = ({}: Props) => {
  const carCount = useSelector((state: RootState) => state.cars.cars.length)

  return (
    <div className={s.container}>
      <div>Garage ({carCount})</div>
      <CustomPagination />
    </div>
  )
}
