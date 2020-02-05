//Part 1
//randomly assign cards
 
//Part 2
//There can only be two active classes present between all 24 cards. Check before allowing additional cards to be flipped
//Assign card with a class of active when clicked.
//Once card is flipped assign it a value of active
 
//Once there are two active classes present check the background image of the two classes.
//if they match toggle on matched class. If they don't match remove the active class and toggle the flipped class (setTimeout to add delay);
//Append the attempts by a value of 1.
 
//Part 3
//if all cards contain a matched class update high score with the number of attempts if number of attempts is lower than high score

const newGame = document.querySelector('button');
const highScore = document.querySelector('.high-score');
const cards = document.querySelectorAll('.card');
const attempts = document.querySelector('h1');
let activeCards = 0;
let cardsSelected = [];
let remainingMatches = 12;

function init () {
    
    //declaring variables in function scope/ resetting variables;
    activeCards = 0;
    cardsSelected = [];
    remainingMatches = 12;
    let randomInd, img;
    let attempts = document.querySelector('h1');
    let arr = [
        'http://static.ddmcdn.com/en-us/apl/breedselector/images/breed-selector/dogs/breeds/shiba-inu_01_lg.jpg',
        'http://static.ddmcdn.com/en-us/apl/breedselector/images/breed-selector/dogs/breeds/shiba-inu_01_lg.jpg',
        'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/25201637/day_2_dec_14_085.jpg',
        'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/25201637/day_2_dec_14_085.jpg',
        'https://s3.amazonaws.com/petcentral.com/wp-content/uploads/2019/10/23135557/siberian-husky-large-shutterstock-529869769-copy.jpg',
        'https://s3.amazonaws.com/petcentral.com/wp-content/uploads/2019/10/23135557/siberian-husky-large-shutterstock-529869769-copy.jpg',
        'https://bowwowinsurance.com.au/wp-content/uploads/2018/10/german-shepherd-700x700.jpg',
        'https://bowwowinsurance.com.au/wp-content/uploads/2018/10/german-shepherd-700x700.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3efr_kxm8IGLe49fAu3KB4AvCWVBKEXPVvUmwU7AqnB2Zmu5x&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3efr_kxm8IGLe49fAu3KB4AvCWVBKEXPVvUmwU7AqnB2Zmu5x&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtUb8svmr2rcbhUQ7h0ZUGDQpaxBIbPHDK9zIQHegFdwE8xI8WDQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtUb8svmr2rcbhUQ7h0ZUGDQpaxBIbPHDK9zIQHegFdwE8xI8WDQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3h-lvnplsO12RgYPsCDPc4tfHRPS0A-mJwHFNfQ2fbGeyvmS8&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3h-lvnplsO12RgYPsCDPc4tfHRPS0A-mJwHFNfQ2fbGeyvmS8&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLMszDya2MrS7vNsHZ7B27m2ZyIb2UgdOr4iXNXIGb9ULfuZSJHw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLMszDya2MrS7vNsHZ7B27m2ZyIb2UgdOr4iXNXIGb9ULfuZSJHw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99pdVya6yApU38iKrqyNT2AtyLit2UU9_LQOQQm6z6TfK5bpGKw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99pdVya6yApU38iKrqyNT2AtyLit2UU9_LQOQQm6z6TfK5bpGKw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFS-glA0j4lc6ZZUhY4LzhzI_07bogJJoTBIodivev2MkCpmlBgg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFS-glA0j4lc6ZZUhY4LzhzI_07bogJJoTBIodivev2MkCpmlBgg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT08nzmXxCPLprxda5gyJnVdK6LiQnslN8mm9qY-zHWQ2_PUOk&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT08nzmXxCPLprxda5gyJnVdK6LiQnslN8mm9qY-zHWQ2_PUOk&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNIIs5MMepJDpcesueWMBJA98Z7q_7FHU2-HkYzZ1OrQJeKsa2rw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNIIs5MMepJDpcesueWMBJA98Z7q_7FHU2-HkYzZ1OrQJeKsa2rw&s'
    ];

    //Reset attempt counter
    attempts.innerText = 0;
    //Flip all cards back down if any are facing up
    //Set up card images for matching
    for (card of cards) {
        card.classList.remove('flipped');
    }
    //Add a delay to account for the transition of the card flip before assigning card images
    setTimeout(() => {
        for (card of cards) {
            randomInd = Math.floor((Math.random() * arr.length))
            img = arr.splice(randomInd,1)[0];
            card.lastElementChild.style.backgroundImage = `url('${img}')`;
        };

    }, 1000)
    
}

//Add event listeners
//New Game button
newGame.addEventListener('click',init);

//Card flips
[...cards].forEach(card => {
    card.addEventListener('click', (e) => {

        if (!card.classList.contains('active')) {
            card.classList.toggle('flipped');
            card.classList.add('active');
            cardsSelected[activeCards] = card;
            activeCards++;
        }

        if (activeCards === 2 && cardsSelected[0].lastElementChild.style.backgroundImage === cardsSelected[1].lastElementChild.style.backgroundImage) {
            cardsSelected = [];
            activeCards = 0;
            attempts.innerText = parseInt(attempts.innerText) + 1;
            remainingMatches--;
        }

        else if (activeCards === 2) {
            attempts.innerText = parseInt(attempts.innerText) + 1;
            setTimeout(() => {
                cardsSelected.forEach(card => {
                    card.classList.remove('active');
                    card.classList.remove('flipped');
                })
                cardsSelected = [];
                activeCards = 0;
            }, 1000)
        }

        if (remainingMatches === 0) {
            if (!parseInt(highScore.innerText) || parseInt(attempts.innerText < parseInt(highScore.innerText))){
                highScore.innerText = attempts.innerText;
            }
        }

    })
})

init()