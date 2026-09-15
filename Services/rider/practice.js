// if ([] == true) {
//     console.log("presnet");

// }
// else {
//     console.log("absent")
// }

// const res = []
// console.log(res)

// let obj = {
//     a : {
//         b : undefined
//     }
// }
// console.log(obj.a?.b?.c?.d??"Siddiq")

// console.log(Boolean([]))
// console.log(Boolean({}))
// console.log(Boolean(""))
// console.log(Boolean(0))

// console.log("siddiq" - 10)
// console.log("siddiq" * 10)
// console.log("siddiq" / 10)
// console.log("1" + 10 + 1)
// console.log("1" + "1" + 1)

// let arr1 = [1,2,3,4]
// let arr2 = [5,6,7,8]

// let arr3 = [...arr1,...arr2]

// console.log(arr3)

// let arr = ['b', 8, 9, 'c', 2, "siddiq"]
// let numArr = []
// let charArr = []

// const seperateElements = (arr) => {

//     arr.map((elem) => {
//         if (typeof elem === "number") {
//            return numArr.push(elem)
//         }
//         if (elem.length === 1) {
//           return  charArr.push(elem)
//         }
//     })

// }

// seperateElements(arr)
// console.log(numArr)
// console.log(charArr)

// let arr = [1,2,3,4,5,6]

// console.log(arr.map((x) => x === 5))
// console.log(arr.map((x) => x > 5))

// let str = "siddiq";

// let vowels = ["a", "e", "i", "o", "u"];
// let countVowels = [];

// const vowelsCount = (str) => {
//   let count = 0;
//   for (let i = 0; i < str.length; i++) {
//     if (vowels.includes(str[i])) {
//       countVowels.push(str[i]);
//       count++;
//     }
//   }
//   return count;
// };

// console.log(vowelsCount(str));
// console.log(countVowels);

// console.log(typeof NaN)

// let arr = [10,20,30]
// arr[10] = 100
// console.log(arr)

// const abc = {a:100}
// const q = abc
// q.a = 200
// console.log(abc.a)


// console.log([] + [])
// console.log({} + 10)

// function x() {
//     let a = 0;
//     return () => a++
// }

// const y = x()
// console.log(y(), y(), y())

// const m = new Map()

// m['a'] = 10
// m.set("b", 20)

// console.log(m.size)

let arr = [1, 15, 32, 6, 8]

// let sortedArr = arr.sort((a, b) => a - b).reverse()

// console.log(sortedArr[1])

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
        if (arr[i] > arr[j])
            arr[i] = arr[j]
        arr[i]++
    }
}