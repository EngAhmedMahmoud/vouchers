const vouchersController = require("../../controllers/vouchers");
require("../../utils/testSetup");
it("create voucher without sending parameters", async done => {
    let check = await vouchersController.create();
    expect(check.code).toBe(500);
    expect(check.response["success"]).toBe(false);
    done();
});
it("get all vouchers", async done => {
    let check = await vouchersController.all();
    expect(check.code).toBe(200);
    expect(check.response["success"]).toBe(true);
    done();
});
it("Generate code without passing length", async done => {
    let check = await vouchersController.generateCode();
    expect(check.length).toBe(8);
    done();
});
it("Generate code with passing length of 12 chars", async done => {
    let check = await vouchersController.generateCode(12);
    expect(check.length).toBe(12);
    done();
});
it("Five days validity", async done => {
    let result = 5*60*24*60*1000+new Date().getTime();
    let check = await vouchersController.calcExpireAt(5);
    expect(check).toBe(result);
    done();
});
