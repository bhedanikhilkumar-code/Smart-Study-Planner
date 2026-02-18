import app from './app.js';
import { connectDB } from './utils/db.js';
import { env } from './utils/env.js';

const start = async () => {
  await connectDB(env.MONGO_URI);
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

start().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
