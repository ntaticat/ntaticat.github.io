let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
    //scrollX: "2000px",
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
        { orderable: false, targets: [5, 6] },
        { searchable: false, targets: [1] }
        //{ width: "50%", targets: [0] }
    ],
    pageLength: 3,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};

const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listUsers();

    dataTable = $("#datatable_users").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
};

const listUsers = async () => {
    try {
        const response = await fetch("https://orca-app-8echq.ondigitalocean.app/api/alumnos");

        const users = await response.json();
        console.log(users);
        
        let content = ``;
        users.forEach((user, index) => {

            let isActive = '';

            if(user.activo === 1) {
                isActive = '<td><i class="fa-solid fa-check" style="color: green;"></i></td>';
            }
            else {
                isActive = '<td><i class="fa-solid fa-x" style="color: red;"></i></td>';
            }

            let whatTurno = '';

            if(user.turno_id === 1) {
                whatTurno = 'MATUTINO';
            }
            else if(user.turno_id === 2) {
                whatTurno = 'VESPERTINO';
            }
            else {
                whatTurno = 'MIXTO';
            }
            
            content += `
                <tr>
                    ${isActive}
                    <td>${user?.folio}</td>
                    <td>${user?.nombre_completo}</td>
                    <td>${user?.nombres}</td>
                    <td>${user?.primer_apellido}</td>
                    <td>${user?.segundo_apellido}</td>
                    <td>${whatTurno}</td>
                    <td>
                        <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>`;
        });
        tableBody_users.innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});