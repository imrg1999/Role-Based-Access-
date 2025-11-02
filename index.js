import express from 'express';
import { connectDB } from './Config/connectDB.js';
import userRoutes from './Route/userRoutes.js';

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/app',userRoutes);

app.get('/',(req,res) => {
    res.status(200).json({
        message: "Welcome to Homepage"
    })
});

app.listen(port,() => {
    console.log(`Server is listening on port no.:${port}`);
});