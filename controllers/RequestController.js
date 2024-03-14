import { readFileSync } from 'fs';
import  {getContentTypeFrom} from '../public/script/getContentTypeFrom.js';

export default class RequestController{
    response;
    request;
    url;
    constructor(request,response){
        this.request = request;
        this.response = response;
        this.url=new URL(this.request.url,"https://localhost:8080");


    }

    prepareResponse(contenType){
        this.response.setHeader('Content-Type', contenType);
       
    }

    getRessources(path){
        try{
            const resource=readFileSync(path);
            this.response.statusCode=200;
            this.response.write(resource);
            this.response.end();
        }
        catch(err){
            this.statusCode=404;
            this.response.write('erreur');
            this.response.end();
        }
      
    }
    
    handleRequest(){
        if (this.url.pathname == "/" ) {
            this.prepareResponse("text/html");
            this.getRessources("./public/Accueil.html");
        }
        else if (this.url.pathname.startsWith("/About")) {
            this.prepareResponse("text/html");
            this.getRessources("./public/About.html");
        }
        else if (this.url.pathname.startsWith("/Pfc")) {
            //console.log(this.url.pathname)
            this.getRessources("./public/Pfc.html");
        }
        else {
            this.prepareResponse(getContentTypeFrom(this.url.pathname));
            //console.log(this.url.pathname);
            this.getRessources("."+this.url.pathname);
            //this.getRessources("public/Error.html");
        }
    
    }


}