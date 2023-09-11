const hamburguesa = document.getElementById("hamburguesa");
const links = document.getElementById("links");
const recetario = document.getElementById("recetario");

hamburguesa.addEventListener("click", () => {
    if (links.classList.contains("none")){
        links.classList.remove("none");
        links.classList.add("mostrarNav");
    } else if (links.classList.contains("mostrarNav")){
        links.classList.remove("mostrarNav");
        links.classList.add("none");
    }
});

const cargarRecetas = async() => {
    try {
        const respuesta = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=7161dca52b6649a787ff0f8bc79379e0&number=3&tags=dessert"`);
        console.log(respuesta);
        
        if (respuesta.status === 200){
            const datos = await respuesta.json();
            console.log(datos.recipes)
            let recetas = "";
            datos.recipes.forEach(receta => {
                recetas += `
                <article class="receta">
                    <img src="https://spoonacular.com/recipeImages/${receta.id}-480x360.${receta.imageType}" alt="${receta.title}" class="fotoReceta">
                    <h3 class="tituloReceta">${receta.title}</h3>
                    <p class="descripcionReceta">${receta.summary}</p>
                    <button class="btnReceta">Preparación</button>
                </article>
                `
            });
            recetario.innerHTML = recetas;
        } else if (respuesta.status === 401){
            console.log("clave incorrecta");
        } else if (respuesta.status === 404){
            console.log("no disponible")
        } else {
            console.log("No tengo idea")
        }
    } catch (error) {
        console.log(error.message);
    }
}

cargarRecetas();