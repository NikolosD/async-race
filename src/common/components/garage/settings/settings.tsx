import { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { createCar, generateCars, updateCar } from '@/common/components/cars/cars.reducer'
import { CustomColorPickerComponent } from '@/common/components/customColorPicker/customColorPicker'
import { CustomTextInput } from '@/common/components/customTextInput/customTextInput'
import { StartReset } from '@/common/components/garage/settings/startReset'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { Button } from 'antd'

import s from '@/features/garage/garage.module.scss'

export const Settings = () => {
  const dispatch = useAppDispatch()

  const selectedCarId = useSelector((state: RootState) => state.cars.selectedCarId)
  const [createCarValue, setCreateCarValueValue] = useState('')
  const [updateCarValueValue, setUpdateCarValueValueValue] = useState('')
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [updateSelectedColor, setUpdateSelectedColor] = useState('#000000')

  const handleGenerateCars = () => {
    dispatch(generateCars())
  }

  const handleCreateCar = async () => {
    const randomId = Math.floor(Math.random() * 10000000)

    await dispatch(createCar({ color: selectedColor, id: randomId, name: createCarValue }))
    setCreateCarValueValue('')
    setSelectedColor('#000000')
  }

  const handleUpdateCar = async () => {
    await dispatch(
      updateCar({ color: updateSelectedColor, id: selectedCarId, name: updateCarValueValue })
    )
  }

  return (
    <div className={s.settings}>
      <StartReset />
      <div className={s.form}>
        <CustomTextInput
          onChange={value => setCreateCarValueValue(value)}
          placeholder={'TYPE CAR BRAND'}
          value={createCarValue}
        />
        <CustomColorPickerComponent
          color={selectedColor}
          defaultValue={'#000000'}
          onChange={color => setSelectedColor(color)}
        />
        <Button danger onClick={handleCreateCar} type={'primary'}>
          Create
        </Button>
      </div>
      <div className={s.form}>
        <CustomTextInput
          onChange={value => setUpdateCarValueValueValue(value)}
          placeholder={'TYPE CAR BRAND'}
          value={updateCarValueValue}
        />
        <CustomColorPickerComponent
          color={updateSelectedColor}
          defaultValue={'#000000'}
          onChange={color => setUpdateSelectedColor(color)}
        />
        <Button danger onClick={handleUpdateCar} type={'primary'}>
          Update
        </Button>
      </div>
      <Button onClick={handleGenerateCars} type={'primary'}>
        Generate Cars
      </Button>
    </div>
  )
}
