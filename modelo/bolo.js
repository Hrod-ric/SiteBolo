const conexao = require('../conexao');

class Bolo{
    add(bolo){
        const sql = 'INSERT INTO bolo SET ?';
        conexao.query(sql, bolo, (erro, resultado)=>{
            if(erro){
                console.log(erro);
            }else{
                console.log(resultado);
            }
        });
    }

    update(id, valores, res){
        const sql = 'UPDATE bolo SET ? WHERE id = ?'
        
        conexao.query(sql, [valores, id], (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }
        });
    }

    delete(id, res){
        const sql = 'DELETE FROM bolo where id=?';
        conexao.query(sql, id, (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }
        });
    }
}

module.exports = new Bolo;