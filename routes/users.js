import express from 'express';
import usersController from '../controller/users.js';
import asyncHandler from 'express-async-handler';


// const asyncWrapper= function(fn){
//    return async (req, res, next)=>{
//       try{
//          await fn(req, res, next)
//       }catch(err){
//          next(err)
//       }
//    }
// } 

const router = express.Router();

router.route('/').get(asyncHandler(usersController.GET))
                 .post(asyncHandler(usersController.POST))
                 .put(asyncHandler(usersController.PUT));

router.route('/:id').get(asyncHandler(usersController.GET))
                    .delete(asyncHandler(usersController.DELETE));

router.route('/:method').post( asyncHandler(async (req, res)=>{
   await usersController[req.params.method](req, res);
}))
            


export default router;