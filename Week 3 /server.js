// index.js
import { createServer } from 'node:http';

// create an array of objects to store our apps content. 

const content = [
    {
        title: "Welcome to the home page",
        body:"Welcome Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit amet aliquam sunt! ",
        url: "/"
    },
    {
        title: "Welcome to the about page",
        body:"Welcome Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit amet aliquam sunt! ",
        url: "/about"
    },
    {
        title: "Welcome to the contact page",
        body:"Welcome Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit amet aliquam sunt! ",
        url: "/contact"
    },
    {
        title: "Welcome to the Support page",
        body:"Welcome Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit amet aliquam sunt! ",
        url: "/help"
    }

];

function answerRequest(statusCode, contentObj, response) {

    let template = `<!DOCTYPE html>
<html lang="en">
<head>
        <title>${contentObj.title}</title>
</head>
<body>
    <!-- Navigation -->
     <ul>
        <li> <a href="/">Home</a> </li>
        <li> <a href="/about">About Us</a> </li>
        <li> <a href="/contact">Contact Us</a> </li>
        <li> <a href="/help">Support</a> </li>
        <li> <a href="/catalog">Catalog</a> </li>
     </ul>

    <h1>${contentObj.title}</h1>
    <p>
        ${contentObj.body}
    </p>
</body>
</html>`;
    response.writeHead(statusCode, {'Content-Type': 'text/html'});
    response.end(template);

}

const notfound = {
    title: "404 Not Found",
    body:"Content Not found",
};

const server = createServer((req, res) => {

console.log(`Received request for ${req.url}`);
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

const page = content.find((element) => element.url == req.url);

if(page) {
    //display the content
    answerRequest(200, page, res);
} else {
    answerRequest(404,notfound,res); 
}

});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on http://127.0.0.1:3000 to close use cntrl + c');
});

// run with `node index.js`
