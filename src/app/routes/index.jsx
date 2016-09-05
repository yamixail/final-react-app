'use strict'

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Main from './Main'
import Home from './Home'
import Search from './Search'
import TopRated from './TopRated'
import GenreMovies from './GenreMovies'
import NoMatch from './NoMatch'

export default (
	<Route path="/" component={Main}>
		<IndexRoute component={Home} />
		<Route path="search" component={Search} />
		<Route path="top" component={TopRated} />
		<Route path="genre/:genreId" component={GenreMovies} />
		<Route path="*" component={NoMatch} />
	</Route>
)
