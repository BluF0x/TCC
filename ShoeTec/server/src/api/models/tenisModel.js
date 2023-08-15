const { array } = require('joi')
const connection = require('./connection')

const getTenis = async() =>{
    const args = `SELECT * FROM tenis ORDER BY data_registro LIMIT 20`
    const [query] = await connection.execute(args)
    return query
}

/*
* Essa função toma um objeto com as seguintes propriedades:
* order : {isTrue : ture || false, argument: string}
* arguments : [string] (um array de strings com os parametros para pesquisa)
* data: [] usado na execução da conexão 
*/
const searchTenis = async(queryObj) => {
    try {
        // args é um array que depois é concatenado em uma string formando a query 
        const args = [`SELECT * FROM tenis`]

        //checa se é ordenado e por onde é ordenado
        // if (queryObj.order.isTrue) args.push(`ORDER BY ${queryObj.order.argument}`)
        args.push('WHERE')
        args.push(...queryObj.arguments)


        const finalArg = args.join(" ")
                

        console.log(finalArg)
        const data = ["Nike", 4]


        
        console.log(typeof(queryObj.data))
        const query = await connection.execute(args, ['Nike', 4] )
        return query

    } catch (err) {
        return err
    }

}

const getTenisById = async(id) =>{
    const args = "SELECT * FROM tenis WHERE tenis_id=?";
    console.log(id)
    const [query] = await connection.execute(args, [id])
    return query
}

module.exports = {getTenis, getTenisById, searchTenis}