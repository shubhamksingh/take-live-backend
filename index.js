// epress server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./Routes/auth');
const eventRoute = require('./Routes/events');  
mongoose.set('strictQuery', false);
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/auth', authRoute);
app.use('/events', eventRoute);
app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

mongoose.connect('mongodb+srv://abcd:1234@cluster0.txw2hah.mongodb.net/playo', {useNewUrlParser: true, useUnifiedTopology: true}).then(res=>{
    console.log('connected to db');
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
        }
    );
}
).catch(err=>{
    console.log(err);
});



