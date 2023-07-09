import ReactDOM from 'react-dom/client';
import './index.css';
import AppRedux from "./AppRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";
import AppReducer from "./AppReducer";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<Provider store={store}><AppRedux/></Provider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

