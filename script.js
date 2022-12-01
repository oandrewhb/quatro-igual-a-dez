function buttonEvent(btn, operacao) {
    if (operacao.includes('p')) {
        if (btn.classList.value.includes('disabled')) {
            document.querySelector('#parametroButtonAbreParenteses').classList.remove('disabled')
            document.querySelector('#parametroButtonFechaParenteses').classList.remove('disabled')
        } else {
            document.querySelector('#parametroButtonAbreParenteses').classList.add('disabled')
            document.querySelector('#parametroButtonFechaParenteses').classList.add('disabled')
        }
    } else {
        if (btn.classList.value.includes('disabled')) {
            btn.classList.remove("disabled");
        } else {
            btn.classList.add("disabled");
        }
    }

    encontrarSolucoes()
}

function buttonOnKeyPress(button) {
    button.value = ''
    encontrarSolucoes()
}
function buttonOnBlur(button) {
    if (!button.value.trim()) {
        button.value = '0'
    }
    encontrarSolucoes()
}

/* Gambiarra */
function atualizarTabela(array) {
    const tabela = document.querySelector('#tabelaSolucoes')
    const titulo = document.querySelector('#tituloSolucoes')

    tabela.innerHTML = ""

    if (array.length == 0) {
        titulo.innerHTML = "?"
    } else {
        titulo.innerHTML = `Soluções encontradas: <span>${array.length}</span>`

        array.forEach((solucao, indice) => {
            tabela.innerHTML += `<tr><td>${indice+1}.</td><td>${solucao}</td></tr>`
        })
    }

}

function removerRepetidosArray(array) {
    const novoSet = new Set(array)
    const novoArray = []

    novoSet.forEach(e => {
        novoArray.push(e)
    })

    return novoArray
}

function obterParametros() {
    const parametros = {
        numeros: [0, 0, 0, 0],
        operacoes: {
            "+": false,
            "-": false,
            "*": false,
            "/": false,
            "p": false,
        }
    }

    parametros.numeros[0] = document.querySelector('#parametroInputNumero0').value
    parametros.numeros[1] = document.querySelector('#parametroInputNumero1').value
    parametros.numeros[2] = document.querySelector('#parametroInputNumero2').value
    parametros.numeros[3] = document.querySelector('#parametroInputNumero3').value

    parametros.operacoes['+'] = !document.querySelector('#parametroButtonSoma').classList.value.includes('disabled')
    parametros.operacoes['-'] = !document.querySelector('#parametroButtonSubtracao').classList.value.includes('disabled')
    parametros.operacoes['*'] = !document.querySelector('#parametroButtonMultiplicacao').classList.value.includes('disabled')
    parametros.operacoes['/'] = !document.querySelector('#parametroButtonDivisao').classList.value.includes('disabled')
    parametros.operacoes['p'] = !document.querySelector('#parametroButtonAbreParenteses').classList.value.includes('disabled') && !document.querySelector('#parametroButtonFechaParenteses').classList.value.includes('disabled')

    let erro = false

    parametros.numeros.forEach(num => {
        if (num.length != 1) {
            erro = true
        }
    })

    return parametros
}

function encontrarSolucoes() {
    const parametros = obterParametros()
    
    const solucoes = []
    const solucoesComParenteses = []
    const operacaoFormatada = {
        "+": " + ",
        "-": " - ",
        "*": " × ",
        "/": " ÷ ",
    }

    const operacoesArray = ['+', '-', '*', '/']

    try {
        for (let nA = 0; nA < parametros.numeros.length; nA++) {
            for (let nB = 0; nB < parametros.numeros.length; nB++) {
                for (let nC = 0; nC < parametros.numeros.length; nC++) {
                    for (let nD = 0; nD < parametros.numeros.length; nD++) {
                        if (new Set([nA, nB, nC, nD]).size == parametros.numeros.length) {
    
                            for (let oA = 0; oA < operacoesArray.length; oA++) {
                                for (let oB = 0; oB < operacoesArray.length; oB++) {
                                    for (let oC = 0; oC < operacoesArray.length; oC++) {
    
                                        const numA = parametros.numeros[nA]
                                        const numB = parametros.numeros[nB]
                                        const numC = parametros.numeros[nC]
                                        const numD = parametros.numeros[nD]
    
                                        const opeA = operacoesArray[oA]
                                        const opeB = operacoesArray[oB]
                                        const opeC = operacoesArray[oC]
    
                                        const expressao = numA + opeA + numB + opeB + numC + opeC + numD
    
                                        // Sem parenteses
                                        if (eval(expressao) == 10) {
                                            let adicionar = true
    
                                            operacoesArray.forEach(operacao => {
                                                if (expressao.includes(operacao) && !parametros.operacoes[operacao]) {
                                                    adicionar = false
                                                }
                                            })
    
                                            if (adicionar) {
                                                solucoes.push(numA + operacaoFormatada[opeA] + numB + operacaoFormatada[opeB] + numC + operacaoFormatada[opeC] + numD);
                                            }
    
                                        }
    
                                        // Com parenteses
                                        if (parametros.operacoes['p']) {
    
                                            const combinacoesParenteses = [
                                                `( ${numA}${opeA}${numB} ) ${opeB} ${numC} ${opeC} ${numD}`, // ( 0 + 0 ) + 0 + 0
                                                `( ${numA} ${opeA} ${numB} ${opeB} ${numC} ) ${opeC} ${numD}`, // ( 0 + 0 + 0 ) + 0
                                                `${numA} ${opeA} ( ${numB} ${opeB} ${numC} ) ${opeC} ${numD}`, // 0 + ( 0 + 0 ) + 0
                                                `${numA} ${opeA} ( ${numB} ${opeB} ${numC} ${opeC} ${numD} )`, // 0 + ( 0 + 0 + 0 )
                                                `${numA} ${opeA} ${numB} ${opeB} ( ${numC} ${opeC} ${numD} )`, // 0 + 0 + ( 0 + 0 )
                                            ]
                                            
                                            combinacoesParenteses.forEach(solucao => {
                                                if (eval(solucao) == 10) {
    
                                                    let adicionar = true
    
                                                    operacoesArray.forEach(operacao => {
                                                        if (solucao.includes(operacao) && !parametros.operacoes[operacao]) {
                                                            adicionar = false
                                                        }
                                                    })
    
                                                    if (adicionar) {
                                                        let solucaoCorreta = solucao
                                                        Object.keys(operacaoFormatada).forEach(operacao => {
                                                            solucaoCorreta = solucaoCorreta.replaceAll(operacao, operacaoFormatada[operacao]).replaceAll('  ', ' ')
                                                        })
                                                        solucoesComParenteses.push(solucaoCorreta)
                                                    }
    
                                                }
                                            })
    
                                        }
    
                                    }
                                }
                            }
    
                        }
                    }
                }
            }
        }
    
        solucoesComParenteses.forEach(s => {
            solucoes.push(s)
        })
    } catch {}

    const resultadoFinal = removerRepetidosArray(solucoes)
    
    atualizarTabela(resultadoFinal)
}