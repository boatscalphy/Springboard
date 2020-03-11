def print_upper_words(list, must_start_with = {'h', 'y'}):
    """ function will print out words that begin with with letters specified in the set
    """

    for word in list:
        if word[0] in must_start_with:
            print(word.upper())

print_upper_words(["hello", "hey", "goodbye", "yo", "yes"], must_start_with={"h", "y"})