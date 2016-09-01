'use strict'

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Main from '../components/pages/Main'
import Home from '../components/pages/Home'
import NoMatch from '../components/pages/NoMatch'

export default (
	<Route path="/" component={Main}>
		<IndexRoute component={Home} />
		<Route path="*" component={NoMatch} />
	</Route>
)
