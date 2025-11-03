// import dotenv from 'dotenv';
// dotenv.config();
// import { fileURLToPath } from 'url';
// import express from 'express';
// import cors from 'cors';
// import foodRouter from './routers/food.router.js';
// import userRouter from './routers/user.router.js';
// import orderRouter from './routers/order.router.js';
// import uploadRouter from './routers/upload.router.js';
// import path from "path";

// import {dbconnect}  from './config/database.config.js';
// import path, { dirname } from 'path';
// dbconnect();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// app.use(express.json());
// app.use(
//   cors({
//     credentials: true,
//     origin: ['http://localhost:3000'],
//   })
// );

// app.use('/api/foods', foodRouter);
// app.use('/api/users', userRouter);
// app.use('/api/orders', orderRouter);
// app.use('/api/upload', uploadRouter);

// const publicFolder = path.join(__dirname, 'public');
// app.use(express.static(publicFolder));

// app.get('*', (req, res) => {
//   const indexFilePath = path.join(publicFolder, 'index.html');
//   res.sendFile(indexFilePath);
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log('listening on port ' + PORT);
// });

import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import path from 'path';

import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';
import uploadRouter from './routers/upload.router.js';
import { dbconnect } from './config/database.config.js';

dbconnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

//  CORS for both local dev & production
app.use(
  cors({
    credentials: true,
    origin: [
      'https://food-website-cp9b.onrender.com', // change this later
    ],
  })
);

// API Routes
app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

// Serve frontend in production
// if (process.env.NODE_ENV === 'production') {
//   const frontendPath = path.join(__dirname, '../frontend/build');
//   app.use(express.static(frontendPath));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(frontendPath, 'index.html'));
//   });
// } else {
//   // For development
//   app.get('/', (req, res) => {
//     res.send('API is running...');
//   });
// }
// app.use(express.static(path.join(__dirname, "frontend", "dist" , "index.html")))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
