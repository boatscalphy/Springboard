def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    
    reverse = ''
    for i in range(len(phrase)-1, -1, -1):
        reverse = reverse + phrase[i]
    
    return reverse