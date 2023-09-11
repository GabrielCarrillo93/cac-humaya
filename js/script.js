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
        const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=3&q=caramel';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'db1b3d68a0mshc37fb74a634e89ep167a50jsna9d84d2dfb55',
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };

        const respuesta = await fetch(url, options);
        
        if (respuesta.ok){
            const datos = await respuesta.json();
            let recetas = "";
            datos.results.forEach(receta => {
                recetas += `
                <article class="receta">
                    <img src="${receta.thumbnail_url}" class="fotoReceta" alt="${receta.name}">
                    <h3 class="tituloReceta">${receta.name}</h3>
                    <p class="descripcionReceta">${receta.description}</p>
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


