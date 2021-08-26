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
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
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
