import { Car } from '@/components/cars/Car/car'

export const Cars = () => {
  // let carElement = state.dialogsData.map((c:DialogData) => <Car id={d.id} name={d.name} key={d.id}/>  )

  return (
    <>
      <div>
        <Car />
      </div>
    </>
  )
}
