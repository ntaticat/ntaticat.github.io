const listaObjetosSensores = document.getElementById("listaObjetosSensores");
const formSimuladorSensor = document.getElementById("formSimuladorSensor");
const sensorId = document.getElementById("sensorId");
const sensorNombre = document.getElementById("sensorNombre");
const sensorDato = document.getElementById("sensorDato");
const btnForm = document.getElementById("btnForm");

window.addEventListener("load", async () => {
    try {
        const jsonData = await fetch("https://ntaticat-cuitlahuac.azurewebsites.net/api/sensores");
        const arregloDatosSensores = await jsonData.json();

        arregloDatosSensores.forEach(sensorObjeto => {
            const li = document.createElement("li");
            li.innerHTML = `id: ${sensorObjeto.id}, nombre: ${sensorObjeto.nombre}, dato: <span class="mostrarImportante">${sensorObjeto.dato}</span>`;
            listaObjetosSensores.appendChild(li);
        });
    } catch (error) {
        console.error("Hay error al obtener datos del server", error);
    }
})

btnForm.addEventListener("click", async (e) => {
    e.preventDefault();
    const dato = sensorDato.value;
    const nombre = sensorNombre.value;
    const id = sensorId.value;

    const bodyData = {
        dato,
        nombre,
        id
    };

    try {
        const response = await fetch("https://ntaticat-cuitlahuac.azurewebsites.net/api/sensores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData)
        })

        console.log("POST RESPONSE", await response.json());
    } catch (error) {
        console.error("Hay error al enviar datos al server", error);
    }
})