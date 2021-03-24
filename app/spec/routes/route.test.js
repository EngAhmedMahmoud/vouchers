const app = require("./../../../app.js");
const supertest = require("supertest");
const API_URL = require("./../../config/setting.json").API_URL;
const request = supertest(app);
require("./../../utils/testSetup");
it("Save voucher in db without sending parameters", async done => {
    const res = await request.post(`${API_URL}/vouchers`).send({
    });
    expect(res.body.success).toBe(false);
    expect(res.body.err[0]).toBe("offer is required");
    expect(res.body.err[1]).toBe("customer is required");
    expect(res.status).toBe(400);
    done();
});
it("Save customer voucher with sending incorrect prameters", async done => {
    const res = await request.post(`${API_URL}/vouchers`).send({
        customer:"xyz",
        offer:"xxyyzz",
        expireAt:3
    });
    expect(res.body.success).toBe(false);
    expect(res.body.err[0]).toBe("offer Not Correct ObjectID");
    expect(res.body.err[1]).toBe("customer Not Correct ObjectID");
    expect(res.status).toBe(400);
    done();
});
it("Save customer voucher in db with sending correct parameters", async done => {
    const res = await request.post(`${API_URL}/vouchers`).send({
        customer:"6053bb122571e53c32f34e4f",
        offer:"6053bb132571e53c32f34e62",
        expireAt:3
    });
    expect(res.body.success).toBe(true);
    expect(res.status).toBe(201);
    done();
});
it("Get all vouchers from db", async done => {
    const res = await request.get(`${API_URL}/vouchers`).send();
    expect(res.body.success).toBe(true);
    expect(res.body.data[0]["customer"]._id).toBe("6053bb122571e53c32f34e4f");
    expect(res.body.data[0]["customer"].email).toBe("ahmed.m.web.dev@gmail.com");
    expect(res.body.data[0]["offer"]._id).toBe("6053bb132571e53c32f34e62");
    expect(res.status).toBe(200);
    done();
});
it("Get all vouchers for specific customer", async done => {
    const res = await request.get(`${API_URL}/customers/6053bb122571e53c32f34e4f/vouchers`).send();
    expect(res.body.success).toBe(true);
    expect(res.body.data[0]["customer"]._id).toBe("6053bb122571e53c32f34e4f");
    expect(res.body.data[0]["customer"].email).toBe("ahmed.m.web.dev@gmail.com");
    expect(res.body.data[0]["offer"]._id).toBe("6053bb132571e53c32f34e62");
    expect(res.status).toBe(200);
    done();
});
it("Get all vouchers for none existing customer", async done => {
    const res = await request.get(`${API_URL}/customers/any-id-not-real-one/vouchers`).send();
    expect(res.body.success).toBe(false);
    expect(res.status).toBe(400);
    done();
});
it("Redeem voucher without sending parameters", async done => {
    const res = await request.post(`${API_URL}/vouchers/redeem`).send({
    });
    expect(res.body.success).toBe(false);
    expect(res.body.err[1]).toBe("code is required");
    expect(res.body.err[0]).toBe("customer is required");
    expect(res.status).toBe(400);
    done();
});
it("Redeem voucher with sending invalid voucher code", async done => {
    const res = await request.post(`${API_URL}/vouchers/redeem`).send({
        code:"code",
        customer:"6053bb122571e53c32f34e4f"
    });
    expect(res.body.success).toBe(false);
    expect(res.body.err[0]).toBe("Invalid voucher");
    expect(res.status).toBe(400);
    done();
});