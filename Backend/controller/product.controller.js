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
    product.gender = req.body.gender || product.gender;
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
      query.category = category;
    }
    if (collection && collection.toLowerCase() !== "all") {
      query.collection = collection;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.sizes = { $in: size.split(",") };
    }
    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (price) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDsc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
      }
    }

    let product = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    return res.status(200).json({
      message : "datafetch succefully",
      data : product
    })
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
