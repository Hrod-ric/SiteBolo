const express = require('express');
const conexao = require('./conexao');
const bodyParser = require('body-parser');
const Cliente = require('./modelo/cliente');
const Funcionario = require('./modelo/funcionario');
const Bolo = require('./modelo/bolo');
const Catalogo = require('./modelo/catalogo');

const app = express();
app.use( express.static( "files" ) );

const editar = (req)=>{
    const alvo = req.body;
    nome = alvo.nome? `"nome":"${alvo.nome}",` : "";
    cpf = alvo.cpf? `"cpf":"${alvo.cpf}",` : "";
    endereco = alvo.endereco? `"endereco":"${alvo.endereco}",` : "";
    telefone = alvo.telefone? `"telefone":"${alvo.telefone}",` : "";
    texto = `${nome}${cpf}${endereco}${telefone}`
    texto = texto.slice(0, -1);
    const obj = JSON.parse(`{${texto}}`);
    return obj;
}

app.set('view engine', 'ejs');
app.set('views','./view');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

conexao.connect(erro  => {
    if(erro){
        console.log(erro);
    }else{
        app.listen(3000, ()=> console.log('servidor rodando na porta 3000'));
    }
});

app.get('/home', function(req,res){
    //res.sendFile(__dirname+'/view/cliente.html');
    conexao.query('SELECT * from CATALOGO where tipo = 1', function(erro, decorada){
        conexao.query('SELECT * from CATALOGO where tipo = 2', function(erro, vulcao){
            conexao.query('SELECT * from CATALOGO where tipo = 3', function(erro, trufado){
                conexao.query('SELECT * from CATALOGO where tipo = 4', function(erro, caseiro){
                    /*decorada = decorada? decorada : [""];
                    vulcao = vulcao? vulcao : [""];
                    trufado = trufado? trufado : [""];
                    caseiro = caseiro? caseiro : [""];*/
                    res.render('home', {tortaDecorada: decorada, boloVulcao: vulcao, boloTrufado: trufado, boloCaseiro: caseiro});
                });
            });
        });
    });
});

// CLIENTE

app.get('/cliente', function(req,res){
    conexao.query('SELECT * from cliente', function(erro, resultado){
        res.render('cliente', {data: resultado});
    });
});
app.post('/cliente/cadastrar', (req, res)=>{
    const cliente = req.body;
    console.log(cliente);
    try{

        Cliente.add(cliente);
        conexao.query('SELECT * from cliente', function(erro, resultado){
            res.render('cliente', {data: resultado});
        });

    }catch(e){
        console.log('Error: '+e);
    }
});
app.post('/cliente/editar',(req, res)=>{
    const id = parseInt(req.body.id);
    const obj = editar(req);
    try{
        Cliente.update(id,obj,res);
        conexao.query('SELECT * from cliente', function(erro, resultado){
            res.render('cliente', {data: resultado});
        });
    }catch(e){
        console.log('Error: '+e);
    }
});
app.post('/cliente/deletar',(req, res)=>{
    const id = parseInt(req.body.id);
    try{
        Cliente.delete(id,res);
        conexao.query('SELECT * from cliente', function(erro, resultado){
            res.render('cliente', {data: resultado});
        });
    }catch(e){
        console.log('Error: '+e);
    }
});

// FUNCIONARIO

app.get('/funcionario', function(req,res){
    conexao.query('SELECT * from funcionario', function(erro, resultado){
        res.render('funcionario', {data: resultado});
    });
});
app.post('/funcionario/cadastrar', (req, res)=>{
    const funcionario = req.body;
    console.log(funcionario);
    try{

        Funcionario.add(funcionario);
        conexao.query('SELECT * from funcionario', function(erro, resultado){
            res.render('funcionario', {data: resultado});
        });

    }catch(e){
        console.log('Error: '+e);
    }
});
app.post('/funcionario/editar',(req, res)=>{
    const id = parseInt(req.body.id);
    const obj = editar(req);
    try{
        Funcionario.update(id,obj,res);
        conexao.query('SELECT * from funcionario', function(erro, resultado){
            res.render('funcionario', {data: resultado});
        });
    }catch(e){
        console.log('Error: '+e);
    }
});
app.post('/funcionario/deletar',(req, res)=>{
    const id = parseInt(req.body.id);
    try{
        Funcionario.delete(id,res);
        conexao.query('SELECT * from funcionario', function(erro, resultado){
            res.render('funcionario', {data: resultado});
        });
    }catch(e){
        console.log('Error: '+e);
    }
});

// BOLO

app.get('/bolo', function(req,res){
    
    conexao.query('SELECT * from catalogo', (error, result)=>{
        conexao.query('SELECT * from bolo', (error, resultado)=>{
            res.render('bolo', {bolo: resultado, catalogo: result});
        });
    });

});
app.post('/bolo/cadastrar', (req, res)=>{
    const bolo = req.body;
    console.log(bolo);
    try{

        Bolo.add(bolo);
        conexao.query('SELECT * from catalogo', (error, result)=>{
            conexao.query('SELECT * from bolo', (error, resultado)=>{
                res.render('bolo', {bolo: resultado, catalogo: result});
            });
        });

    }catch(e){
        console.log('Error: '+e);
    }
});
app.post('/bolo/editar',(req, res)=>{
    const id = parseInt(req.body.id);
    const obj = editar(req);
    try{
        Bolo.update(id,obj,res);
        conexao.query('SELECT * from catalogo', (error, result)=>{
            conexao.query('SELECT * from bolo', (error, resultado)=>{
                res.render('bolo', {bolo: resultado, catalogo: result});
            });
        });
    }catch(e){
        console.log('Error: '+e);
    }
});
app.post('/bolo/deletar',(req, res)=>{
    const id = parseInt(req.body.id);
    try{
        Bolo.delete(id,res);
        conexao.query('SELECT * from catalogo', (error, result)=>{
            conexao.query('SELECT * from bolo', (error, resultado)=>{
                res.render('bolo', {bolo: resultado, catalogo: result});
            });
        });
    }catch(e){
        console.log('Error: '+e);
    }
});

// CATALOGO

app.post('/catalogo/cadastrar', (req, res)=>{
    const catalogo = req.body;
    console.log(catalogo);
    try{

        Catalogo.add(catalogo);
        conexao.query('SELECT * from catalogo', (error, result)=>{
            conexao.query('SELECT * from bolo', (error, resultado)=>{
                res.render('bolo', {bolo: resultado, catalogo: result});
            });
        });

    }catch(e){
        console.log('Error: '+e);
    }
});
app.post('/catalogo/editar',(req, res)=>{
    const id = parseInt(req.body.id);
    const obj = editar(req);
    try{
        Catalogo.update(id,obj,res);
        conexao.query('SELECT * from catalogo', (error, result)=>{
            conexao.query('SELECT * from bolo', (error, resultado)=>{
                res.render('bolo', {bolo: resultado, catalogo: result});
            });
        });
    }catch(e){
        console.log('Error: '+e);
    }
});
app.post('/catalogo/deletar',(req, res)=>{
    const id = parseInt(req.body.id);
    try{
        Catalogo.delete(id,res);
        conexao.query('SELECT * from catalogo', (error, result)=>{
            conexao.query('SELECT * from bolo', (error, resultado)=>{
                res.render('bolo', {bolo: resultado, catalogo: result});
            });
        });
    }catch(e){
        console.log('Error: '+e);
    }
});