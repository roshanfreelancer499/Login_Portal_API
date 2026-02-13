import express from 'express';

const app = express();

app.get('', (req, res, next) => {
    res.send('Hello Express');
});

app.listen(8000, () => {
    console.log("Application is running on port localhost:8000");
});
