const chai = require('chai');
const should = require('should');
const request = require('supertest');
let assert = chai.assert;

process.env.NODE_ENV = 'test';

const connection = require('./../../../src/database/connection');
const app = require('./../../../src/app.js');

describe('GET Home',async ()=>{

    before((done)=>{
        connection().then(()=> done()).catch((err)=>done(err));
    })

    // calling countries list api
    it("should return countries list",function(done){
        this.timeout(10000);
        request(app)
        .get("/countriesList")
        .then((res)=>{
            const body = res.body;
            //assert.notEqual(body, null);
            done();
        });
    });
})
