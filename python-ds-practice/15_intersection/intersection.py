def intersection(l1, l2):
    """Return intersection of two lists as a new list::
    
        >>> intersection([1, 2, 3], [2, 3, 4])
        [2, 3]
        
        >>> intersection([1, 2, 3], [1, 2, 3, 4])
        [1, 2, 3]
        
        >>> intersection([1, 2, 3], [3, 4])
        [3]
        
        >>> intersection([1, 2, 3], [4, 5, 6])
        []
    """

    lst = []

    if len(l1) >= len(l2):
        for i in range(0,len(l1)):
            if l1[i] in l2:
                lst.append(l1[i])
    else:
        for i in range(0,len(l2)):
            if l2[i] in l1:
                lst.append(l2[i])

    return lst
