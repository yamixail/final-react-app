'use strict'

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Filter from './Filter'
import GenreMovies from './GenreMovies'
import Home from './Home'
import Main from './Main'
import NoMatch from './NoMatch'
import Search from './Search'
import TopRated from './TopRated'

export default (
	<Route path="/" component={Main}>
		<IndexRoute component={Home} />
		<Route path="filter" component={Filter} />
		<Route path="genre/:genreId" component={GenreMovies} />
		<Route path="search" component={Search} />
		<Route path="top" component={TopRated} />
		<Route path="*" component={NoMatch} />
	</Route>
)
