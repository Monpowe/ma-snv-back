import bcrypt from 'bcrypt';
import createModel from './createModel.js';
import Model from './model.js';
//const userModel = createModel('users',['lastname', 'firstname','midname', 'username', 'password', 'active']);

const userModel = new Model('users',['lastname', 'firstname','midname', 'username', 'password', 'active']);

userModel.hashPassword = function(password){
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

userModel.validateUser = async function(username, password){
    // await this.db.execute("update users set password=:password where username='michael.rensal'", {password:this.hashPassword('michael.rensal')});

    const [data] = await this.db.query('select * from users where username=:username limit 1', {username});
    const user = data[0];

    if(!user) return {ok:false, message:'User not found'};

    const pwOk = bcrypt.compareSync(password, user.password);
    if(!pwOk) return {ok:false, message:'Password don\'t match'};

    return {ok:true}; 
   
}   


 const testAsync = async function(){
    try{
        let user = await userModel.validateUser('michael.rensal', 'michael.rensal');
        console.log(user);
    }catch(err){
        console.log(err.message);
    }
}


//testAsync();


export default userModel;