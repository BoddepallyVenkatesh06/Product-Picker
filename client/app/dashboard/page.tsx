'use client'


import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import Image from 'next/image';
import { toast } from 'sonner';
import SidebarLayout from '../components/sidebar/SidebarLayout'
import { useGetProfileStatsQuery } from "../redux/features/review/reviewApi"
import { IProfileStats } from "../types/type"


const page = () => {

  const { user, token } = useSelector((state: any) => state.auth)
  const [profileStats, setProfileStats] = useState<IProfileStats | null>(null);
  const { data, isSuccess, error, isLoading } = useGetProfileStatsQuery({})

  // console.log("profileStats = ", profileStats)

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile stats fetched Successfully")
      setProfileStats(data.stats)
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error])


  // useEffect(()=>{
  //   if(!user || !token) {
  //   router.push("/")
  //   setOpen(true)
  //   setRoute("auth")
  //   }
  //     },[user, token])

  //     console.log("user from dashborad = ", user)
  //     console.log("token from dashborad = ", token)

  return (
    <div>

      <SidebarLayout userRole={user?.accountType}>
        <div className='min-h-screen flex-center flex-col w-full text-black dark:text-white'>
          <h3 className='text-center text-5xl font-semibold mb-5 '>
            This is a <span className='text-green-600 font-semibold'>{user?.accountType}</span> Dashboard Page
          </h3>


          {
            isLoading ? (
              <div className='flex gap-5 justify-between bg-gray-800 p-4 rounded-2xl '>
                <div className="h-[150px] w-[150px] rounded-2xl skeleton"></div>
                <div className="h-[150px] w-[150px] rounded-2xl skeleton"></div>
                <div className="h-[150px] w-[150px] rounded-2xl skeleton"></div>
                <div className="h-[150px] w-[150px] rounded-2xl skeleton"></div>

              </div>
            )
              :
              !isLoading && !profileStats ? (
                <div className='text-3xl p-5 text-center rounded-xl text-black dark:text-white bg-black/10 dark:bg-white/10 '>
                  There is no Profile data...!
                </div>
              )
                :
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <div className="flex-center flex-col gap-4">
                      <div className='bg-black/10 dark:bg-white/10 p-3 rounded-full'>
                        <Image
                          src='/assets/icons/total-icon.png'
                          width={60}
                          height={60}
                          alt="Icon"
                          className="w-14 h-14 object-contain"
                        />
                      </div>
                      <div className=" flex-center flex-col">
                        <h4 className="text-xl text-gray-500 dark:text-gray-400">Total Requests</h4>
                        <p className="text-2xl font-semibold">{profileStats?.totalRequests}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <div className="flex-center flex-col gap-4">
                      <div className='bg-black/10 dark:bg-white/10 p-3 rounded-full'>
                        <Image
                          src='/assets/icons/approval-icon.png'
                          width={60}
                          height={60}
                          alt="Icon"
                          className="w-14 h-14 object-contain"
                        />
                      </div>
                      <div className=" flex-center flex-col">
                        <h4 className="text-gray-500 dark:text-gray-400">Approved Requests</h4>
                        <p className="text-2xl font-semibold">{profileStats?.approvedRequests}</p>
                      </div>
                    </div>


                  </div>

                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <div className="flex-center flex-col gap-4">
                      <div className='bg-black/10 dark:bg-white/10 p-3 rounded-full'>
                        <Image
                          src='/assets/icons/rejected-icon.png'
                          width={60}
                          height={60}
                          alt="Icon"
                          className="w-14 h-14 object-contain"
                        />
                      </div>
                      <div className=" flex-center flex-col">
                        <h4 className="text-gray-500 dark:text-gray-400">Rejected Requests</h4>
                        <p className="text-2xl font-semibold">{profileStats?.rejectedRequests}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <div className="flex-center flex-col gap-4">
                      <div className='bg-black/10 dark:bg-white/10 p-3 rounded-full'>
                        <Image
                          src='/assets/icons/pending-icon.png'
                          width={260}
                          height={260}
                          alt="Icon"
                          className="w-14 h-14 object-contain"
                        />
                      </div>
                      <div className=" flex-center flex-col">
                        <h4 className="text-gray-500 dark:text-gray-400">Pending Requests</h4>
                        <p className="text-2xl font-semibold">{profileStats?.pendingRequests}</p>
                      </div>
                    </div>
                  </div>
                </div>

          }
        </div>
      </SidebarLayout>

    </div>
  )
}

export default page