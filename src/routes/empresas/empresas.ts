import express from 'express';
const router = express.Router();
import {Empresas, IEmpresa } from '@libs/Empresas/Empresas';

const empresasModel = new Empresas();

empresasModel.add({
    codigo: '',
    nombre: 'Mi Empresa',
    status: 'Activo'
});
//Registrar los endpoint en los router
router.get('/',(_req, res) =>{
    const jsonUrls = {
        "getAll": {"method":"get", "url": "empresas/all"},
        "getById":{"method":"post", "url": "empresas/byid/:id"},
        "new":{"method":"post", "url": "empresas/new"},
        "update": {"method":"put", "url": "empresas/upd/:id"},
        "delete":{"method":"delete", "url": "empresas/del/:id"},
    };
    res.status(200).json(jsonUrls);


    //res.status(500); Hubo un error, no sabemos que sucedió

    //res.status(404); Página no encontrada
    //res.status(403); Autorización denegada
    //res.status(401); Página no autorizada     

    //res.status(304); Utiliza la información del caché del browser, o sea, es lo mismo que ya tienes (no te mando la información otra vez porque está cacheada);
    //res.status(302); Redirige a una nueva dirección 

    //res.status(202); Recurso encontrado; Pero, no te mandamos nada, solo te notifico
    //res.status(200); Recurso encontrado    
});

/*router.get('/all',(_req, res)=>{
    res.status(200).json({'msg': 'Not Implement yet'})
});*/

//Obtener
router.get('/all',(_req, res)=>{
    res.status(200).json(empresasModel.getAll());
});

//Obtener por ID
router.get('/byid/:id',(req, res) =>{
    const {id : codigo} = req.params;
    const empresa = empresasModel.getById(codigo);
    if (empresa){
        return res.status(200).json(empresa);
    }
    return res.status(404).json({"error": "No se encontró la empresa"});
});

//Guardar
router.post('/new',(req, res) =>{
    console.log("Empresas /new request body:", req.body)
    const {
        nombre = "John Doe Corp",
        status = "Activo"
    } = req.body;
    const newEmpresa: IEmpresa = {
        codigo: "",
        nombre,
        status
    };
    if (empresasModel.add(newEmpresa)){
        return res.status(200).json({"created": true});
    }
    return res.status(404).json({"error": "Error al agregar una nueva empresa"});
});

//Actualizar
router.put('/upd/:id',(req, res)=>{
    const { id } = req.params;
    const {
        nombre = "John Doe Corp", 
        status = "Activo", 
        observacion = ""
    } = req.body;

    const UpdateEmpresa : IEmpresa = {
        codigo: id,
        nombre,
        status,
        observacion        
    };
    if (empresasModel.update(UpdateEmpresa)){
        return res.status(200).json({"updated": true});
    }
    return res.status(404).json({"error": "Error al actualizar una empresa"});
});

//Eliminar
router.delete('/del/:id',(req, res) =>{
    const {id : codigo} = req.params;
    if (empresasModel.delete(codigo)){
        return res.status(200).json({"deleted": true});
    }
    return res.status(404).json({"error": "No se pudo eliminar la empresa"});
});



export default router;

//https://hadoop.apache.org