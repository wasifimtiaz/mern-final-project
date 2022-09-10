import express from 'express';
const router =express.Router();

import {
   createdata, getalldata, getsingledata, deletedata, updatedata
} from '../controllers/places.js';

//All data
 router.get('/getalldata', getalldata)

 // SINGLE DATA
 router.get('/:id', getsingledata)

 //POST
 router.post('/createdata', createdata)
   
 //DELETE
 router.delete('/:id',deletedata)

 //UPDATE
 router.patch('/:id',updatedata)
export default router;

