def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """
    new_lst = []

    for item in lst:
        if not item:
            continue
        else:
            new_lst.append(item)

    return new_lst