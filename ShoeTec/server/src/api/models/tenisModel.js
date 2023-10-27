const { array, object } = require('joi')
const connection = require('./connection')

const getTenis = async() =>{
    const args = `SELECT * FROM tenis ORDER BY data_registro LIMIT 20`
    const [query] = await connection.execute(args)
    return query
}

const insertImageNames = async (imageNames, tenisId) => {
    try {
        const args = `UPDATE tenis SET pictures = ? WHERE tenis_id = ? `
        const [result] = await connection.execute(args, [JSON.stringify(imageNames), tenisId]);
        return result.insertId;
    } catch (error) {
        throw error;
    }
}

/*
* Essa função toma um objeto com as seguintes propriedades:
* order : {isTrue : ture || false, argument: string}
* arguments : [string] (um array de strings com os parametros para pesquisa)
* data: [] usado na execução da conexão 
*/
const searchTenis = async(queryObj) => {

    try {
        console.log(queryObj)
        const args = `SELECT * FROM tenis WHERE nome LIKE ? `
        vals = [`%${queryObj.searchName}%`]
        // for(key in queryObj){
        //     console.log(queryObj[key])
        // }
        // args é um array que depois é concatenado em uma string formando a query 
        // const args = [`SELECT * FROM tenis`]

        //checa se é ordenado e por onde é ordenado
        // if (queryObj.order.isTrue) args.push(`ORDER BY ${queryObj.order.argument}`)
        // args.push('WHERE')
        // args.push(queryObj.nome)
        // args.push(';')

        // const finalArg = args.join(" ")
        // console.log(typeof(finalArg))


        const [query] = await connection.execute(args, vals)
        // console.log(query)
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

const criarTenis = async(userData)=>{

    try {
    const { nome, img, descr, medium_price, esporte, marca, categoria, peso, dropt, solado, cabedal, palmilha, entressola, trava, img2, img3, img4, desconto, cupom } = userData;


    const values = [nome, img, descr, medium_price, esporte, marca, categoria, peso, dropt, solado, cabedal, palmilha, entressola || null, trava || null, img2, img3, img4, desconto || null, cupom || null];

    const args = `INSERT INTO tenis(nome, img, descr, medium_price, esporte, marca, categoria, peso, dropt, solado, cabedal, palmilha, entressola, trava, img2, img3, img4, desconto, cupom) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    const [criarTenis] = await connection.execute(args, values)

    return criarTenis
    } catch (err) {
        return err;
    }
}

module.exports = {getTenis, getTenisById, searchTenis, criarTenis, insertImageNames}