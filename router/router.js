const {Router} = require("express")
const hbs = require("handlebars");
const nodemailer = require("nodemailer");
const router = Router()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "88eb82a6106c36",
    pass: "4250307e533cf7",
  },
});

router.get("/prices/btc", async(request,response)=>{
    const {date, offset, limit} = request.query;

    console.log(date,offset,limit);
})

module.exports = router;