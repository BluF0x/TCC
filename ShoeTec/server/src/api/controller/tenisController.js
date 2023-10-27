const tenisModel = require('../models/tenisModel')

const uploadImages = async (req, res) => {
    try {
        const { files } = req;
        const {tenisId} = req.body;
        const imageNames = files.map(file => file.filename);
        const insertId = await tenisModel.insertImageNames(imageNames, tenisId);
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

        const {searchName} = req.query
        // console.log(req.query)
        // console.log("query:")
        // console.log(searchName)

        const [result] = await tenisModel.searchTenis(req.query)

        console.log(result)
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

    const criarTenis = await tenisModel.criarTenis(req.body)

    // return res.status(201)
    return res.status(201).json({"msg": "OK", "body": criarTenis})
}
module.exports = {getTenis, getTenisById, searchTenis, creatTenis, uploadImages}