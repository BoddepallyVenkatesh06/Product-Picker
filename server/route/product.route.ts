import { Router } from "express";
import { isAuthenticated } from "../middleware/auth";
import { createProduct, getProducts, getSingleProduct } from "../controllers/product.controller";
import { updateAccessToken } from "../controllers/user.controller";

const productRouter = Router()


productRouter.post('/create-product', updateAccessToken, isAuthenticated, createProduct)
productRouter.get('/get-products', updateAccessToken, isAuthenticated, getProducts)
productRouter.post('/get-single-product', updateAccessToken, isAuthenticated, getSingleProduct)





export default productRouter