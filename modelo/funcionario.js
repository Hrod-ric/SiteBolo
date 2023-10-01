const conexao = require('../conexao');

class Funcionario{
    add(funcionario){
        const sql = 'INSERT INTO funcionario SET ?';
        conexao.query(sql, funcionario, (erro, resultado)=>{
            if(erro){
                console.log(erro);
            }else{
                console.log(resultado);
            }
        });
    }

    update(id, valores, res){
        const sql = 'UPDATE funcionario SET ? WHERE id = ?'
        
        conexao.query(sql, [valores, id], (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }
        });
    }

    delete(id, res){
        const sql = 'DELETE FROM funcionario where id=?';
        conexao.query(sql, id, (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            }
        });
    }
}

module.exports = new Funcionario;