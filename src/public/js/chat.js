// front
const socket = io();

let correoUsuario = "";

async function pedirEmail() {
    const { value: nombre } = await Swal.fire({
        title: "Enter your mail",
        input: "text",
        inputLabel: "Your mail",
        inputValue: "",
        showCancelButton: false,
        inputValidator: (value) => {
            if (!value) {
                return "You need to write your mail!";
            }
        },
    });

    correoUsuario = nombre;

}

pedirEmail();

// front emite
const chatBox = document.getElementById("chatbox");

chatBox.addEventListener("keyup", ({ key }) => {
    if (key == "Enter") {
        socket.emit("msg_front_to_back", {
            user: correoUsuario,
            message: chatBox.value,
        });
        chatBox.value = "";
    }
});


// tengo que recibir los datos del back
socket.on("msg_back_to_front", (msgs) => {
    console.log(msgs);
    let msgsFormateados = "";
    msgs.forEach((msg) => {
        msgsFormateados += "<div style='border: 1px solid black;>";
        msgsFormateados += "<p>" + msg.user + "</p>";
        msgsFormateados += "<p>" + msg.message + "</p>";
        msgsFormateados += "</div>";
    });
    const divMsgs = document.getElementById("div-msgs");
    divMsgs.innerHTML = msgsFormateados;
});