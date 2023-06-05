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

class VerifyInput {
    warning = '';
    isOk = true;
    input = '';
    setInput(input) {
        this.input = input
    }
    required(){
        if (this.input == ""){
            this.warning = "Campo obrigatório"
        }
        return this.warning
    }
    
}

const required = (input) => {
    if ( input == "") {
        return {stauts: false, warning: "Campo obrigatório"}        
    }
    return {status: true}
}

const minimun = (input, minNum, type = "") => {
    if (input.length < minNum) {
        return {stauts: false, warning: `${type} deve conter no mínimo ${minNum} caracteres`}        
    }
    return {status: true}
}

const isEqual = (input, comparison, msg = undefined) => {
    if (input !== comparison) {
        const customWarning = msg? msg : 'Senhas devem ser iguais'
        return {status: false, warning: customWarning}
    }
    return {status: true}
}

export default {VerifyInput, setCreds, required, minimun, isEqual}