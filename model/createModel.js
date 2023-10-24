import db from "../config/db.js";

//Create Model function
export default function(tableName, fields){

    return {

    tableName:tableName,
    fields: fields,
    db:db,

    async selectById (id){
        const row = await this.db.query(`select * from ${this.tableName} where id=?`, [id]);
        return row[0];
    },

    async select(){
        const row = await this.db.query(`select * from ${this.tableName}`);
        return row;
    },

    async insert(body){

        const fields = this._filterFields(body);

        const keys = Object.keys(fields).map((key)=>`:`+key).join(',');
        const fieldNames = Object.keys(fields).join(',');

        const sql = `insert into ${this.tableName}(${fieldNames}) values(${keys})`

        const [ret] = await this.db.execute(sql, fields);
         return this.selectById(ret.insertId);
    },

    async update(body){

        const fields = this._filterFields(body);

        const keys = Object.keys(fields).map((key)=>`${key}=:${key}`).join(',');
        const fieldNames = Object.keys(fields).join(',');

        const sql = `update users set ${keys} where id=:id`;
        await db.execute(sql, {...fields, id:body.id});
        
         return this.selectById(body.id);
    },

    async delete(id){

        const [ret] = await db.execute('delete from users where id=:id', {id:id});
        return id;
    
    },

    _filterFields(data){
        const bodyKeys = Object.keys(data);
        const filteredKeys = bodyKeys.filter((key)=>this.fields.includes(key));
        const fields = {};
    
        for(let key of filteredKeys){
            fields[key] = data[key];
        }
    
        return fields;
    }


}

}