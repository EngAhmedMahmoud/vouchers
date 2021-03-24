require("./../../utils/testSetup");
const customerController = require("./../../controllers/customer");
it("Get customer information without passing id", async done => {
    let check = await customerController.get();
    expect(check).toBe(null);
    done();
});
it("Get customer information with incorrect id", async done => {
    let check = await customerController.get("xyz");
    expect(check).toBe(false);
    done();
});
it("Get customer information with correct id", async done => {
    let check = await customerController.get("6053bb122571e53c32f34e4f");
    expect(check.email).toBe("ahmed.m.web.dev@gmail.com");
    done();
});
