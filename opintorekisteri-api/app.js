const express = require('express');
const app = express();
const opiskelijaRoutes = require('./routes/opiskelijaRoutes');
const arviointiRoutes = require('./routes/arviointiRoutes');
const opintojaksoRoutes = require('./routes/opintojaksoRoutes');

// Middleware
app.use(express.json());

// Reitit
app.use('/opiskelijat', opiskelijaRoutes);
app.use('/arvioinnit', arviointiRoutes);
app.use('/opintojaksot', opintojaksoRoutes);

// K�ynnistet��n palvelin
const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Palvelin k�ynniss� portissa ${PORT}`);
});