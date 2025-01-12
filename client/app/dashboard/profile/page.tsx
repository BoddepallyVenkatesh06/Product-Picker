'use client'


import React, { useState } from "react";
import { useSelector } from 'react-redux'
import SidebarLayout from '../../components/sidebar/SidebarLayout'



const page = () => {

  const { user } = useSelector((state: any) => state.auth)



  return (
    <div>
      <div className="">


        <SidebarLayout userRole={user?.accountType}>
          <div className='min-h-screen flex-center flex-col w-full text-black dark:text-white'>
            <h3 className='text-center text-5xl font-semibold'>
              This is a Profile Page
            </h3>

            <div className='mt-10 p-6 font-medium bg-black/5 dark:bg-white/10 rounded-xl text-black dark:text-white'>
              <p>User Name =  {user?.name}</p>
              <p>User Email =  {user?.email}</p>
              <p>Account Type =  {user?.accountType}</p>

            </div>
          </div>

        </SidebarLayout>





      </div>
    </div>
  )
}

export default page