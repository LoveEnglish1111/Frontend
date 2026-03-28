import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './src/App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './src/Page/Home.jsx';
import StudySets from './src/Page/StudySets.jsx';
import Community from './src/Page/Community.jsx';
import Profile from './src/Page/Profile.jsx';
import AdminPanel from './src/Page/AdminPanel.jsx';
import SignIn from './src/Page/SignIn.jsx';

import TestComponent from './src/Page/TestComponent.jsx';

console.log("Hello world");
createRoot(document.getElementById('root')).render(
  	<StrictMode>
    	<BrowserRouter>
			<Routes>
				<Route path='/' element={<App/>}>
					<Route path='/' element={<Home/>}></Route>
					<Route path='/StudySets' element={<StudySets/>}></Route>
					<Route path='/Community' element={<Community/>}></Route>
					<Route path='/Profile' element={<Profile/>}></Route>
					<Route path='/AdminPanel' element={<AdminPanel/>}></Route>
				</Route>

				<Route path='/SignIn' element={<SignIn/>}></Route>
				<Route path='/Test' element={<TestComponent/>}></Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)
