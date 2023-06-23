const popUpTemplate = {
    aberto : false,
    mensagem: "",
    result: "",
    status: null,
    response: 0,
    setOpen : function(mensagem, result, status, res) { 
        this.aberto = true
        this.result = result
        this.mensagem = mensagem
        this.status = status
        this.res = res
    },
    testOpen: function () {
        this.aberto = true
    }
}

export default popUpTemplate