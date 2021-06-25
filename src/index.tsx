import ReactDOM from 'react-dom';
import 'tailwindcss/tailwind.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

const catApi: string = process.env.CATS_API!;

axios.defaults.headers.post['x-api-key'] = catApi;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
