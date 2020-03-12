def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    str1 = str(num1)
    str2 = str(num2)
    dic1 = {}
    dic2 = {}
    if not (len(str1) == len(str2)):
        return False
    else:
        for i in range(0,len(str1)):
            if str1[i] in dic1:
                dic1[str1[i]] += 1
            else:
                dic1[str1[i]] = 0

            if str2[i] in dic2:
                dic2[str2[i]] += 1
            else:
                dic2[str2[i]] = 0

    return dic1 == dic2
