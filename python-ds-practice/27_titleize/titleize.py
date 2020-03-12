def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """

    lst = []
    
    for word in phrase.split():

        lst.append(word[0].upper() + word[1::].lower())

    return ' '.join(lst)