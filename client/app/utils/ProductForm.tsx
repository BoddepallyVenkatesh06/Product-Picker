'use client';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateProductMutation, } from '../redux/features/product/productApi';
import { useSubmitReviewMutation, } from '../redux/features/review/reviewApi';
import { toast } from 'sonner';
import { styles } from '../styles/style';
import AsteriskSymbol from './AsteriskSymbol';
import { LoadingProductSkeleton } from "./LoadingSkeleton"
import FileUploader from "./FileUploader"
import { IProduct } from "../types/type"
import LoadingButtonText from './LoadingButtonText';



// type
type productFormProps = {
    type: 'Create' | 'Review',
    product?: IProduct,
    productId?: string
}

const schema = Yup.object().shape({
    title: Yup.string().required("Please enter the title of the product"),
    description: Yup.string().required("Please enter the description of the product"),
    price: Yup.number().required("Please enter the price of the product"),
    files: Yup.mixed().required('Please drop the image of the product'),
});

const ProductForm = ({ type, product, productId }: productFormProps) => {

    if (type === "Review" && !product) {
        return <div className="w-full">
            <LoadingProductSkeleton />
        </div>
    }

    const [createProduct, { data: createData, isSuccess: isCreateSuccess, error: createError, isLoading: isCreateLoading }] = useCreateProductMutation();
    const [submitReview, { data: reviewData, isSuccess: isReviewSuccess, error: reviewError, isLoading: isReviewLoading }] = useSubmitReviewMutation();

    const [files, setFiles] = useState<File | null>(null);


    const formik = useFormik({
        initialValues: {
            title: type === 'Review' && product ? product.title : '',
            description: type === 'Review' && product ? product.description : '',
            price: type === 'Review' && product ? product.price : "",
            files: type === 'Review' && product ? product.image : "",
        },
        validationSchema: schema,
        enableReinitialize: true,
        onSubmit: async ({ title, description, price }) => {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price.toString());
            if (files) {
                formData.append('image', files);
            }

            if (type === 'Create') {
                await createProduct(formData);
            }

            else if (type === 'Review' && productId) {
                const { title, description, price, files:imageFile } = formik.values;

                // Initialize an empty object to store updated fields
                const updatedFields: { [key: string]: any } = {};

                // Compare each field with its initial value and add to updatedFields if it's different
                if (title !== formik.initialValues.title) {
                    updatedFields.title = title;
                }
                if (description !== formik.initialValues.description) {
                    updatedFields.description = description;
                }
                if (price !== formik.initialValues.price) {
                    updatedFields.price = price;
                }
                // if (product?.image !== files) {
                //     updatedFields.image = files;
                // }
                // console.log("product?.files = ", product?.image)
                // console.log("files = ", files)

                // Send the updatedFields object only if it contains any updates
                if (Object.keys(updatedFields).length > 0) {
                    await submitReview({ productId, updatedFields });
                } else {
                    toast.error("No changes detected to submit");
                }
            }
        },
    });



    const { errors, touched, values, handleChange, handleSubmit, handleBlur, setFieldValue } = formik;

    // create product
    useEffect(() => {
        if (isCreateSuccess) {
            toast.success("Product created successfully");
            formik.resetForm();
            setFiles(null)
        }
        if (createError) {
            const errorData = createError as any;
            toast.error(errorData?.data?.message || "Error creating product");
        }
        if (isReviewSuccess) {
            toast.success("Product submitted for review successfully");
        }
        if (reviewError) {
            const errorData = reviewError as any;
            toast.error(errorData?.data?.message || "Error submitting review for product");
        }
    }, [isCreateSuccess, createError, isReviewSuccess, reviewError, setFiles]);


    // console.log("values.image = ", values.image)
    // console.log("files = ", files)

    return (
        <div className='p-4 rounded-md'>
            <form onSubmit={handleSubmit} className='flex flex-col md:flex-row items-center gap-7 justify-between w-full  '>
                <div className="w-[60%] bg-black/5 dark:bg-white/10 p-5 rounded-2xl">
                    <div className="mb-4">
                        <label className={`${styles.label}`} htmlFor="title">
                            Title <AsteriskSymbol />
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Enter Title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                            className={`border rounded w-full focus:outline-none py-2 px-3 ${touched.title && errors.title ? 'border-red-500' : 'border-black'
                                } ${styles.input}`}
                        />
                        {
                            errors.title && touched.title &&
                            <span className='text-red-500 pt-2 block'>{errors.title}</span>
                        }

                    </div>

                    <div className="mb-4">
                        <label className={`${styles.label}`} htmlFor="description">
                            Description <AsteriskSymbol />
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter Description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            className={`h-[90px] border rounded w-full focus:outline-none py-2 px-3 ${touched.description && errors.description ? 'border-red-500' : 'border-black'
                                } ${styles.input}`}
                        />
                        {
                            errors.description && touched.description &&
                            <span className='text-red-500 pt-2 block'>{errors.description}</span>
                        }
                    </div>

                    <div className="mb-4">
                        <label className={`${styles.label}`} htmlFor="price">
                            Price <AsteriskSymbol />
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="Enter Price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            className={`border rounded w-full focus:outline-none py-2 px-3 ${touched.price && errors.price ? 'border-red-500' : 'border-black'
                                } ${styles.input}`}
                        />
                        {
                            errors.price && touched.price &&
                            <span className='text-red-500 pt-2 block'>{errors.price}</span>
                        }
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-500 text-white disabled:bg-green-700 disabled:cursor-not-allowed font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={isCreateLoading || isReviewLoading}
                        >
                            {(isCreateLoading || isReviewLoading) ? <LoadingButtonText /> : (type === 'Create' ? 'Create Product' : 'Submit Review')}
                        </button>

                    </div>
                </div>

                {/* Upload images */}
                <div className='flex  flex-col'>
                    <FileUploader
                        imageUrl={product?.image || ""}
                        setFiles={setFiles}
                        setFieldValue={setFieldValue}
                    />
                    {
                        errors.files && touched.files &&
                        <span className='text-center text-red-500 pt-2 block'>{errors.files}</span>
                    }
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
