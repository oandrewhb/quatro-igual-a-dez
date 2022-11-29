

const inputNumero0 = document.querySelector('#numero0')
const inputNumero1 = document.querySelector('#numero1')
const inputNumero2 = document.querySelector('#numero2')
const inputNumero3 = document.querySelector('#numero3')

const inputOperacao0 = document.querySelector('#operacao0')
const inputOperacao1 = document.querySelector('#operacao1')
const inputOperacao2 = document.querySelector('#operacao2')
const inputOperacao3 = document.querySelector('#operacao3')

const inputOperacao = {
    "+": inputOperacao0,
    "-": inputOperacao1,
    "*": inputOperacao2,
    "/": inputOperacao3,
}

const divResultado = document.querySelector('#divResultado')

function funcaoCalcular() {

    numeros = [
        inputNumero0.value,
        inputNumero1.value,
        inputNumero2.value,
        inputNumero3.value,
    ]
    operacoes = ["+", "-", "*", "/"]

    // Validação 1
    erro = false
    numeros.forEach(e => {
        if (e.length == 0 || e.length > 1) {
            erro = true
        }
    })
    if (erro) {
        alert("Cada número deve conter 1 dígito!")
        return
    }

    // Inicio gambiarra
    const solucoes = []
    const bo = {
        "+": " + ",
        "-": " - ",
        "*": " × ",
        "/": " ÷ ",
    }

    for (let nA = 0; nA < numeros.length; nA++) {
        for (let nB = 0; nB < numeros.length; nB++) {
            for (let nC = 0; nC < numeros.length; nC++) {
                for (let nD = 0; nD < numeros.length; nD++) {
                    if (new Set([nA, nB, nC, nD]).size == numeros.length) {

                        for (let oA = 0; oA < numeros.length; oA++) {
                            for (let oB = 0; oB < numeros.length; oB++) {
                                for (let oC = 0; oC < numeros.length; oC++) {
                                        
                                        const numA = numeros[nA]
                                        const numB = numeros[nB]
                                        const numC = numeros[nC]
                                        const numD = numeros[nD]

                                        const opeA = operacoes[oA]
                                        const opeB = operacoes[oB]
                                        const opeC = operacoes[oC]

                                        const expressao = numA + opeA + numB + opeB + numC + opeC + numD
                                        if (eval(expressao) == 10) {
                                            let adicionar = true

                                            operacoes.forEach(op => {
                                                if (expressao.includes(op) && !inputOperacao[op].checked) {
                                                    adicionar = false
                                                }
                                            })

                                            if (adicionar) {
                                                solucoes.push(numA + bo[opeA] + numB + bo[opeB] + numC + bo[opeC] + numD);
                                            }

                                        }

                                }
                            }
                        }

                    }
                }
            }
        }
    }

    if (solucoes.length) {
        divResultado.innerHTML = `<p>Foram encontrados ${solucoes.length} resultados</p><br>`
        let contador = 1
        solucoes.forEach((s) => {
            divResultado.innerHTML += `<p>[${contador}] ${s}</p>`
            contador++
        })
    } else {
        divResultado.innerHTML = `<p>Não foi encontrado nenhuma solução :(</p><br>`
    }
    
}
