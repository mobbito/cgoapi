import ngrok from 'ngrok';
import app from './app';

app.listen(3333);

ngrok.connect(3333).then((url) => {
  console.log(`Server forwarded to public url ${url}`);
});
