process.env.NODE_ENV = 'dev';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('USER', () => {
  it('NAO CADASTRAR UM USUARIO SEM O CAMPO [NAME]', (done) => {
    let user = {
      email: "rubens.alves.lopes2@etec.sp.gov.br"
    }

    chai.request('http://localhost:8000').post('/user').send(user).end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.assert([{ msg: 'Preencha o campo name' }]);
      done();
    });
  });

});

describe('BOOK', () => {
  it('NAO CADASTRAR UM LIVRO SEM O CAMPO [logged_user_id]', (done) => {
    let user = {
      tittle: "The Brothers Karamazov",
      pages: "840"
    }

    chai.request('http://localhost:8000').post('/book').send(user).end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.be.assert([{ msg: 'FALTA DO PARAMETRO: [logged_user_id]' }]);
      done();
    });
  });
})
