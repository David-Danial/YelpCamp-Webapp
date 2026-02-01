require("dotenv").config();
const mongoose = require("mongoose");
const cities = require("./cities"); // ✅ use Indian cities dataset
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campgrounds");

mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const imagesPool = [
  {
    url: "https://res.cloudinary.com/dxqtvuroy/image/upload/v1753885644/YelpCamp/fgjmd3jegan4dvdnwxxa.avif",
    filename: "YelpCamp/fgjmd3jegan4dvdnwxxa",
  },
  {
    url: "https://res.cloudinary.com/dxqtvuroy/image/upload/v1753885649/YelpCamp/ruhpiqwijr7xrbx3ulsy.jpg",
    filename: "YelpCamp/ruhpiqwijr7xrbx3ulsy",
  },
  {
    url: "https://res.cloudinary.com/dxqtvuroy/image/upload/v1753885651/YelpCamp/b85lbu4ywtol1scrbllx.jpg",
    filename: "YelpCamp/b85lbu4ywtol1scrbllx",
  },
  {
    url: "https://res.cloudinary.com/dxqtvuroy/image/upload/v1753885655/YelpCamp/jen13k1iokogijgipez2.jpg",
    filename: "YelpCamp/jen13k1iokogijgipez2",
  },
];

// ✅ pick 3 unique images each time
const pick3Images = () => {
  const copy = [...imagesPool];
  const picked = [];

  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    picked.push(copy.splice(idx, 1)[0]);
  }

  return picked;
};

const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {   // ✅ exactly 50
    const rand = Math.floor(Math.random() * cities.length);
    const price = Math.floor(Math.random() * 2000) + 300; // ✅ better price range

    const camp = new Campground({
      author: "697da9e7395f0025e03a67e9", // ✅ your Atlas user id
      location: `${cities[rand].city}, ${cities[rand].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Campgrounds offer a diverse range of experiences, from secluded forest groves with the sounds of nature to well-equipped sites with amenities like picnic tables and grills.",
      price,
      images: pick3Images(), // ✅ 3 different images
      geometry: {
        type: "Point",
        coordinates: [cities[rand].lng, cities[rand].lat], // ✅ [lng, lat] correct for maps
      },
    });

    await camp.save();
  }

  console.log("✅ Seed completed: 50 campgrounds added with 3 unique images each!");
};

seedDB().then(() => {
  mongoose.connection.close();
});
