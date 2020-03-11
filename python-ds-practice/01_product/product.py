def product(a, b):
    """Return product of a and b.

        >>> product(2, 2)
        4

        >>> product(2, -2)
        -4
    """
    if (type(a) == float or type(a) == int) and (type(b) == float or type(b) == int):
        return a * b
    else:
        return "Inputs must be numeric"