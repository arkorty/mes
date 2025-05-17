import express from "express";
const productRouter = express.Router();
import { upload } from "../Config/FileStorageConfig";

import { productController } from "../Controllers/ProductController";

productRouter.put(
  "/upsert",
  upload.fields([
    { name: `coverImage`, maxCount: 1 },
    { name: `otherImages`, maxCount: 4 },
    { name: `variationImages` },
  ]),
  (req, res) => productController.UpsertProduct(req, res)
);

productRouter
  .get("/:id", (req, res) => productController.ProductDetails(req, res))
  .delete("/:id", (req, res) => productController.DeleteProduct(req, res));
productRouter.get("", (req, res) => productController.ProductList(req, res));
productRouter.get("/quantity/:userid/:productid", (req, res) =>
  productController.GetCartProductQuantity(req, res)
);

export default productRouter;
