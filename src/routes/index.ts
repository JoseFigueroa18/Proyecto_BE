import express from 'express';
const router  = express.Router();
import empresasRouter from './empresas/empresas';
import usuariosRouter from './usuarios/usuarios';

 // REST API
 // Internet -> HTTP -> REST API -> DB
 // SOAP XML wsdl
 // {} -> JSON
 // [] -> JSON
 // { llave : valor }
 // valor: texto, numerico, booleano, array [valores], objeto {llave:valor} Son los conocidos como subdocumentos.

 // REST stateless, resource unique representation
 // CRUD Create, Read, Update, Delete
 //      POST, GET, PUT, DELETE

router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

 router.get('/version', (_req, res)=>{
  const version: string = "1.0.0"; //string, number, boolean, types, interfaces, classes, enumerators
  const jsonResp = {"name":"FODA Be", "version":version};
  res.json(jsonResp);
  //router.get, router.post, router.put, router.delete, reouter.use
 });

//------------------------------------------------------------------------------------------------------------------
 router.use('/empresas', empresasRouter);
 router.use('/usuarios', usuariosRouter);
export default router;
