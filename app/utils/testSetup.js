const mongoose = require("mongoose");
const databaseName = "tradeling";
const seed = require("./dbSeed");

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
  });
  await seed.saveCustomers();
  await seed.saveOffers();
});
async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}
afterAll(async () => {
  await removeAllCollections();
  await mongoose.connection.close();
});
