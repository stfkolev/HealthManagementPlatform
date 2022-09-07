import { HeaderLine } from './components/common/Header';
import './App.css';

import HomePage from './components/pages/HomePage';
import { PageNotFound } from './components/common/PageNotFound';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import { GendersPage } from './components/pages/GendersPage';
import { GradesPage } from './components/pages/GradesPage';
import { StudentsPage } from './components/pages/StudentsPage';

const { Content } = Layout;

function App() {
	return (
		<>
			<head>
				<title>asd</title>
			</head>
			<HeaderLine />

			<Content
				className='site-layout'
				style={{ padding: '0 50px', marginTop: 64 }}>
				<Switch>
					<Route path='/' exact component={HomePage} />
					<Route path='/grades' exact component={GradesPage} />
					<Route path='/genders' exact component={GendersPage} />
					<Route path='/students' exact component={StudentsPage} />
					<Route component={PageNotFound} />
				</Switch>
			</Content>
		</>
	);
}

export default App;
