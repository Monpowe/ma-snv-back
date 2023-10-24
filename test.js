import Model from './model/model.js'

export default async (req, res)=>{

    try{

        const User = new Model('users',['lastname', 'firstname','midname', 'username', 'password', 'active']);

        await User.insert(23);
        res.json(await User.select());
        

    }catch(err){ 
        res.json(err);
    }   
    


}