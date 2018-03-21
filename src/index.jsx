import * as React from 'react'
import {hashHistory, IndexRoute, Route, Router} from 'react-router'
import ReactDOM from 'react-dom'
import Application from './components/Application'
import MainForm from './components/form/MainForm'

require('bootstrap/dist/css/bootstrap.css')
require('bootstrap/dist/css/bootstrap-theme.css')

ReactDOM.render(<Router history={hashHistory}>
	<Route path="/" component={Application}>
		<IndexRoute component={MainForm}/>
	</Route>
</Router>, document.getElementById('app'));
