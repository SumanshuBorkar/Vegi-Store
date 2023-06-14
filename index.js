const fs = require('fs');


//Blocking syncronus way!!!
// const input = fs.readFileSync("./input.txt" , 'utf-8');
// console.log(input);
// fs.writeFileSync('./Output.txt', input)

//Non-Blocking asyncronus way!!!
fs.readFile('./input.txt' , 'utf-8' , (err, data1)=>{
    if(err) return console.log('Error ☢️');
    fs.readFile(`./${data1}.txt`, 'utf-8', (err, data2)=>{
        console.log(data2);
    });
});
console.log('will show first');


//