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
const searchTenis = async (queryObj) => {
    console.log(queryObj)
    try {
        let args = "SELECT * FROM tenis WHERE nome LIKE CONCAT('%', ?, '%')";
        const vals = [queryObj.searchName];

        if (queryObj.marca) {
            args += ' AND marca = ?';
            vals.push(queryObj.marca);
        }

        if (queryObj.esporte) {
            args += ' AND esporte = ?';
            vals.push(queryObj.esporte);
        }

        const [query] = await connection.execute(args, vals);
        return query;
    } catch (err) {
        return err;
    }
};

const getTenisById = async(id) =>{
    const args = "SELECT * FROM tenis WHERE tenis_id=?";
    console.log(id)
    const [query] = await connection.execute(args, [id])
    return query
}

const criarTenis = async (userData) => {
    try {
        const { nome, descr, medium_price, esporte, marca, categoria, peso, dropt, solado, cabedal, palmilha, entressola, trava, desconto, cupom } = userData;

        const values = [nome, descr, medium_price, esporte, marca, categoria, peso, dropt, solado, cabedal, palmilha, entressola || null, trava || null, desconto || null, cupom || null];

        const args = `INSERT INTO tenis(nome, descr, medium_price, esporte, marca, categoria, peso, dropt, solado, cabedal, palmilha, entressola, trava, cupom, desconto) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        
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