import React from 'react';
import routes from '../routes/routes'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import AppBar from "../components/Appbar";
import configureStore from '../reduxstate';
// core components
import theme from './theme';
import Snackbar from '../components/Snackbar';


const Root = (props: any) => {
	return (
		<BrowserRouter>
			<Routes>
                {
                    routes.map((rte:any,key:number)=><Route key={key} path={rte.path} element={rte.component} />)
                }
				<Route path="*" element={<Navigate to ="/user" />}/>
			</Routes>
		</BrowserRouter>
	);
};
const store = configureStore({});
function App(props: any) {
	const { userPreferences } = props;
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<AppBar/>
				<Root />
				<Snackbar />
			</ThemeProvider>
		</Provider>
	);
}

export default App;
