console.log('socket cargado!!!');
const socket = io();

let inputMessage = document.getElementById('message');
let divMessages = document.getElementById('messages');

Swal.fire({
    title: "Identifiquese",
    input: "text",
    text: "Ingrese su nickname",
    inputValidator: (value) => {
        return !value && "Enter your Name...!!!"
    },
    allowOutsideClick: false
}).then(resultado => {
    console.log(resultado)
    socket.emit('id', resultado.value)
    inputMessage.focus()
    document.title = resultado.value

    socket.on('newUser', nombre => {
        //send a popup
        Swal.fire({
            text: `${nombre} se ha conectado...!!!`,
            toast: true,
            position: "top-right"
        })
    })

    socket.on("hello", messages => {
        messages.array.forEach(msg => {
            let p = document.createElement('p');
            p.innerHTML = `<strong> ${msg.emisor}</strong> say: <i>${msg.message}</i>`
            p.classList.add('message')
            let br = document.createElement('br')
            divMessages.append(p, br)
            divMessages.scrollTop = divMessages.scrollHeight

        });
    })
    socket.on('userDesconnected', nombre => {
        Swal.fire({
            text: `${nombre} se ha desconectado...!!!`,
            toast: true,
            position: "top-right"
        })
    })

    socket.on('newMessage', datos => {
        let paragraph = document.createElement('p');
        paragraph.innerHTML = `<strong> ${datos.emisor}</strong> say: <i>${datos.message}</i>`
        paragraph.classList.add('message')
        let br = document.createElement('br')
        divMessages.append(paragraph, br)
        divMessages.scrollTop = divMessages.scrollHeight

    })

    inputMessage.addEventListener("keyup", (e) => {
        //console.log(e, e.target.value)

        if (e.code === "Enter" && e.target.value.trim().length > 0) {
            socket.emit('message', { emisor: resultado.value, message: e.target.value.trim() })
            e.target.value = ''

        }
    })

})




