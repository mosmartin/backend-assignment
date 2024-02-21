import * as dotenv from "dotenv";

import app from "./app";
import { connectToDatabase } from "./db/dbConn";

dotenv.config();

(async () => {
  try {
    await connectToDatabase();

    const port = process.env.PORT ?? 3000;

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {}
})();
