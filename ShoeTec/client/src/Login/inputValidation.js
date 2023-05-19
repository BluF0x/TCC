function setCreds(e, setCredenciais, credenciais) {
        const nome = e.target.name
        const valor = e.target.value


        /* Primeiro, é checado se o tipo de input não é uma checkbox, * já que a maioria dos inputs não é, esse caso é melhor ser 
         * checado primeiro. Caso o input seja uma checkbox, é verificado
         * se a checkbox em si está marcada, caso esteja, ela é adicionada 
         * a um array, caso não, ela é filtrada do array.
         */
        if(e.target.type !== "checkbox"){
            setCredenciais({
                ...credenciais,
                [nome] : valor
            })
        } else {
            const checked = e.target.checked
            if (checked) {
                setCredenciais({
                    ...credenciais,
                    esporte: [...credenciais.esporte, valor]
                })
            } else {
                const filtrado = credenciais.esporte.filter(esporte=>{return esporte !== valor})
                console.log(filtrado)
                setCredenciais({
                    ...credenciais,
                    esporte:  filtrado 
                })
            }
        }

}

function verifyInput(target, warning, credenciais) {
    warning(undefined)
    if(target.value == "") {
        warning("Não pode ser vazio")
    } 
}

export default {verifyInput, setCreds}