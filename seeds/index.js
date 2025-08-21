const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i <= 50; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6884f40c4dfd98263892af7f',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Campgrounds offer a diverse range of experiences, from secluded forest groves with the sounds of nature to well-equipped sites with amenities like picnic tables and grills. They can provide opportunities for fishing, swimming, hiking, and simply enjoying the tranquility of the outdoors. Whether you seek adventure or relaxation, a well-chosen campground can offer a memorable escape from the everyday.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dxqtvuroy/image/upload/v1753885644/YelpCamp/fgjmd3jegan4dvdnwxxa.avif',
                    filename: 'YelpCamp/fgjmd3jegan4dvdnwxxa'
                },
                {
                    url: 'https://res.cloudinary.com/dxqtvuroy/image/upload/v1753885649/YelpCamp/ruhpiqwijr7xrbx3ulsy.jpg',
                    filename: 'YelpCamp/ruhpiqwijr7xrbx3ulsy'
                },
                {
                    url: 'https://res.cloudinary.com/dxqtvuroy/image/upload/v1753885651/YelpCamp/b85lbu4ywtol1scrbllx.jpg',
                    filename: 'YelpCamp/b85lbu4ywtol1scrbllx'
                },
                {
                    url: 'https://res.cloudinary.com/dxqtvuroy/image/upload/v1753885655/YelpCamp/jen13k1iokogijgipez2.jpg',
                    filename: 'YelpCamp/jen13k1iokogijgipez2'
                }
            ],
            geometry: {
                type: "Point",
                coordinates: [
                    cities[rand1000].longitude,
                    cities[rand1000].latitude
                ]
            }

        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})