import cors from "cors";
import dotenv from "dotenv";

dotenv.config({path: '../.env'});

const app = express();

app.use(express.json());
app.use(cors());

export default app;