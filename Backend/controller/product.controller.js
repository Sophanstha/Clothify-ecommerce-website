import Product from "../model/product.model.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    // Destructure data from request body

    const {
      name,
      price,
      description,
      discountPrice,
      sku,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isfeature,
      isPublished,
      rating,
      numReview,
      tags,
      dimension,
      weight,
    } = req.body;

    // Create product instance
    const product = new Product({
      name,
      price,
      description,
      discountPrice,
      sku,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isfeature,
      isPublished,
      rating,
      numReview,
      tags,
      user: req.user._id, // assuming you pass authenticated user
      dimension,
      weight,
    });

    // Save product to DB
    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the product",
      error: error.message,
    });
  }
};

export const updateProductDetail = async (req, res) => {
  try {
    const id = req.params.id;

    // Find product
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update fields (fall back to existing values if not provided)
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.discountPrice = req.body.discountPrice || product.discountPrice;
    product.sku = req.body.sku || product.sku;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.sizes = req.body.sizes || product.sizes;
    product.colors = req.body.colors || product.colors;
    product.collections = req.body.collections || product.collections;
    product.material = req.body.material || product.material;
    if (req.body.gender) {
      const g = String(req.body.gender).toLowerCase();
      product.gender = g === "women" ? "Women" : g === "men" ? "Men" : "Unisex";
    }
    product.images = req.body.images || product.images;
    product.isfeature = req.body.isfeature ?? product.isfeature; // boolean check
    product.isPublished = req.body.isPublished ?? product.isPublished;
    product.rating = req.body.rating || product.rating;
    product.numReview = req.body.numReview || product.numReview;
    product.tags = req.body.tags || product.tags;
    product.dimension = req.body.dimension || product.dimension;
    product.weight = req.body.weight || product.weight;

    // Save updated product
    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating product",
      error: error.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product has been deleted",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const {
      price,
      category,
      size,
      color,
      collection,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      material,
      brand,
      limit,
      search
    } = req.query;

    let query = {};

    if (category && category.toLowerCase() !== "all") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }
    if (collection && collection.toLowerCase() !== "all") {
      query.$or = [
        { collections: { $regex: new RegExp(collection, "i") } },
        { collection: { $regex: new RegExp(collection, "i") } },
      ];
    }
    if (material) {
      const materialList = material.split(",").map((m) => new RegExp(`^${m.trim()}$`, "i"));
      query.material = { $in: materialList };
    }
    if (brand) {
      const brandList = brand.split(",").map((b) => new RegExp(`^${b.trim()}$`, "i"));
      query.brand = { $in: brandList };
    }
    if (size) {
      const sizeList = size.split(",").map((s) => s.trim());
      query.sizes = { $in: sizeList };
    }
    if (color && color.toLowerCase() !== "all") {
      const colorList = color.split(",").map((c) => new RegExp(`^${c.trim()}$`, "i"));
      query.colors = { $in: colorList };
    }
    if (gender && gender.toLowerCase() !== "all") {
      query.gender = { $regex: new RegExp(`^${gender}$`, "i") };
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice && !isNaN(Number(minPrice))) query.price.$gte = Number(minPrice);
      if (maxPrice && !isNaN(Number(maxPrice))) query.price.$lte = Number(maxPrice);
    }
    if (search && search.trim() !== "") {
      const searchRegex = { $regex: search.trim(), $options: "i" };
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { brand: searchRegex },
        { category: searchRegex },
      ];
    }

    let sort = { createdAt: -1 };
    if (sortBy) {
      const s = sortBy.toLowerCase();
      if (s === "priceasc") {
        sort = { price: 1 };
      } else if (s === "pricedesc" || s === "pricedsc") {
        sort = { price: -1 };
      } else if (s === "popularity") {
        sort = { rating: -1 };
      }
    }

    let product = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    return res.status(200).json({
      message: "datafetch succefully",
      data: product,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// getBest Seller 
export const getBestSeller = async(req,res)=>{
  try {
    const bestSSeller = await Product.findOne().sort({rating : -1})
    if(!bestSSeller){
      return res.status(200).json({
        message : "no best seller till now"
      })

    }
    return res.status(200).json({
      message : "best seller product",
      data : bestSSeller
    })
  } catch (error) {
    console.log('====================================');
    console.log(error.message);
    console.log('====================================');
    return res.status(500).json({
      message : error.message,

    })
  }
}

// getNewlyArrival 
export const getNewlyArrival = async(req,res)=>{
  try {
    const newProduct = await Product.find().sort({createdAt:-1}).limit(8)
    if(!newProduct){
      return res.status(201).json({
        message : "no product is listed",
      })
    }
      return res.status(201).json({
        message : "newly Arriaval product",
        data : newProduct
      })
    
  } catch (error) {
   console.log('====================================');
   console.log(error.message);
   console.log('===================================='); 
  return res.status(500).json({
    message : error.message
  })
  
  }
}





// getting single product data
export const singleProduct = async(req,res)=>{
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
      return res.status(400).json({
        message : "product doesn't exist"
      })
    }
    return res.status(200).json({
      message:"product data ",
      data : product
    })
    
  } catch (error) {
    console.log('====================================');
    console.log(error.message);
    console.log('====================================');
    return res.status(500).json({
      message : error.message,

    })
  }
}

// similarProduct
export const similarProduct = async(req,res)=>{
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
      return res.status(400).json({
        message : "no such product iis avaivale"
      })
    }
    const similarProduct = await Product.find({
      _id :{$ne : id},
      category : product.category,
      gender : product.gender
    }).limit(4)

    return res.status(200).json({
      message : "similar product !!!",
      data : similarProduct
    })
    
  } catch (error) {
    console.log('====================================');
    console.log(error.message);
    console.log('====================================');
    return res.status(500).json({
      message : error.message
    })
  }
}

// Create or update product review
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { id } = req.params;

    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment are required" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.reviews) {
      product.reviews = [];
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user && r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      alreadyReviewed.rating = Number(rating);
      alreadyReviewed.comment = comment;
      alreadyReviewed.createdAt = new Date();
    } else {
      const review = {
        name: req.user.name || "Customer",
        rating: Number(rating),
        comment,
        user: req.user._id,
        createdAt: new Date(),
      };
      product.reviews.push(review);
    }

    product.numReview = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    return res.status(201).json({
      success: true,
      message: alreadyReviewed ? "Review updated successfully" : "Review added successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error in createProductReview:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

