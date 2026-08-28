const listen = async (app) => {
    try {
        const port = process.env.PORT;
        if(!app){
            console.log("Express is missing ");
        }
        if(!port){
            console.log("port is missing");
        }
        app.listen(port,()=>{
            console.log(`server is running on port ${port}`);
        });

    } catch (err) {
        console.log("Error in the server connected faild")
    }
}
module.exports = listen;