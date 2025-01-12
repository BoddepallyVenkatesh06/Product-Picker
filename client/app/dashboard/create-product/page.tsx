'use client'


import { useSelector } from 'react-redux'

import SidebarLayout from '../../components/sidebar/SidebarLayout'
import ProductForm from "../../utils/ProductForm"



const CreateProductPage = () => {
 
  const { user } = useSelector((state: any) => state.auth)




  return (
    <SidebarLayout userRole={user?.accountType}>
      <div className='min-h-screen flex-col w-full text-black dark:text-white p-5'>
        <h1 className="text-2xl font-bold mb-6">Create Product</h1>


        <ProductForm type='Create'  />

        
      </div>
    </SidebarLayout>
  );
};

export default CreateProductPage;
