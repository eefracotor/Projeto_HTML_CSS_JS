///menu responsive

const menu = document.getElementById('check')
const opcion = document.querySelectorAll('#menu-bar a')  

menu.addEventListener('change', () => {
   if(menu.checked){
        opcion.forEach((opcion) => {
            opcion.addEventListener('click', () => {
                menu.checked = false
            })
        })
    }else{
        console.log('no se esta detectanto el evento')
    }
})

// formulario
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


const expresiones = { // Expresiones regulares
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,//Letras nuemors, guione y guion bajo
	asunto: /^[a-zA-ZÀ-ÿ\s\W]{5,25}$/, // Cualquier caractter maximo 50
	mensaje: /^[a-zA-ZÀ-ÿ\s\W]{5,200}$/ // Cualqioer caracter maximo 200
}

const campos = {
    nombre: false,
	email: false,
	asunto: false,
	mensaje: false
}

const validarFormulario = (e) => {
	switch (e.target.name){
		case "nombre": 
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "email": 
			validarCampo(expresiones.email, e.target, 'email');
		break;
		case "asunto": 
			validarCampo(expresiones.asunto, e.target, 'asunto');
		break;
		case "mensaje": 
            // validarTextMensaje();
			validarCampo(expresiones.mensaje, e.target, 'mensaje');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto')
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto')
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle')
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle')
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')
		campos[campo] = true
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto')
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto')
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle')
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle')
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')
		campos[campo] = false
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario)
	input.addEventListener('blur', validarFormulario)
})

formulario.addEventListener('submit', (e) => {
	e.preventDefault()

	const terminos = document.getElementById('terminos')
	if(campos.nombre && campos.email && campos.asunto && campos.mensaje){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo')
		document.getElementById('formulario__completa').classList.remove	('formulario__completa-activo')
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo')
		}, 5000)

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto')
		})
	}else {
		document.getElementById('formulario__completa').classList.add('formulario__completa-activo')
	}
})

// API rest 