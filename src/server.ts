import app from "./app";

const Port = process.env.PORT || 5000;


function server() {
   app.listen(Port, () => {
    console.log(`server is running on port: ${Port}`);
    
    
   })
}



server();