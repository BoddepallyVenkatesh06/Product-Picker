'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image';
import { useSelector } from 'react-redux'
import SidebarLayout from '../../components/sidebar/SidebarLayout'
import { toast } from 'sonner';
import { useGetSingleProductQuery } from '../../redux/features/product/productApi';
import ProductForm from "../../utils/ProductForm"
import { ACCOUNT_TYPE } from '../../constants/account-types'
import { IProduct } from "../../types/type"


interface PageParams {
  product_id: string;
}


const page: React.FC<{ params: PageParams }> = ({ params: { product_id } }) => {
  const [product, setProduct] = useState<IProduct>();
  const { user } = useSelector((state: any) => state.auth)
  const { data, isSuccess, error, isLoading } = useGetSingleProductQuery({ product_id })



  useEffect(() => {
    if (isSuccess) {
      toast.success("Product details fetched Successfully")
      setProduct(data.product)
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
      <div className="min-h-screen flex-col w-full text-black dark:text-white p-5">
        {user?.accountType === ACCOUNT_TYPE.TEAM_MEMBER ? (
          <>
            <h1 className="text-2xl font-bold mb-6">Product Review</h1>
            <ProductForm type="Review" product={product} productId={product?._id} />
          </>
        ) : (
          // Show details for Admin
          <>
            <h1 className="text-2xl font-bold mb-6">Product Details</h1>

            <div className="">
              <div className="flex flex-col gap-5 bg-black/10 dark:bg-white/10 rounded-xl p-5">
                <div>
                  <h3 className="text-xl font-semibold">Title: {product?.title}</h3>
                  <p className="text-xl font-semibold">Description: {product?.description}</p>
                  <p className="text-xl font-semibold">Price: ₹{product?.price}</p>
                </div>

                <div className="flex gap-2">
                  <p>Status:</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${product?.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : product?.status === 'approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {product?.status}
                  </span>
                </div>

                <div>
                  <p className="text-xl font-semibold">Created By: {product?.createdBy?.name}</p>
                  <p className="text-xl font-semibold">Created user email: {product?.createdBy?.email}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

    </SidebarLayout>
  )
}

export default page