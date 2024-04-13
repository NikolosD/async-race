import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { setCurrentPage } from '@/common/components/cars/cars.reducer'
import { Pagination } from 'antd'

export const CustomPagination: React.FC = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector((state: RootState) => state.cars.currentPage)
  const pageSize = useSelector((state: RootState) => state.cars.pageSize)
  const totalCarsCount = useSelector((state: RootState) => state.cars.totalCarsCount)

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  return (
    <Pagination
      defaultCurrent={currentPage}
      onChange={handlePageChange}
      pageSize={pageSize}
      total={totalCarsCount}
    />
  )
}
