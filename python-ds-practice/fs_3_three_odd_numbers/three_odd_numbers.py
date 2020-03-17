def three_odd_numbers(nums):
    """Is the sum of any 3 sequential numbers odd?"

        >>> three_odd_numbers([1, 2, 3, 4, 5])
        True

        >>> three_odd_numbers([0, -2, 4, 1, 9, 12, 4, 1, 0])
        True

        >>> three_odd_numbers([5, 2, 1])
        False

        >>> three_odd_numbers([1, 2, 3, 3, 2])
        False
    """

    if len(nums) > 3:
        for i in range(0,len(nums)-3):
            if (nums[i] + nums[i+1] + nums[i+2]) % 2 == 1:
                return True
    
    else:
        return (nums[0] + nums[1] + nums[2]) % 2 == 1

    return False
    