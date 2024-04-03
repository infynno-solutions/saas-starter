'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useFetchUsers } from '@/hooks/user/use-fetch-users'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'
import { FaSortDown, FaSortUp } from 'react-icons/fa'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { CgCloseO } from 'react-icons/cg'
import { debounce } from 'lodash'

const UsersTable = ({ searchTerm }: { searchTerm: string }) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sortBy, setSortBy] = useState('')

  const {
    data: apiData,
    isLoading,
    refetch,
  } = useFetchUsers({
    pageNo: pagination.pageIndex + 1,
    perPage: pagination.pageSize,
    sortBy,
    search: searchTerm,
  })

  const userData = [...(apiData?.data?.users ?? [])]
  const totalRecords = apiData?.data.totalRecords ?? 0

  const columns = useMemo<ColumnDef<UserInterface>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) =>
          isLoading ? (
            <div className="h-5 w-40 animate-pulse rounded-md bg-secondary" />
          ) : (
            info.getValue()
          ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) =>
          isLoading ? (
            <div className="h-5 w-56 animate-pulse rounded-md bg-secondary" />
          ) : (
            info.getValue()
          ),
      },
      {
        accessorKey: 'emailVerified',
        header: 'Email verified',
        cell: (info) => {
          return (
            <div className="flex items-center justify-center">
              {isLoading ? (
                <div className="h-5 w-20 animate-pulse rounded-md bg-secondary" />
              ) : info.getValue() ? (
                <FaRegCircleCheck className="h-4 w-4 text-green-500" />
              ) : (
                <CgCloseO className="h-4 w-4 text-red-500" />
              )}
            </div>
          )
        },
      },
    ],
    [isLoading, userData],
  )

  const table = useReactTable({
    columns,
    data: isLoading ? Array(5).fill({}) : userData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    autoResetPageIndex: false,
  })

  const handleSearch = useCallback(
    debounce(() => refetch(), 1500),
    [searchTerm],
  )

  useEffect(() => {
    handleSearch()
    return () => handleSearch.cancel()
  }, [searchTerm])

  return (
    <>
      <table className="w-full !rounded-lg border !p-2 text-start">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border py-2">
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    <span className="flex items-center justify-center gap-1  ">
                      {' '}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: <FaSortUp />,
                        desc: <FaSortDown />,
                      }[header.column.getIsSorted() as string] ?? (
                        <div className="invisible h-4 w-4" />
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getCoreRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border px-4 py-2 text-start text-sm"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                pagination.pageIndex === 0
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
              onClick={() => {
                setPagination({
                  pageIndex: pagination.pageIndex - 1,
                  pageSize: pagination.pageSize,
                })
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={
                pagination.pageIndex < totalRecords / pagination.pageSize - 1
                  ? 'cursor-pointer'
                  : 'pointer-events-none opacity-50'
              }
              onClick={() => {
                setPagination({
                  pageIndex: pagination.pageIndex + 1,
                  pageSize: pagination.pageSize,
                })
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}

export default UsersTable
