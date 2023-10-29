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
        const args = `SELECT * FROM tenis WHERE nome LIKE CONCAT ( '%', ?, '%') ;`
        vals = [queryObj.searchName]

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

const criarTenis = async (userData) => {
    try {
        const { nome, descr, medium_price, esporte, marca, categoria, peso, dropt, solado, cabedal, palmilha, entressola, trava } = userData;

        const values = [nome, descr, medium_price, esporte, marca, categoria, peso, dropt, solado, cabedal, palmilha, entressola || null, trava || null];

        const args = `INSERT INTO tenis(nome, descr, medium_price, esporte, marca, categoria, peso, dropt, solado, cabedal, palmilha, entressola, trava) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        
        // Assumindo que você tem um objeto de conexão chamado 'connection' configurado anteriormente
        const [result] = await connection.execute(args, values);

        if (result.affectedRows === 1) {
            return { success: true, message: 'Tênis criado com sucesso!', result };
        } else {
            return { success: false, message: 'Erro ao criar o tênis.', result };
        }
    } catch (err) {
        console.error('Erro ao criar tênis:', err);
        return { success: false, message: 'Erro ao criar o tênis. Por favor, tente novamente mais tarde.' };
    }
};

module.exports = {getTenis, getTenisById, searchTenis, criarTenis, insertImageNames}