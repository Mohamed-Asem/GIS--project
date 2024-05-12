const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pzqkoyg.mongodb.net/GIS-project`
  )
  .then(() => console.log('DB connected successfully'));

app.listen(process.env.port, () => {
  console.log(`server now listen on port ${process.env.PORT}`);
});
