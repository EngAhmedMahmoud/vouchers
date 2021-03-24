require("./../../utils/testSetup");
const offerController = require("./../../controllers/offer");
it("Get offer information without passing id", async done => {
    let check = await offerController.get();
    expect(check).toBe(null);
    done();
});
it("Get offer information with incorrect id", async done => {
    let check = await offerController.get("xyz");
    expect(check).toBe(false);
    done();
});
it("Get offer information with correct id", async done => {
    let check = await offerController.get("6053bb132571e53c32f34e62");
    expect(check.discount).toBe(20);
    done();
});
