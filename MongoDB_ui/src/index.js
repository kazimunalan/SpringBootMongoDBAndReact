import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import {Application} from "robe-react-commons";

//        axios.get("http://127.0.0.1:8081/rest/user")


Application.setBaseUrlPath("http://127.0.0.1:8081/");
Application.getProps().set("ROOT.PATH", "/");

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
