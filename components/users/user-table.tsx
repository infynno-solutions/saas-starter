'use client'

import React, { useMemo, useState } from 'react'
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

const UsersTable = () => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 3,
  })
  const [sortBy, setSortBy] = useState('')

  const { data: apiData } = useFetchUsers({
    pageNo: pagination.pageIndex + 1,
    perPage: pagination.pageSize,
    sortBy,
  })

  const userData = [...(apiData?.data?.users ?? [])]
  const totalRecords = apiData?.data.totalRecords ?? 0

  const columns = useMemo<ColumnDef<UserInterface>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'emailVerified',
        header: 'Email verified',
        cell: (info) => info.getValue(),
      },
    ],
    [userData],
  )

  const table = useReactTable({
    columns,
    data: userData,
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-4 py-2 text-start">
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
                  : undefined
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
                  ? undefined
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
