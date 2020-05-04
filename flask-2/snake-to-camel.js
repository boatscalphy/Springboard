function snakeToCamel(str) {

    while (str.indexOf('_') !== -1) {

        let index = str.indexOf('_');

        let left = str.substring(0, index);
        let right = str.substring(index + 1, str.length);

        right = right.charAt(0).toUpperCase() + right.slice(1)

        str = left + right

    }

    return str

}

