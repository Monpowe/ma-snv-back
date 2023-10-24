import users from "../model/users.js";
import { createCustomAPIError } from "../config/errors.js";


export default {


    async GET(req, res){
        
        const fields = ['id','lastname','firstname', 'midname', 'active', 'username'];
        
        const ret = req.params.id 
            ? await users.selectById(req.params.id, {fields}) 
            : await users.select({fields});
            
        res.json(ret);
       
    },

    async POST(req, res){
        
        const data = req.body;
        if(data.password) data.password = users.hashPassword(data.password);
        const ret = await users.insert(body);
        res.json(ret);
      
    },

    async PUT(req, res){
        const data = req.body;
        if(data.password) data.password = users.hashPassword(data.password);
        const id = await users.update(data);
        const ret = await users.selectById(id, {fields:['id','lastname','firstname', 'midname', 'active', 'username']});
        res.json(ret);
       
    },

    async DELETE(req, res){
       
        const ret = await users.delete(req.params.id);
        res.json(ret);
        

    },

    async login(req, res){

           
        const ret = await users.validateUser(req.body.username, req.body.password);
        if(!ret.ok) throw createCustomAPIError(ret.message, 400);

        res.status(200).json({ok:true});
          


        
    }


}