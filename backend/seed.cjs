require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  // ELECTRONICS (10)
  {
    name: "iPhone 13 Pro",
    price: 85000,
    description: "Apple smartphone with A15 Bionic chip and Pro camera system",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5",
    stock: 15,
  },
  {
    name: "Samsung Galaxy S23",
    price: 75000,
    description: "Flagship Android phone with powerful performance",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1678911820864-e7f3c1c3e4b3",
    stock: 20,
  },
  {
    name: "Dell XPS 13 Laptop",
    price: 95000,
    description: "Premium ultrabook with Intel i7 processor",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    stock: 8,
  },
  {
    name: "Sony Headphones",
    price: 12000,
    description: "Noise cancelling wireless headphones",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1518441902117-1d3c4d0f7c3d",
    stock: 30,
  },
  {
    name: "Smart Watch",
    price: 5000,
    description: "Fitness tracking smartwatch",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1511732351613-8b6c33e6b63c",
    stock: 25,
  },
  {
    name: "Bluetooth Speaker",
    price: 3000,
    description: "Portable wireless speaker with deep bass",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
    stock: 40,
  },
  {
    name: "Canon DSLR Camera",
    price: 65000,
    description: "Professional DSLR camera for photography",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1519183071298-a2962be96c9a",
    stock: 6,
  },
  {
    name: "Gaming Mouse",
    price: 1500,
    description: "High precision RGB gaming mouse",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d5",
    stock: 50,
  },
  {
    name: "Mechanical Keyboard",
    price: 4000,
    description: "RGB mechanical keyboard for gaming",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    stock: 35,
  },
  {
    name: "LED Monitor",
    price: 12000,
    description: "24-inch full HD LED monitor",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
    stock: 12,
  },

  // CLOTHING (10)
  {
    name: "Men Cotton T-Shirt",
    price: 799,
    description: "Comfortable cotton t-shirt",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    stock: 60,
  },
  {
    name: "Denim Jacket",
    price: 2500,
    description: "Stylish denim jacket",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1520975918319-7e8c3c6c5f74",
    stock: 20,
  },
  {
    name: "Men Jeans",
    price: 1800,
    description: "Slim fit denim jeans",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    stock: 45,
  },
  {
    name: "Hoodie",
    price: 1500,
    description: "Warm and stylish hoodie",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    stock: 30,
  },
  {
    name: "Formal Shirt",
    price: 1200,
    description: "Elegant office wear shirt",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1520974735194-1dbe7c4f59b3",
    stock: 25,
  },
  {
    name: "Women Dress",
    price: 2200,
    description: "Beautiful party wear dress",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1520975918319-7e8c3c6c5f74",
    stock: 18,
  },
  {
    name: "Sports Shorts",
    price: 600,
    description: "Lightweight sports shorts",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1593032465171-8d0f3b5b3a9a",
    stock: 40,
  },
  {
    name: "Jacket",
    price: 3000,
    description: "Winter jacket",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1520975918319-7e8c3c6c5f74",
    stock: 15,
  },
  {
    name: "Cap",
    price: 400,
    description: "Stylish cap",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1588854337118-1cfc58f6c1d3",
    stock: 70,
  },
  {
    name: "Sweater",
    price: 1700,
    description: "Warm wool sweater",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1542060748-10c28b62716d",
    stock: 22,
  },

  // BOOKS (10)
  {
    name: "Atomic Habits",
    price: 500,
    description: "Self improvement book",
    category: "books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    stock: 35,
  },
  {
    name: "Rich Dad Poor Dad",
    price: 400,
    description: "Finance and mindset book",
    category: "books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    stock: 40,
  },
  {
    name: "Think and Grow Rich",
    price: 350,
    description: "Classic success book",
    category: "books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    stock: 30,
  },
  {
    name: "The Alchemist",
    price: 300,
    description: "Famous novel",
    category: "books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    stock: 28,
  },
  {
    name: "Deep Work",
    price: 550,
    description: "Focus and productivity book",
    category: "books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    stock: 20,
  },
  {
    name: "Psychology of Money",
    price: 450,
    description: "Money mindset book",
    category: "books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    stock: 32,
  },
  {
    name: "Zero to One",
    price: 600,
    description: "Startup guide",
    category: "books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    stock: 25,
  },
  {
    name: "Ikigai",
    price: 350,
    description: "Japanese philosophy book",
    category: "books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    stock: 27,
  },
  {
    name: "Clean Code",
    price: 700,
    description: "Programming best practices",
    category: "books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    stock: 15,
  },
  {
    name: "You Can Win",
    price: 300,
    description: "Motivational book",
    category: "books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    stock: 20,
  },

  // HOME (10)
  {
    name: "Sofa Set",
    price: 15000,
    description: "Comfortable sofa",
    category: "home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    stock: 5,
  },
  {
    name: "Dining Table",
    price: 12000,
    description: "Wooden dining table",
    category: "home",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
    stock: 7,
  },
  {
    name: "Bed",
    price: 20000,
    description: "King size bed",
    category: "home",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    stock: 6,
  },
  {
    name: "Wall Clock",
    price: 800,
    description: "Modern wall clock",
    category: "home",
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f",
    stock: 40,
  },
  {
    name: "Table Lamp",
    price: 1200,
    description: "Decorative lamp",
    category: "home",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    stock: 25,
  },
  {
    name: "Carpet",
    price: 2500,
    description: "Soft floor carpet",
    category: "home",
    image: "https://images.unsplash.com/photo-1582582494700-33f0a5d01b39",
    stock: 18,
  },
  {
    name: "Curtains",
    price: 1800,
    description: "Stylish window curtains",
    category: "home",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    stock: 22,
  },
  {
    name: "Office Chair",
    price: 6000,
    description: "Ergonomic office chair",
    category: "home",
    image: "https://images.unsplash.com/photo-1582582494700-33f0a5d01b39",
    stock: 12,
  },
  {
    name: "Bookshelf",
    price: 5000,
    description: "Wooden bookshelf",
    category: "home",
    image: "https://images.unsplash.com/photo-1582582494700-33f0a5d01b39",
    stock: 10,
  },
  {
    name: "Mirror",
    price: 2000,
    description: "Decorative mirror",
    category: "home",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
    stock: 14,
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected");

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Data Inserted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

seedData();