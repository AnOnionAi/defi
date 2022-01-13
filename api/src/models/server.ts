import express, {Application} from "express";
import cors from "cors"
import sushiswapRoutes from "../routes/sushiswap"
import quickswapRoutes from "../routes/quickswap"
class Server {

    private app:Application;
    private port:string;
    private apiPaths = {
        sushiTokens: "/api/sushiswap",
        quickswapTokens: "/api/quickswap"
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "8000";
        this.middlewares();
        this.routes();
    }


    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.apiPaths.sushiTokens,sushiswapRoutes)
        this.app.use(this.apiPaths.quickswapTokens,quickswapRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Server up, Port: ",this.port)
        })
    }
}


export default Server;