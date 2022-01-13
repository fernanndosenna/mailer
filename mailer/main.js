var express = require("express")
var app = express()
var router = require("./routes")
var cors = require("cors")


//cors
app.use(cors());


app.use("/",router);


const port  = 8080

app.listen(port, () => {
    console.log(`Connect por: ${port}`);
})

