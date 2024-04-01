import UsersTable from '@/components/users/user-table'
import React from 'react'

const Users = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p>Manage all the users</p>
      </div>
      <UsersTable />
    </div>
  )
}

export default Users
