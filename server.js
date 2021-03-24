const config = require("./app/config/setting.json");
const PORT = process.env.PORT||config.SERVER.PORT;
const app = require("./app.js");
app.listen(PORT,()=>{
    console.log(`voucher server is running at http://localhost:${PORT}`)
})