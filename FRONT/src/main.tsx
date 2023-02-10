import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import Board from 'pages/Board';

import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ToastContainer />
		<Board />
	</React.StrictMode>,
);
