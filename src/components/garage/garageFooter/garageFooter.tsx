import s from './garageFooter.module.scss'

type Props = {}

export const GarageFooter = ({}: Props) => {
  return (
    <div className={s.container}>
      <div>Garage</div>
      <div>Pagination</div>
    </div>
  )
}
