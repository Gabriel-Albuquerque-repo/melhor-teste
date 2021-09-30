const registerRepo = require('../repositories/cellRegister-repository');
const listRepo = require('../repositories/cellList-repository');
const seeRepo = require('../repositories/cellSee-repository');
const delRepo = require('../repositories/cellDelete-repository');
const upRepo = require('../repositories/cellUpdate-repository');

exports.register = async(req, res) => {
    try{
        await registerRepo.register(req.body);
        res.status(200).send(
            { 
                message: 
                `Cell hone ${req.body.model.trim()} was been registered` +
                ` sucessfully.` 
            }
        );        
    } catch(e){
        switch (e.name) {
            case "ValidationError":
                res.status(400).json({ ErrorMessage: e.message });
                break;
            case "MongoServerError":
                res.status(400).json(
                    {
                    ErrorMessage: 
                    `There is already a cell phone with code: ${req.body.code}` 
                    }
                 )
                break;
            default:
                res.status(500).json({ ErrorMessage: `Server side error` });
        }
    }
}

exports.list = async(req, res) => {
    try{
        const schedule = await listRepo.list();
        res.status(200).send({ data: schedule });
    } catch(e){
        res.status(500).send({ message: e.message });
    }
}

exports.see = async(req, res) => {
    try{
        const snap = await seeRepo.see(req.body.code);
        if(!snap){
            res.status(400).send(
                { 
                    message: 
                    `Cell hone with code ${req.body.code} doesn't exist.` 
                }
            );
        } else {
            res.status(200).send({ data: snap });
        }
    } catch(e){
        res.status(500).send({ message: `Server side error` });
    }
}

exports.delete = async(req, res) => {
    try{
        const erase = await delRepo.delete(req.body.code);
        if(erase) {
            res.status(200).send(
                {
                    message: 
                    `Cell phone with code ${erase.code} was deleted`
                }
            );
        } else {
            res.status(400).send(
                {
                    message:
                    `Cell phone with code ${erase.code} wasn't found`
                }
            );
        }
    } catch(e){
        res.status(500).send({ message: `Server side error` });
    }
}

exports.update = async(req, res) => {
    try{
        const modernize = await upRepo.update(req.body.old, req.body.new);  
        if(modernize){
            res.status(200).send(
                {
                    message: 
                    `Cell phone with data: ${req.body.old} has benn` +
                    ` updated to ${req.body.new}`
                }
            );
        } else {
            res.status(400).send(
                {
                    message:
                    `Cell phone with data: ${req.body.old} doesn't exist`
                }
            )
        }
    } catch(e) {
        res.status(500).send({ message: `Server side error`, ERROR: e.message });
    }
}