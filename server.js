const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// anytime a user navigates to the '<>/api' endpoint, use the apiRoutes
app.use('/api', apiRoutes);
// anytime a user navigates to the '/' endpoint, use the htmlRoutes
app.use('/', htmlRoutes);
// instructs the server that all the files in the public folder are to be static resources
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});