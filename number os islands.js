/**
 * LeetCode Problem: 200. Number of Islands
 * https://leetcode.com/problems/number-of-islands/
 * 
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.

 **/

var markAdjacents = function (grid, i, j, visitedIslands, land) {
    for (let k = i - 1; k >= 0; k--) {
        if (grid[k][j] == 1 && visitedIslands[k][j] == 0) {
            visitedIslands[k][j] = land;
            markAdjacents(grid, k, j, visitedIslands, land)
            maxI = k;
        } else {
            break;
        }
    }

    for (let k = i + 1; k < grid.length; k++) {
        if (grid[k][j] == 1 && visitedIslands[k][j] == 0) {
            visitedIslands[k][j] = land;
            markAdjacents(grid, k, j, visitedIslands, land)
            maxI = k;
        } else {
            break;
        }
    }

    for (let k = j + 1; k < grid[0].length; k++) {
        if (grid[i][k] == 1 && visitedIslands[i][k] == 0) {
            visitedIslands[i][k] = land;
            markAdjacents(grid, i, k, visitedIslands, land)
        } else {
            break;
        }
    }

    for (let k = j - 1; k >= 0; k--) {
        if (grid[i][k] == 1 && visitedIslands[i][k] == 0) {
            visitedIslands[i][k] = land;
            markAdjacents(grid, i, k, visitedIslands, land)
        } else {
            break;
        }
    }
};


/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    const visitedIslands = [[]];
    let land = 1;

    //marking the auxiliar array as unvisited 
    for (let i = 0; i < grid.length; i++) {
        visitedIslands[i] = [];
        for (let j = 0; j < grid[0].length; j++) {
            visitedIslands[i][j] = 0;
        }
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == 1) { // is part of island
                if (visitedIslands[i][j] == 0) { // is unvisited
                    visitedIslands[i][j] = land
                    land++;
                }
                markAdjacents(grid, i, j, visitedIslands, visitedIslands[i][j]); //mark the full island
            }
        }
    }

    return land - 1;
};


console.log(numIslands([["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]]));
console.log(numIslands([["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]]));
console.log(numIslands([["1", "1", "1"], ["0", "1", "0"], ["1", "1", "1"]]));
console.log(numIslands([
    ["1", "1", "1", "1", "1", "0", "1", "1", "1", "1"],
    ["1", "0", "1", "0", "1", "1", "1", "1", "1", "1"],
    ["0", "1", "1", "1", "0", "1", "1", "1", "1", "1"],
    ["1", "1", "0", "1", "1", "0", "0", "0", "0", "1"],
    ["1", "0", "1", "0", "1", "0", "0", "1", "0", "1"],
    ["1", "0", "0", "1", "1", "1", "0", "1", "0", "0"],
    ["0", "0", "1", "0", "0", "1", "1", "1", "1", "0"],
    ["1", "0", "1", "1", "1", "0", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "0", "1"],
    ["1", "0", "1", "1", "1", "1", "1", "1", "1", "0"]]));