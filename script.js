function buttonEvent(btn, operacao) {
    if (operacao.includes('p')) {
        // habilitar ou desabilitar os dois parenteses
    } else {
        if (btn.classList.value.includes('disabled')) {
            btn.classList.remove("disabled");
        } else {
            btn.classList.add("disabled");
        }
    }
}

function inputKeyPress(input) {
    input.value = ''
}

function inputChange(input) {
    input.select()
}

function inputBlur(input) {
    if (input.value.length < 1) {
        input.value = '0'
    }

}