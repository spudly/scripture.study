import express from 'express';
import router from './router';

const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(express.static('build/public', {index: false})).use(router);

app.listen(PORT, () => {
  console.log(`Listening @ http://localhost:${PORT}`);
});
