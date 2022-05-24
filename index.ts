import {app} from './dist/server';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Application is started on localhost:${port}`);
});
