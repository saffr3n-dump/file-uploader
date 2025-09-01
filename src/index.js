import app from './core/app.js';

const port = Number(process.env.PORT || '3000');
app.listen(port, (err) => {
  if (err) throw err;
  console.info(`Server started on port ${port}`);
});
