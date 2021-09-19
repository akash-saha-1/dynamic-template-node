const chai = require('chai');
const should = require('should');
const request = require('supertest');
let assert = chai.assert;

//setting test environment
process.env.NODE_ENV = 'test';

const app = require('./../../../src/app.js');
const connection = require('./../../../src/database/connection');

describe('GET Home',async ()=>{
    before((done)=>{
        connection().then(()=> done()).catch((err)=>done(err));
    })

    // calling home page api
    it("should return home page body",function(done){
        this.timeout(10000);
        request(app)
        .get("/")
        .then((res)=>{
            const body = res.body;
            assert.notEqual(body, null);
            done();
        });
    });

    it("should return home page html content",function(done){
        // calling home page api
        request(app)
        .get("/")
        .then((res)=>{
            assert.notEqual(res.text, '');
            done();
        });
    });
})
