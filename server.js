

const express = require("express")
const app = express()
const PORT = 3000
const logRequest = require("./middleware/log-request")
const capitalize = require("./middleware/capitalize")
//middleware
app.use(logRequest)



app.get("/", (req, res) => {
  res.send("Hello, World!")
})

app.get("/hello/:name", capitalize, (req, res) => {
  res.send(`Hello, ${req.params.name}!`)
})

app.get("/weekdays/:weekday", (req,res) =>{
    const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    ]
    res.send(weekdays[req.params.weekday-1])

})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})