'use strict'

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import About from './About'
import Filter from './Filter'
import GenreMovies from './GenreMovies'
import Home from './Home'
import Main from './Main'
import MovieItem from './MovieItem'
import NoMatch from './NoMatch'
import Person from './Person'
import Search from './Search'
import TopRated from './TopRated'

export default (
	<Route path="/" component={Main}>
		<IndexRoute component={Home} />
		<Route path="about" component={About} />
		<Route path="filter" component={Filter} />
		<Route path="genre/:genreId" component={GenreMovies} />
		<Route path="movie/:movieId" component={MovieItem} />
		<Route path="person/:personId" component={Person} />
		<Route path="search" component={Search} />
		<Route path="top" component={TopRated} />
		<Route path="*" component={NoMatch} />
	</Route>
)
