const {Router }=require('express')
const router=Router();
const {
    getUsers,
    getUsersByUsername,
    getDatos,
    insertDatos,
    frecuencia
 }=require('../controllers/controller');

router.get('/api/user', getUsers);
router.post('/api/user/:username', getUsersByUsername);
router.get('/api/datos',getDatos)
router.post('/api/datos',insertDatos)
router.get('/api/datos',frecuencia)
module.exports=router;