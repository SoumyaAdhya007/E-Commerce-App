// Import required modules
const express = require("express");
const ProductModel = require("../Models/product.model");
const CategorytModel = require("../Models/category.model");
const cloudinary = require("cloudinary").v2;

// Create an Express router instance
const ProductRouter = express.Router();

/**
 * @swagger
 * /product/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: string
 *               description:
 *                 type: string
 *               availability:
 *                 type: boolean
 *               categoryId:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     parameters:
 *       - in: query
 *         name: apiKey
 *         schema:
 *           type: string
 *         required: true
 *         description: API key for authentication (if required)
 *     responses:
 *       201:
 *         description: Created - Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Not Found - Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

// ProductRouter.post("/add", ...)
// Route to add a new product
ProductRouter.post("/", async (req, res) => {
  // Extract product details from the request body
  // images: [],
  // brand: "",
  // name: "",
  // price: 1,
  // discount: 0,
  // quantity: 1,
  // sizes: [],
  // tags: [],
  // description: {
  //   about: "",
  //   manufactured: "",
  //   packed: "",
  // },
  // categoryId: "",
  // categoryies: [],
  // sellerId: "1",
  // images: [
  //   {
  //     asset_id: { type: String, required: true },
  //     public_id: { type: String, required: true },
  //     url: { type: String, required: true },
  //   },
  // ],
  // brand: {
  //   type: String,
  //   required: true,
  // },
  // // Title of the product (e.g., name of the product)
  // name: {
  //   type: String,
  //   required: true,
  // },
  // // Price of the product
  // price: {
  //   type: Number,
  //   required: true,
  // },
  // discount,
  // quantity: { type: Number, required: true },
  // sizes: [{ type: String, required: true }],
  // tags: [{ type: String, required: true }],
  // // Description of the product
  // description: {
  //   about: { type: String, required: true },
  //   manufactured: { type: String, required: true },
  //   packed: { type: String, required: true },
  // },
  // // Availability status of the product (true or false). Default is true.
  // availability: {
  //   type: Boolean,
  //   default: true,
  // },
  // // Category to which the product belongs (referenced by its ObjectId)
  // categoryId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category", // Reference to the "Category" model for population
  //   required: true,
  // },
  // categoryies: [{ type: String, required: true }],

  // sellerId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category", // Reference to the "Category" model for population
  //   required: true,
  // },
  // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  const {
    images,
    brand,
    name,
    price,
    discount,
    quantity,
    sizes,
    tags,
    availability,
    description,
    categoryId,
    categories,
    sellerId,
  } = req.body;

  try {
    // Check if all required product details are provided
    const missingFields = [];
    if (images.length === 0) {
      missingFields.push("images");
    }
    if (sizes.length === 0) {
      missingFields.push("sizes");
    }
    if (tags.length === 0) {
      missingFields.push("tags");
    }
    if (categories.length === 0) {
      missingFields.push("categories");
    }
    if (!brand) {
      missingFields.push("brand");
    }
    if (!name) {
      missingFields.push("name");
    }
    if (!price) {
      missingFields.push("price");
    }
    if (
      typeof discount === undefined ||
      typeof discount === "string" ||
      typeof discount === null
    ) {
      missingFields.push("discount");
    }
    if (!quantity) {
      missingFields.push("quantity");
    }
    if (!availability) {
      missingFields.push("availability");
    }
    if (!description) {
      missingFields.push("description");
    }
    // if (!description.manufactured) {
    //   missingFields.push("description manufactured");
    // }
    // if (!description.packed) {
    //   missingFields.push("description packed");
    // }
    // if (!description.packed) {
    //   missingFields.push("description packed");
    // }
    if (!categoryId) {
      missingFields.push("categoryId");
    }
    if (!sellerId) {
      missingFields.push("sellerId");
    }
    if (missingFields.length > 0) {
      const missingFieldsMessage = `Please provide the following fields: ${missingFields.join(
        ", "
      )}`;
      return res.status(404).send({ message: missingFieldsMessage });
    }
    const uploadRes = [];

    for (const image of images) {
      try {
        const result = await cloudinary.uploader.upload(image, {
          upload_preset: "e-commerce_preset",
        });
        uploadRes.push({
          asset_id: result.asset_id,
          public_id: result.public_id,
          url: result.url,
        });
      } catch (error) {
        console.error(
          "Error uploading image to Cloudinary:",
          res.status(404).send({ error: error.message })
        );
        // Handle the error as needed, e.g., log it or send an error response
      }
    }

    const product = new ProductModel({
      images: uploadRes,
      brand,
      name,
      price,
      discount,
      quantity,
      sizes,
      tags,
      description,
      availability,
      categoryId,
      categories,
      sellerId,
    });

    // Save the product to the database
    await product.save();

    // Return a success message with a 201 Created status
    return res.status(201).send({ message: "Product added successfully" });
  } catch (error) {
    // If any error occurs during processing, return a 500 Internal Server Error status with an error message
    return res.status(500).send({ message: error.message });
  }
});

/**
 * @swagger
 * /product/category/{categoryId}:
 *   get:
 *     summary: Get products by category ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to retrieve products for
 *     responses:
 *       200:
 *         description: OK - Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: string
 *                   description:
 *                     type: string
 *                   categoryId:
 *                     type: string
 *                   quantity:
 *                     type: string
 *       404:
 *         description: Not Found - Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

// ProductRouter.get("/category/:categoryId", ...)
// Route to retrieve all products for a specific category
ProductRouter.get("/search", async (req, res) => {
  // Extract the categoryId from the URL parameter

  try {
    // Get the search query from the query parameters
    const { query } = req.query;
    // Retrieve products based on the constructed dynamic query
    const products = await ProductModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Search by name (case-insensitive partial match)
        { categories: { $in: [query] } }, // Search by category (exact match in the categories array)
        { tags: { $regex: new RegExp(query.replace(/\s+/g, "|"), "i") } }, // Search by tags (exact match in the tags array)
        { brand: { $regex: query, $options: "i" } },
      ],
    });

    // Return the products as a response with a 200 OK status
    res.status(200).send(products);
  } catch (error) {
    // If any error occurs during processing, return a 500 Internal Server Error status with an error message
    res.status(500).send({ message: error.message });
  }
});

// ProductRouter.get("/:id", ...)
// Route to retrieve details of a specific product by its ID
ProductRouter.get("/one/:id", async (req, res) => {
  // Extract the product ID from the URL parameter
  const id = req.params.id;

  try {
    // Find the product with the provided ID
    const product = await ProductModel.findOne({ _id: id });

    // If the product is not found, return a 404 Not Found status with an error message
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Return the product details as a response with a 200 OK status
    res.status(200).send(product);
  } catch (error) {
    // If any error occurs during processing, return a 500 Internal Server Error status with an error message
    res.status(500).send({ message: error.message });
  }
});

/**
 * @swagger
 * /product/change/{id}:
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK - Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Not Found - Product or Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

// ProductRouter.patch("/change/:id", ...)
// Route to update a specific product by its ID
ProductRouter.patch("/change/:id", async (req, res) => {
  // Extract the product ID from the URL parameter
  const id = req.params.id;

  // Extract the payload (updated product details) from the request body
  const payload = req.body;

  try {
    // Find the product with the provided ID
    const product = await ProductModel.findOne({ _id: id });

    // If the product is not found, return a 404 Not Found status with an error message
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // If the payload contains categoryId, check if the category exists
    if (payload.categoryId) {
      const findCategory = await CategorytModel.findOne({
        _id: payload.categoryId,
      });

      // If the category is not found, return a 404 Not Found status with an error message
      if (!findCategory) {
        return res.status(404).send({ message: "Category not found" });
      }
    }

    // Update the product with the provided payload
    await ProductModel.findByIdAndUpdate({ _id: id }, payload);

    // Return a success message with a 200 OK status
    res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    // If any error occurs during processing, return a 500 Internal Server Error status with an error message
    res.status(500).send({ message: error.message });
  }
});

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK - Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Not Found - Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

// ProductRouter.delete("/:id", ...)
// Route to delete a specific product by its ID
ProductRouter.delete("/:id", async (req, res) => {
  // Extract the product ID from the URL parameter
  const id = req.params.id;

  try {
    // Find the product with the provided ID
    const product = await ProductModel.findOne({ _id: id });

    // If the product is not found, return a 404 Not Found status with an error message
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Delete the product from the database
    await ProductModel.delete({ _id: id });

    // Return a success message with a 200 OK status
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    // If any error occurs during processing, return a 500 Internal Server Error status with an error message
    res.status(500).send({ message: error.message });
  }
});

// Export the ProductRouter so that it can be used in other parts of the application
module.exports = { ProductRouter };
