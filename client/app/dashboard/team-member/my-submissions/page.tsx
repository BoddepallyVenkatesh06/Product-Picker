'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner';
import SidebarLayout from '../../../components/sidebar/SidebarLayout'
import { useGetMySubmissionsQuery } from '../../../redux/features/review/reviewApi';
import Link from "next/link"
import Image from "next/image"
import AdminProtected from '../../../hooks/adminProtected'
import { LoadingRequestSkeleton } from "../../../utils/LoadingSkeleton"
import { IRequest } from "../../../types/type"
import { formatDate } from "../../../../lib/formatDate"


const PendingRequestPage = () => {
  const [mySubmissions, setMySubmissions] = useState([]);
  const { user } = useSelector((state: any) => state.auth)
  const { data, isSuccess, error, isLoading } = useGetMySubmissionsQuery({})


  // console.log('mySubmissions = ', mySubmissions)
  useEffect(() => {
    if (isSuccess) {
      toast.success("All pending requests fetched Successfully")
      setMySubmissions(data.allSubmissions)
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error])

  return (
    <SidebarLayout userRole={user?.accountType}>

      <div className='min-h-screen flex-col w-full text-black dark:text-white p-5'>
        <h1 className="text-2xl font-bold mb-6">My Submissions : {mySubmissions?.length}</h1>


        {
          isLoading ? (
            <div className="w-full grid grid-cols-1 gap-4">
              <LoadingRequestSkeleton />
              <LoadingRequestSkeleton />
              <LoadingRequestSkeleton />
            </div>
          ) : !isLoading && !mySubmissions ? (
            <div className='text-3xl p-5 text-center rounded-xl text-black dark:text-white bg-black/10 dark:bg-white/10 '>
              No submissions have been made yet...!
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {mySubmissions.map((request: IRequest, index: number) => (
                <div
                  key={request._id}
                  className="block p-5 bg-black/5 dark:bg-white/5 shadow-md hover:shadow-lg rounded-xl transition-shadow duration-200"
                >
                  <div className="flex flex-col justify-between gap-8 relative">
                    <div className='absolute flex-center -top-2 -right-2 bg-green-600 w-10 h-10 p-3 rounded-full '>
                      <p className='text-black dark:text-white font-bold text-xl'>{index + 1}</p>
                    </div>
                    <Link
                        href={`/product/${request?.productId?._id}`} 
                        className="mb-4 flex justify-between gap-3 p-3 rounded-lg bg-black/10 hover:bg-black/15 dark:bg-white/10 dark:hover:bg-white/15 duration-200"
                     >
                      <div className='flex flex-col gap-3 p-3 w-[60%] '>
                        <p>Original Product</p>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          <p>Title :</p>
                          <span className='text-gray-900 dark:text-white/70'>{request?.productId?.title}</span>
                        </div>

                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          <p>Description :</p>
                          <span className='text-gray-900 text-sm dark:text-white/70'>{request?.productId?.description}</span>
                        </div>

                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          <p>Price :</p>
                          <span className='text-gray-900 text-sm dark:text-white/70'>{request?.productId?.price}</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p>Product Created Date:</p>
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {request?.productId?.createdAt ? formatDate(request?.productId?.createdAt) : 'Date not available'}
                          </span>
                        </div>
                      </div>

                      <div className='w-[30%] h-60 flex-center '>
                        <Image
                          src={request?.productId?.image ? request?.productId?.image : '/assets/images/not-available.jpg'}
                          width={230}
                          height={230}
                          className='w-full h-full object-content rounded-xl '
                          alt={`${request?.productId?.title}`}
                        />
                      </div>
                    </Link>

                    <div className='flex flex-col gap-5 '>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        <p> Reviewed by :</p>
                        <span className='text-gray-900 text-sm text-md dark:text-white/70'>{request.reviewedBy?.name || 'Not yet reviewed'}</span>
                      </div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {request.reviewedBy?.email &&
                          <>
                            <p>Email :</p>
                            <span className='text-gray-900 text-sm text-md dark:text-white/70'>{request.reviewedBy?.email || ''}</span>
                          </>
                        }
                      </div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        <p>Review checked Date:</p>
                        <span className="text-gray-900 text-sm text-md dark:text-white/70">
                          {request?.updatedAt ? formatDate(request?.updatedAt) : 'Date not available'}
                        </span>
                      </div>
                    </div>

                    {/* Requested To update product details */}
                    <div className="">
                      {/* <h3 className='text-xl font-semibold'>Requested To update product details</h3>
                        {Object.entries(request?.updatedFields).map(([key, value]) => (
                          <div key={key} className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{key.replace(/_/g, ' ')}</h3>
                            <p className="text-gray-900 text-sm dark:text-white/70">{value}</p>
                          </div>
                        ))} */}
                      <h3 className='text-xl font-semibold'>Requested To update product details</h3>
                      {Object.entries(request?.updatedFields).map(([key, value]) => (
                        <div key={key} className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{key.replace(/_/g, ' ')}</h3>
                          {typeof value === 'object' && value !== null ? (
                            // Handle object rendering (e.g., image, JSON, etc.)
                            Array.isArray(value) ? (
                              <ul className="text-gray-900 text-sm dark:text-white/70">
                                {value.map((item, index) => (
                                  <li key={index}>{typeof item === 'object' ? JSON.stringify(item) : item}</li>
                                ))}
                              </ul>
                            ) : (
                              <pre className="text-gray-900 text-sm dark:text-white/70">
                                {JSON.stringify(value, null, 2)}
                              </pre>
                            )
                          ) : (
                            // Render as string or number
                            <p className="text-gray-900 text-sm dark:text-white/70">{value}</p>
                          )}
                        </div>
                      ))}

                    </div>

                    {/* status */}
                    <div className="flex items-center gap-2">
                      Status :
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${request.status === 'pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : request.status === 'approved'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                        }`}>
                        {request.status}
                      </span>
                    </div>

                    {/* comment from Admin */}
                    {
                      request?.comment && <div className=''>
                        <h3 className='text-xl font-semibold'>Comment from Admin</h3>
                        <p className="text-gray-900 text-sm dark:text-white/70 whitespace-pre-wrap">
                          {request?.comment}
                        </p>
                      </div>
                    }
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </SidebarLayout>
  );
};

export default PendingRequestPage;
