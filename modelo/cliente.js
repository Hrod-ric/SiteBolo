const conexao = require('../conexao');

class Cliente{
    add(cliente){
        const sql = 'INSERT INTO cliente SET ?';
        conexao.query(sql, cliente, (erro, resultado)=>{
            if(erro){
                console.log(erro);
            }else{
                console.log(resultado);
            }
        });
    }

    update(id, valores, res){
        const sql = 'UPDATE cliente SET ? WHERE id = ?'
        
        conexao.query(sql, [valores, id], (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }
        });
    }

    delete(id, res){
        const sql = 'DELETE FROM cliente where id=?';
        conexao.query(sql, id, (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }
        });
    }
}

module.exports = new Cliente;