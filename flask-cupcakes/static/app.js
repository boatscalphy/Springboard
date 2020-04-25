const $cupcakes = $('#cupcake_container');
const $flavor = $('input[name=flavor]')
const $size = $('select')
const $rating = $('input[name=rating]')
const $imageURL = $('input[name=image]')
const $submitBtn = $('#create_cupcake')
const $form = $('form')

async function getCupcakes() {

    try {
        let res = await axios.get('/api/cupcakes');
        res = res.data.cupcakes
        for (cake of res) {
            createCupcake(cake);
        }
    }

    catch (e) {
        console.log(e);
    }

}

async function createCupcake(cake) {

    let html = `
        <div class="cupcake">
            <h4>${cake.flavor}</h4>
            <img src="${cake.image}" alt="${cake.flavor}">
            <ul>
                <li>Rating: ${cake.rating}</li>
                <li>Size: ${cake.size}</li>
            </ul>
        </div>`
    $cupcakes.append(html)
    }

$form.on('submit', async (evt) => {
    evt.preventDefault()
    try {
        res = await axios.post('/api/cupcakes', {
            flavor:$flavor.val(),
            size: $size.val(),
            rating: Number($rating.val()),
            image: $imageURL.val()
        });     
        res = res.data.cupcake
        createCupcake(res)
    }

    catch (e) {
        console.log(e)
    }

})

getCupcakes()