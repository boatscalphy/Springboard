const $name = $('#name');
const $year = $('#year');
const $email = $('#email');
const $color = $('#color');
const $errors = $('b');
const $errName = $('#name-err');
const $errYear = $('#year-err');
const $errEmail = $('#email-err');
const $errColor = $('#color-err');
const $results = $('#lucky-results')

/** processForm: get data from form and make AJAX call to our API. */

async function processForm(evt) {

    evt.preventDefault();
    params = {
        name: $name.val(),
        year: $year.val(),
        email: $email.val(),
        color: $color.val()
     }

     $results.empty();
     $errors.empty();
     $results.append('<p>Retrieving results...</p>');

     try {
        let res = await axios.post('/api/get-lucky-num', params)
        res = res.data
        handleResponse(res)
     }

     catch (e) {
         console.dir(e)
     }
}

/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(resp) {
    $results.empty()
    if (resp.errors) {
        let errors = resp.errors;
        
        $errName.html(errors.name);
        $errYear.html(errors.year);
        $errEmail.html(errors.email);
        $errColor.html(errors.color);

    }

    else {
        let numResults = resp.num;
        let yearResults = resp.year;
        $results.append(
            `<p>Your lucky number is ${numResults.num}: ${numResults.fact}</p>
            <p>Your birth year (${yearResults.num}) fact is: ${yearResults.fact}`
        );
    }
}

$("#lucky-form").on("submit", processForm);
