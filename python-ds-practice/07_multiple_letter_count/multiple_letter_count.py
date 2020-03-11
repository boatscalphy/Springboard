def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """

    track = {}

    for char in phrase:
        if char in track:
            track[char] = track[char] + 1
        else:
            track[char] = 1

    return track