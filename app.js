/*let http = require ('http');

let start = (req,res)=>{
   
    if(req.method == "GET"){
        res.writeHead(200,{'content-type': 'text/html'});
    res.end("<h1> GET<h1>");

    } else{
       
        res.end("<h1> Post<h1>")
    
    }
}


let server = http.createServer(start)


server.listen(3000,function(){

    console.log("Server is running")
})

*/

let http = require ('http');

let url = require ('url');

require('dotenv').config();

let routes = {

    "GET" : {
        "/" : (req,res,params)=>{

            res.writeHead(200,{"content-type": "text/html"});
            res.end("This test");
        },
        "/about" : (req,res,params)=>{

            res.writeHead(200,{'content-type':'text/html'});
            res.end('<h1>This is get and ${params.query.name} and ${params.query.age} /about</h1>');

        }
        
    },

    "POST" : {

        "/" : (req,res,params)=>{
            res.writeHead(200,{'content-type': 'text/html'});
            res.end("<h1> This is post and /<h1>")
        },
        "/about": (req,res,params)=>{
            res.writeHead(200,{'content-type': 'text/html'});
            res.end("<h1>This is post and /about</h1>")
        },
    },
        "NA" : (req, res,params) => {
            res.writeHead(404);
            res.end("<h1>This is no page</h1>")
        },
        
    
    

}

let start  = (req,res)=>{

    let reqMethod = req.method;
let params = url.parse(req.url, true);

let name = params.query.name;
  let resolveRoute =  routes[reqMethod][params.pathname];



if(resolveRoute != null && resolveRoute != undefined){
    resolveRoute(req,res,params);
  }else {
    routes["NA"](req, res,params);
  }
}

let server = http.createServer(start)

server.listen(process.env.PORT,()=>{

    console.log('server is running ${process.env.PORT}');
});
