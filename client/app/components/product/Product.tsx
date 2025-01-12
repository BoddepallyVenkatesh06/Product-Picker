import React from 'react';
import { IProduct } from "../../types/type";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from '../../../lib/formatDate';

interface ProductProps {
  product: IProduct;
}



const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <li key={product._id} className="p-4 bg-black/5 dark:bg-white/10 hover:bg-black/10 hover:dark:bg-white/15 rounded-xl hover:shadow-md">
    <Link href={`/product/${product._id}`}>
      <div className="w-full h-60 flex-center">
        <Image
          src={product?.image ? product?.image : '/assets/images/not-available.jpg'}
          width={230}
          height={230}
          className="w-full h-full object-cover rounded-xl"
          alt={product?.title}
        />
      </div>
      <div className="flex flex-col gap-3 justify-between mt-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">{product?.title}</h2>
          <p>{product?.description}</p>
          <p className="font-bold">Price: ₹{product?.price}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Date: <span className="font-medium text-gray-800 dark:text-gray-200">
              {product?.createdAt ? formatDate(product?.createdAt) : 'Date not available'}
            </span>
          </p>
        </div>
        <div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${product?.status === 'pending'
                ? 'bg-yellow-200 text-yellow-800'
                : product.status === 'approved'
                  ? 'bg-green-200 text-green-800'
                  : 'bg-red-200 text-red-800'
              }`}
          >
            {product?.status}
          </span>
        </div>
      </div>
    </Link>
  </li>
  );
}

export default Product;
