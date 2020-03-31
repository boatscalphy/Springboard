console.log('working');
const $boggleForm = $('#boggle-form');
const $input = $('input');
const $time = $("#time")
const $playerScore = $('#player-score');
const words = [];
let timer = 60;
$boggleForm.submit( async function(e) {
    
    e.preventDefault();
    
    if ($input.val().length > 0 && timer !== 0) {
        try {
            response = await axios.post('/submit_word', {'test-word': $input.val().toLowerCase()})
            response = response.data.result

            if (response === 'ok' && !(words.includes($input.val().toLowerCase()))) {
                $playerScore.text(Number($playerScore.text()) + Number($input.val().length))
                words.push($input.val().toLowerCase())
            }

        }
        
        catch (e) {
            console.log(e)
        }
        
        $input.val('')
    }
})

async function countDown(){
    intervalID = setInterval( () => {

        if (timer > 0) {
            timer--
            $time.text(timer)
        }

        else {
            $input.prop('disabled',true)
            $input.val('Times up!')
            clearInterval(intervalID)
        }
    }, 1000)
}

countDown()