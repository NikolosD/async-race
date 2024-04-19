import { useEffect } from 'react'
import { useSelector } from 'react-redux'

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
  const cars = useSelector((state: RootState) => state.cars)
  const pageSize = useSelector((state: RootState) => state.winners.pageSize)

  useEffect(() => {
    dispatch(fetchWinners())
    dispatch(fetchCars())
  }, [dispatch])

  const dataSource = winners.winners.map(winner => ({
    ...winner,
    ...cars.cars[winner.id - 1],
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
      render: record => <IoCarSport color={record.color} size={40} />,
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
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: pageSize,
        }}
      />
    </>
  )
}
