'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner';
import SidebarLayout from '../../../components/sidebar/SidebarLayout'
import { usePendingRequestsQuery } from '../../../redux/features/review/reviewApi';
import Link from "next/link"
import AdminProtected from '../../../hooks/adminProtected'
import {LoadingRequestSkeleton} from "../../../utils/LoadingSkeleton"
import { IRequest } from "../../../types/type"
import {formatDate} from '../../../../lib/formatDate'

const PendingRequestPage = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const { user } = useSelector((state: any) => state.auth)
  const { data, isSuccess, error, isLoading } = usePendingRequestsQuery({})



  useEffect(() => {
    if (isSuccess) {
      toast.success("All pending requests fetched Successfully")
      setPendingRequests(data.pendingReviews)
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
      <AdminProtected>
        <div className='min-h-screen flex-col w-full text-black dark:text-white p-5'>
          <h1 className="text-2xl font-bold mb-6">All Pending Requests : {pendingRequests?.length} </h1>


          {
          isLoading ? (
            <div className="w-full grid grid-cols-1 gap-4">
              <LoadingRequestSkeleton />
              <LoadingRequestSkeleton />
              <LoadingRequestSkeleton />
            </div>
          ) : !isLoading && !pendingRequests ? (
            <div className='text-3xl p-5 text-center rounded-xl text-black dark:text-white bg-black/10 dark:bg-white/10 '>
              There are no pending Requests...!
              </div>
          ) : (
            <ul className="space-y-4">
              {pendingRequests.map((request: IRequest) => (
                <Link
                  key={request?._id}
                  href={`/dashboard/admin/pending-requests/${request._id}`}
                  className="block p-5 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg rounded-lg transition-shadow duration-300"
                >
                  <li className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {request?.productId?.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Submitted by: <span className="font-medium text-gray-800 dark:text-gray-200">{request?.submittedBy.name}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Email: <span className="font-medium text-gray-800 dark:text-gray-200">{request?.submittedBy.email}</span>
                      </p>
                    </div>

                    <div className='flex gap-5 items-center '>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Reviewed by: <span className="font-medium text-gray-800 dark:text-gray-200">{request.reviewedBy?.name || 'Not yet reviewed'}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Email: <span className="font-medium text-gray-800 dark:text-gray-200">{request.reviewedBy?.email || 'Not yet reviewed'}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Date: 
                            <span className="font-medium text-gray-800 dark:text-gray-200">
                              {request?.createdAt ? formatDate(request?.createdAt) : 'Not yet reviewed'}
                           </span>
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${request?.status === 'pending'
                            ? 'bg-yellow-200 text-yellow-800'
                            : request?.status === 'approved'
                              ? 'bg-green-200 text-green-800'
                              : 'bg-red-200 text-red-800'
                          }`}>
                          {request?.status}
                        </span>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )
        }
        </div>
      </AdminProtected>
    </SidebarLayout>
  );
};

export default PendingRequestPage;
