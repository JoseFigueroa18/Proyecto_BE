import express from 'express';
const router = express.Router();
import {Usuarios, IUsuario } from '@libs/Usuarios/Usuarios';

const usuariosModel = new Usuarios();

usuariosModel.add({
    codigo: '',
    nombre: 'Mi Usuario',
    correo: 'usuarioprueba@gmail.com',
    password: '1234',
    roles: {"Admin":"1", "Fontanero":"2"}
});

//Registrar los endpoint en los router
router.get('/',(_req, res) =>{
    const jsonUrls = {
        "getAll": {"method":"get", "url": "usuarios/all"},
        "getById":{"method":"post", "url": "usuarios/byid/:id"},
        "new":{"method":"post", "url": "usuarios/new"},
        "update": {"method":"put", "url": "usuarios/upd/:id"},
        "delete":{"method":"delete", "url": "usuarios/del/:id"},
    };
    res.status(200).json(jsonUrls); 
});


//Obtener
router.get('/all',(_req, res)=>{
    res.status(200).json(usuariosModel.getAll());
});

//Obtener por ID
router.get('/byid/:id',(req, res) =>{
    const {id : codigo} = req.params;
    const usuario = usuariosModel.getById(codigo);
    if (usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"error": "No se encontró el usuario"});
});

//Guardar
router.post('/new',(req, res) =>{
    console.log("Usuarios /new request body:", req.body)
    const {
        nombre = "Mi Usuario",
        correo = "usuarioprueba@gmail.com",
        password = "1234",
        roles = {"Admin":"1", "Fontanero":"2"}
    } = req.body;
    const newUsuarios: IUsuario = {
        codigo: "",
        nombre,
        correo,
        password,
        roles
    };
    if (usuariosModel.add(newUsuarios)){
        return res.status(200).json({"created": true});
    }
    return res.status(404).json({"error": "Error al agregar un nuevo usuario"});
});

//Actualizar
router.put('/upd/:id',(req, res)=>{
    const { id } = req.params;
    const {
        nombre = "Mi Usuario",
        correo = "usuarioprueba@gmail.com",
        password = "1234",
        roles = {"Admin":"1", "Fontanero":"2"}
    } = req.body;

    const updateUsuario : IUsuario = {
        codigo: id,
        nombre,
        correo,
        password,
        roles       
    };
    if (usuariosModel.update(updateUsuario)){
        return res.status(200).json({"updated": true});
    }
    return res.status(404).json({"error": "Error al actualizar un usuario"});
});

//Eliminar
router.delete('/del/:id',(req, res) =>{
    const {id : codigo} = req.params;
    if (usuariosModel.delete(codigo)){
        return res.status(200).json({"deleted": true});
    }
    return res.status(404).json({"error": "No se pudo eliminar el usuario"});
});



export default router;

//https://hadoop.apache.org