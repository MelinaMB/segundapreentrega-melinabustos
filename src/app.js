import express from "express";
import { productsRouter } from './routes/products.routers.js';
import { cartsRouter } from './routes/carts.router.js';
import { viewsRouter } from "./routes/views.router.js";
import { messagesRouter } from "./routes/messages.router.js";
import { __dirname, connectMongo, connectSocket, connectSocketChat } from "./utils.js";
import path from "path";
import handlebars from "express-handlebars";
import {cartViewRouter} from './routes/cartView.router.js'


const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine('handlebars', handlebars.engine());
app.set("view engine", 'handlebars');
app.set("views", path.join(__dirname, "views"));


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/realTimeProducts", viewsRouter);
app.use("/products", viewsRouter);
app.use("/test-chat", messagesRouter);
app.use("/carts", cartViewRouter )

connectMongo();
connectSocket(httpServer);
connectSocketChat(httpServer);

app.get('/', (req, res) => {
    return res.status(404).json({
        status: "error",
        msg: "no esta la ruta!!!",
        data: {},
    });
});


