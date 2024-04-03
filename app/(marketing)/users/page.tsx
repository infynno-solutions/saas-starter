'use client'
import { Input } from '@/components/ui/input'
import UsersTable from '@/components/users/user-table'
import React, { useState } from 'react'

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Users</h1>
          <p>Manage all the users</p>
        </div>
        <Input
          placeholder="Search user"
          className="w-64"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <UsersTable searchTerm={searchTerm} />
    </div>
  )
}

export default Users
