(function() {
    const $giphySearch = $('input');
    const $searchBtn = $('#search-btn');
    const $removeBtn = $('#remove-btn');
    const $giphySpace = $('.giphy-space');

    $removeBtn.on('click', clearGiphy);
    $searchBtn.on('click', submitGiphy);
    $giphySearch.on('keydown', evt => {
        if (evt.keyCode === 13 && $giphySearch.val()) {
            submitGiphy()
        }
    });

    searchURL = 'http://api.giphy.com/v1/gifs/search?q='
    APIKEY = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
    function clearGiphy() {
        $giphySpace.empty();
    }

    function addGiphy(giphy) {
        $giphySpace.append(giphy)
    }

    function createGiphy(url) {
        const img = document.createElement('img');
        img.src = url
        img.classList.add('giphy');
        return img
    }

    async function submitGiphy() {
        const searchTerm = $giphySearch.val();
        try {
            let response = await axios.get(`${searchURL}${searchTerm}&api_key=${APIKEY}`);
            response = response.data

            if (response.data.length) {
                //Select random giphy
                response = response.data[Math.floor((Math.random() * response.data.length + 1))]
                const img = createGiphy(response.images.downsized.url);
                addGiphy(img)
            }

            else {
                alert(`No giphy of search term: ${searchTerm} found.`)
            }
        }

        catch (e) {
            throw(e)
        }

        $giphySearch.val('');
    }
})()
