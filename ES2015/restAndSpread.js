// function filterOutOdds() {
//     var nums = Array.prototype.slice.call(arguments);
//     return nums.filter(function(num) {
//       return num % 2 === 0
//     });
//   }

  const filterOutOdds = () => {
      const num = [...arguments].filter(num => {
          return num % 2 === 0;
      });

      return num;
  }

const findMin = () => {
    return Math.min([...arguments]);
};

const mergeObjects = (obj1, obj2) => {
    return {...obj1, ...obj2};
}

const doubleAndReturnArgs = (arr, ...num)  => {
    let newArr = [...arr];
    for (value of num) {
        newArr = newArr.concat(value*2);
    }

    return newArr;
}

/** remove a random element in the items array
and return an array without that item. */

const removeRandom = items => {
    let newArr = [...items];
    newArr.splice(Math.floor(Math.random()*items.length+1),1);

    return newArr;
}

/** Add every item in array2 to array1. */

const extend = (array1, array2) => {
    return [...array1, ...array2];
}

/** Add a new key/val to an object. */

const addKeyVal = (obj, key, val) => {
    let newObj = {...obj};
    newObj[key] = val;

    return newObj;
}

/** Remove a key from an object. */

const removeKey = (obj, key) => {
    let newObj = obj;
    delete newObj[key]
    return newObj;
}


/** Combine two objects. */

const combine = (obj1, obj2) => {
    return {...obj1, ...obj2};
}

/** Update an object, changing a key/value. */

const update = (obj, key, val) => {
    return {...obj, [key]:val};
}