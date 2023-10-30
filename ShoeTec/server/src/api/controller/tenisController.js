const tenisModel = require('../models/tenisModel')

const uploadImages = async (req, res) => {
    try {
        const { files } = req;
        const { tenisId } = req.body;
        const body = req.body

        console.log(files)
        console.log(body)
        console.log("id do tenis: " + tenisId)

        const imageNames = files.map(file => file.filename);
        const insertId = await tenisModel.insertImageNames(imageNames, tenisId);

        console.log(insertId)
        res.status(200).json({ message: 'Images uploaded successfully.', insertId });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ error: 'Failed to upload images.' });
    }
};


const getTenis = async(req, res) =>{
    const result = await tenisModel.getTenis()
    res.status(200).json({"result": result})
}

const searchTenis = async(req, res) =>{
    try{

        const result = await tenisModel.searchTenis(req.query)

        // console.log(result)
        res.status(200).json({'msg': "ok", query: result})
    } catch(err)  {
        res.status(400).json({erro: err})
    }
}

const getTenisById = async (req, res) =>{
    const {id} = req.params

    if (id) {
        const queryRes = await tenisModel.getTenisById(id)
        return res.status(200).json(queryRes)
    } else {
        return res.status(404).json({"error": "ID undefined"})
    }

}

const creatTenis = async (req, res) =>{

    try {

        const criarTenis = await tenisModel.criarTenis(req.body)

        console.log(criarTenis)

        return res.status(201).json({"msg": "OK", "body": criarTenis})
    }catch(err){
        return res.status(500).json({err})
    }
}
module.exports = {getTenis, getTenisById, searchTenis, creatTenis, uploadImages}