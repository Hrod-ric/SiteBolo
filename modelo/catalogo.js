const conexao = require('../conexao');

class Catalogo{
    add(catalogo){
        const sql = 'INSERT INTO catalogo SET ?';
        conexao.query(sql, catalogo, (erro, resultado)=>{
            if(erro){
                console.log(erro);
            }else{
                console.log(resultado);
            }
        });
    }

    update(id, valores, res){
        const sql = 'UPDATE catalogo SET ? WHERE id = ?'
        
        conexao.query(sql, [valores, id], (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }
        });
    }

    delete(id, res){
        const sql = 'DELETE FROM catalogo where id=?';
        conexao.query(sql, id, (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }
        });
    }
}

module.exports = new Catalogo;