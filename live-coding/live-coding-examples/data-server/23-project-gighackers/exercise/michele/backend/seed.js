const dotenv = require("dotenv");
dotenv.config();

const mongodb = require("mongodb");
const { MongoClient } = mongodb;

const faker = require("faker");
faker.seed(1337);

const { v4: uuid } = require("uuid");


async function seed () {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = client.db("gighackers");


    await db.collection("users").deleteMany();
    db.collection("users").insertOne({
        username: "eventmanager",
        fullName: "Event Manager",
        password: "$2b$10$9L8yBNfgv/O7N/lXMIs5pe18cniQg3jqqd1tBjxvn2yVrKK9lGBW.", //"1234" // $2b$10$ujlKRxuoi0DKiRVV6wxxCe2/kSCvWalXfYNx6s109Crn6C/5sdGim
    });

    await db.collection("events").deleteMany();
    const newEvents = [];

    for (let i = 0; i < 8; i++) {
        newEvents.push({
            title: faker.commerce.productName(),
            date: faker.date.future(),
            maxNumberGuests: faker.datatype.number(500),
        });
    }

    await db.collection("events").insertMany(newEvents);

    const events = await db.collection("events").find().toArray();


    await db.collection("guests").deleteMany();
    const newGuests = [];

    for (let i = 0; i < 50; i++) {
        newGuests.push({
            _id: uuid(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            eventId: events[Math.floor(Math.random() * events.length)]._id,
        });
    }

    await db.collection("guests").insertMany(newGuests);
}

seed()
    .then(() => process.exit(0))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });
