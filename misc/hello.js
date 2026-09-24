// Ex 1 - product by addition
console.log('\nEXERCISE 1\n')

let multiplicand = 2
let multiplier = 5

let product = 0

for (let i = 0; i < multiplier; i++) {
    product += multiplicand
}


console.log('Final product of ' + multiplicand + ' times ' + multiplier + ' is ' + product)


//Ex 2 - Sum of numbers from 1 to x
console.log('\nEXERCISE 2\n')

let stopSum = 10
let finalSum = 0

for(let i = 1; i <= stopSum; i++) {
    finalSum += i
}

console.log('Sum of all numbers between 1 and ' + stopSum + ' is ' + finalSum)


//Ex 3 - Array element of longest string
console.log('\nEXERCISE 3\n')

let groceryList = ["cherry", "tomato", "raspberry", "apple"]
let indexOfLongestString = 0
let maxLength = 0

for (let i = 0; i < groceryList.length; i++) {
    let elementLength = groceryList[i].length
    if(elementLength > maxLength) {
        indexOfLongestString = i
        maxLength = elementLength
    }
}

console.log(groceryList)
console.log('Index of Longest string in the array is ' + indexOfLongestString + ' which is ' + groceryList[indexOfLongestString])


