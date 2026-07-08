const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const PORT = 3001;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

app.use(express.static(path.join(__dirname, "public")));



let listProducts = [
            { id:1, nombre: "Landing Page", precio: 99990, destacado:false },
            { id:2, nombre: "Sitio Corporativo", precio: 199990, destacado: true },
            { id:3, nombre: "Ecommerce", precio: 159990, destacado: false }
        ];

app.get("/",(req, res) => {
    res.render("home", {
        titulo: "Servicios Digitales",
        usuario: "Fabián Torres"
    });
});

app.get("/about",(req, res) => {
    res.render("about", {
        titulo: "Servicios Digitales",
        usuario: "Fernando"
    });
});

app.get("/products",(req, res) => {
    res.render("products", {
        titulo: "Servicios Digitales",
        productos: listProducts
    });
});

app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const producto = listProducts.find((prod) => prod.id === id);
    if(!producto) {
        return res.status(404).send("Producto no encontrado");
    }
    res.render("detalle", {
        titulo: "Detalle del producto",
        producto: producto
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`);
});