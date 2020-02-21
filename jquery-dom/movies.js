let titleSort, ratingSort = 'asc';

$('form').on('submit', submitMovie);
$('table').on('click','td', deleteMovie);
$('table').on('click','th', sortTable);
const movieTitle = $('#movie-title');
const movieRank = $('#movie-rank');

function submitMovie(e) {
    
    if (movieTitle.val().length >=2 && Number(movieRank.val()) >= 0 && Number(movieRank.val()) <= 10) {
        $('tbody').prepend(`
        <tr>
            <td>${movieTitle.val()}</td>
            <td>${Number(movieRank.val())}</td>
            <td>X</td>
        </tr>`)
    
        movieTitle.val("")
        movieRank.val("")
    
        e.preventDefault();
    }
    return false
}

function deleteMovie(e) {
    if (e.target.cellIndex === 2) {
        e.target.parentNode.remove()
    }
}

function sortTable(e) {
    // Sort based on title ascending first.
    let sortedMovies;
    let movies = $('tr:gt(0)')

    if (e.target.cellIndex === 0) {
        sortedMovies = tableSort(movies ,e.target.cellIndex, titleSort)
    }
    // Sort based on rating ascending first
    else if (e.target.cellIndex === 1) {
        sortedMovies = tableSort(movies, e.target.cellIndex, titleSort)
    }
    
    titleSort = titleSort === 'asc' ? 'desc' : 'asc'
    $('tbody').empty();
    [...sortedMovies].forEach(movie => {
        $('tbody').prepend(movie.outerHTML);
    });
}

function tableSort(arr, cellIndex, order) {

    let sortedMovies;
    function innerSort(a, b) {
        return a.cells[cellIndex].textContent.localeCompare(b.cells[cellIndex].textContent);
    }

    if (cellIndex === 0) {

        sortedMovies = arr.sort(innerSort);

        if (order === 'asc') {
            return [...sortedMovies].reverse();
        }

        else {
            return sortedMovies;
        }
    }

    else {
        
        sortedMovies = arr.sort((a,b) => {
            return Number(a.cells[1].textContent) - Number(b.cells[0].textContent)
        });

        if (order === 'asc') {
            return [...sortedMovies].reverse()
        }

        else return sortedMovies;
    }
}

