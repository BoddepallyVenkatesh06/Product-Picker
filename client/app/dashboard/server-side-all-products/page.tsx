
import { cookies } from 'next/headers';
import Link from 'next/link'
import SidebarLayout from '../../components/sidebar/SidebarLayout'
import { IProduct } from "../../types/type";
import { formatDate } from '../../../lib/formatDate';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import Product from '../../components/product/product'



// Server-side function to fetch data
async function getAllProducts(currentPage: number = 1) {
  const limit = 10;

  // Get the token from cookies
  const cookieStore = cookies();
  const refresh_token = cookieStore.get('refresh_token')?.value;

  if (!refresh_token) {
    throw new Error('No refresh token found');
  }

  // Make the API request
  const response = await fetch(`http://localhost:8000/api/v1/product/get-products?page=${currentPage}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refresh_token}`,
    },
    credentials: 'include',
  });


  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  console.log("All Products data from server => ", data);
  return data;
}





export default async function AllProductsWithPaginationPage({ searchParams }: { searchParams: { page: string } }) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  let productsData;

  try {
    productsData = await getAllProducts(currentPage);
  } catch (error) {
    console.log("Error while fecthing all products from server side")
    productsData = { products: [], allProductsCount: 0, totalPages: 1 };
  }



  console.log("productsData = ", productsData)
  const { products, allProductsCount, totalPages } = productsData;



  return (
    <SidebarLayout userRole={'Admin'}>
      <div className="min-h-screen flex-col w-full text-black dark:text-white p-5">
        <h1 className="text-2xl font-bold mb-6">All Products : {allProductsCount}</h1>

        {!products || products.length === 0 ? (
          <div className="text-3xl p-5 text-center rounded-xl text-black dark:text-white bg-black/10 dark:bg-white/10">
            No products available.
          </div>
        ) : (
          <>

            {/* Pagination */}
            <Pagination className="mb-10">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href={`/dashboard/server-side-all-products?page=${currentPage - 1}`} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href={`/dashboard/server-side-all-products?page=${index + 1}`}
                      className={currentPage === index + 1 ? 'bg-green-600' : ''}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href={`/dashboard/server-side-all-products?page=${currentPage + 1}`} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>


            {/* Product List */}
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {products && products?.map((product: IProduct) => (
                 <Product key={product._id} product={product} />
              ))}
            </ul>


          </>
        )}
      </div>
    </SidebarLayout>
  );
}

