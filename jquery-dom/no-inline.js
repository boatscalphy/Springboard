console.log(`Let's get ready to party with jQuery!`)
$('img').toggleClass('image-center');
$('p').last().remove();
$('h1').css({'font-size': `${Math.floor(Math.random() * 101)}px`})
$('li').last().after(`<li>Whatsup!</li>`);
$('aside').empty();
$('aside').append(`<p>Sorry that was a dumb list</p>`)
$('input').on('input', changeBackgroundColor)

function changeBackgroundColor () {
    $('body').css({
        'background-color': `rgb(${Number($('input').eq(0).val())}, ${Number($('input').eq(1).val())}, ${Number($('input').eq(2).val())})`
    })
}

$('img').on('click', function() {
    $(this).remove();
});