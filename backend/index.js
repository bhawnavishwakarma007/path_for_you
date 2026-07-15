// //index.js

// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const errorHandler = require('./middleware/module1Middleware/errorHandler');
// const adminRoutes = require('./routes/Auth/adminRoutes');
// const jobRoutes = require('./routes/p&r/jobRoutes');
// const AuthRoutes = require("./routes/p&r/AuthRoutes");
// const jobApplyRoutes = require('./routes/p&r/JobApplyRoutes');


// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/admin', adminRoutes);
// app.use('/api', jobRoutes);
// app.use("/api/auth", AuthRoutes);
// app.use('/api/jobs', jobApplyRoutes);


// // Error handling middleware
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


