'use strict'

// width can be one of
// "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
// "profile_sizes": ["w45", "w185", "h632", "original" ]
function getImgSrc(path, width) {
    return location.protocol + '//image.tmdb.org/t/p/' + width + path
}

let cache = new Map

function sendRequest (path, oParams = {}) {
    const url = new URL(location.protocol + '//api.themoviedb.org/3' + path)

    url.searchParams.append('api_key', '6a0faa2a8c71b6075d8fca40823c3a6d')

    for (let key in oParams)
            url.searchParams.append(key, oParams[key])

    if (cache.has(url.href))
        return cache.get(url.href)


    // Promise wrapper for prevent call response.json twice or more times
    const jsonPromise = new Promise(function (resolve, reject) {
        fetch(url)
            .then(response => {
                if (!response.ok)
                    throw new Error(response.statusText)

                resolve(response.json())
            })
            .catch(reject)
    })

    cache.set(url.href, jsonPromise)

    return jsonPromise
}

export {getImgSrc}

export default sendRequest;
