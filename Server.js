const http = require('http');
const fs = require('fs');
const url = require('url');
const slugify = require('slugify');


const tempOverview = fs.readFileSync(`${__dirname}/Temp-Overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/Temp-Product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/Temp-Card.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

               // Create a Function //

const replaceTemplet = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g , product.productName);
    output = output.replace(/{%FROM%}/g , product.from);
    output = output.replace(/{%NUTRIENTS%}/g , product.nutrients);
    output = output.replace(/{%QUANTITY%}/g , product.quantity);
    output = output.replace(/{%PRICE%}/g , product.price);
    output = output.replace(/{%IMAGE%}/g , product.image);
    output = output.replace(/{%DESCRIPTION%}/g , product.description);
    output = output.replace(/{%ID%}/g , product.id);
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}
const slugs = dataObj.map((el)=> slugify(el.price, {lower: true}));
console.log(slugs);

                // // Creating A Server // //

const server = http.createServer((req, res) => { 
  const {query, pathname} = url.parse(req.url, true);
  
                  // Overview page //

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const cardsHtml = dataObj.map(el=>{
      return replaceTemplet(tempCard, el)
    }).join('');
    const Output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(Output);
  } 
                  // Product Page //

  else if (pathname === '/product') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplet(tempProduct, product);
    res.end(output);
  }
  
                  // Contact page //
  else if (pathname === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end();
  }
  
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Page not Found!</h1>');
  }
});

server.listen(5000, '0.0.0.0', () => {
  console.log('Server is listening on port 5000');
});
