import * as http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const server = http.createServer((req, res) => {
  userRouter(req, res);
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
