def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    to_swap = to_swap.lower()
    string = ""
    for i in range(0,len(phrase)):
        if (phrase[i] == to_swap and phrase[i].lower() == to_swap):
            string = string + phrase[i].upper()
        elif (phrase[i].lower() == to_swap):
            string = string + phrase[i].lower()
        else:
            string = string+ phrase[i]
    return string

