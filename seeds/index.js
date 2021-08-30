const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "61284f32e4779747f4ac84bd",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dm4s4eme7/image/upload/v1630180888/YelpCamp/gab8hicoaeeyf3dqusgv.jpg",
          filename: "YelpCamp/gab8hicoaeeyf3dqusgv",
        },
        {
          url: "https://res.cloudinary.com/dm4s4eme7/image/upload/v1630180888/YelpCamp/g9az15gysykyzrzhi9ra.jpg",
          filename: "YelpCamp/g9az15gysykyzrzhi9ra",
        },
      ],
      geometry: { type: "Point", coordinates: [-113.1331, 47.0202] },
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt velit ut molestias dolores reiciendis nisi quae quasi. Voluptatibus eos accusantium fugit. Sed voluptatibus dolore iure quae praesentium corporis vel tempora.",
      price,
    });
    await camp.save();
  }
};

const sample = (array) => array[Math.floor(Math.random() * array.length)];

seedDB().then(() => {
  console.log("Connection closing...");
  mongoose.connection.close();
  console.log("Connection closed.");
});
