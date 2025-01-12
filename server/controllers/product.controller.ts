import { NextFunction, Request, Response } from 'express';
import { catchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import ProductModel from '../models/product.model';
import cloudinary from 'cloudinary';
import multer from 'multer';



// Configure multer to handle file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");


// =========================== CREATE PRODUCT ===========================
interface ICreateProductBody {
  title: string;
  description: string;
  price: string;
}

export const createProduct = [
  upload,
  catchAsyncError(async (req: any, res: any, next: any) => {
    try {
      console.log("req.body = ", req.body);
      console.log("req.file = ", req.file); // req.file should now have the uploaded file

      // Get data from the request body and file
      const { title, description, price } = req.body as ICreateProductBody;
      const createdBy = req.user?._id;
      const imageFile = req.file;

      // Validate required fields
      if (!title || !description || !price || !imageFile) {
        return next(
          new ErrorHandler(
            "Title, description, image, and price are required fields",
            400,
            "Error while creating product"
          )
        );
      }

      // Upload image to Cloudinary
      cloudinary.v2.uploader.upload_stream(
        {
          folder: "Product Picker/product",
          resource_type: "image",
        },
        async (error, result) => {
          if (error) {
            return next(new ErrorHandler("Error uploading image", 400, "Error while creating product"));
          }

          try {
            // Create a new product
            const product = await ProductModel.create({
              title,
              description,
              image: result?.secure_url,
              price,
              createdBy,
              createdAt: Date.now(),
            });

            // Send success response
            res.status(201).json({
              success: true,
              message: "Product created successfully",
              product,
            });
          } catch (error: any) {
            return next(
              new ErrorHandler("Error creating product", 400, "Error while creating product")
            );
          }
        }
      ).end(imageFile.buffer); // Write the image buffer to the Cloudinary upload stream

    } catch (error: any) {
      return next(
        new ErrorHandler(error.message, 400, "Error while creating product")
      );
    }
  }),
];





// =========================== GET PRODUCTS ===========================
// export const getProducts = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
//   try {


//     const createdBy = req.user?._id;

//     // Find user's products
//     const products = await ProductModel.find({ createdBy })
//       .sort({ createdAt: -1 });

//     // send success response
//     res.status(201).json({
//       success: true,
//       products,
//       message: "Product fetched successfully",
//     });

//   } catch (error: any) {
//     return next(new ErrorHandler(error.message, 400, "Error while fetching product"));
//   }
// });


// =========================== GET PRODUCTS WITH PAGINATION ===========================
export const getProducts = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10 } = req.query;  // default page is 1 and limit is 10
    const skip = Math.max(0, (parseInt(page as string) - 1) * parseInt(limit as string));  // ensure skip is never negative

    const createdBy = req.user?._id;

    // Find user's products with pagination
    const products = await ProductModel.find({ createdBy })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as string));

    const allProductsCount = await ProductModel.countDocuments({createdBy})

    // send success response
    res.status(200).json({
      success: true,
      products,
      allProductsCount,
      totalPages: Math.ceil(allProductsCount / Number(limit)),
      message: "Product fetched successfully",
    });

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400, "Error while fetching product"));
  }
});






// =========================== GET SINGLE PRODUCT ===========================
export const getSingleProduct = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {

    const createdBy = req.user?._id;
    const productId = req.body.id;

    // find the product by ID
    const product = await ProductModel.findOne(
      { _id: productId, createdBy }
    ).populate('createdBy', 'name email')

    if (!product) {
      return next(new ErrorHandler("Product not found", 404, "Error while fetching single product"));
    }

    // Check if the product was created by the logged-in user
    if (product.createdBy._id.toString() !== createdBy?.toString()) {
      return next(new ErrorHandler("You are not eligible to access this product", 403, "Error while fetching single product"));
    }

    // send success response
    res.status(200).json({
      success: true,
      product,
      message: "Product found successfully",
    });

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400, "Error while fetching single product"));
  }
});

