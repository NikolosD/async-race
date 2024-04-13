import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { fetchCars } from '@/common/components/cars/cars.reducer'
import { Menu } from '@/common/components/menu/menu'
import { fetchWinners } from '@/common/components/winners/winners.reducer'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { Table, TableProps } from 'antd'
import { IoCarSport } from 'react-icons/io5'

type Props = {}

export const Winners = ({}: Props) => {
  const dispatch = useAppDispatch()
  const winners = useSelector((state: RootState) => state.winners)
  const cars = useSelector((state: RootState) => state.cars.cars)

  useEffect(() => {
    dispatch(fetchWinners())
    dispatch(fetchCars())
  }, [dispatch])

  const dataSource = winners.winners.map((winner, index) => ({
    ...winner,
    ...cars[index],
  }))

  const columns: TableProps['columns'] = [
    {
      dataIndex: 'id',
      key: 'id',
      title: 'ID',
    },
    {
      dataIndex: 'car',
      key: 'car',
      render: (text, record) => <IoCarSport color={record.color} size={40} />,
      title: 'Car',
    },
    {
      dataIndex: 'name',
      key: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'wins',
      key: 'wins',
      title: 'Wins',
    },
    {
      dataIndex: 'time',
      key: 'time',
      title: 'Best Time',
    },
  ]

  return (
    <>
      <Menu />
      <h1>WINNERS</h1>
      <Table columns={columns} dataSource={dataSource} />
    </>
  )
}
