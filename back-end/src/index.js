import { app } from "./app.js";
import { Dbconnect } from "./db/index.js";

await Dbconnect();
app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
