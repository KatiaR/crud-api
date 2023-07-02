import * as http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const server = http.createServer((req, res) => {
  userRouter(req, res);

    try {
      userRouter(req, res);
    } catch (error) {
      console.error('Error:', error.message);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Internal Server Error');
    }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
