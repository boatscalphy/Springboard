function starOutGrid(grid) {

    let col = []
    let fillRow = false

    for (i in grid) { // row
        for (j in grid[i]) { //column

            if (grid[i][j] === "*") {
                col.push(j)
                fillRow = true
            }
        }
        if (fillRow) {
            grid[i].fill('*')
            fillRow = false
        }
    }
    for (ind of col) {
        for (row of grid) {
            row[ind] = '*'
        }
    }
    return grid

}
