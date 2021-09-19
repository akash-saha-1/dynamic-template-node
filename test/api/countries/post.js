const chai = require('chai');
const should = require('should');
const request = require('supertest');
let assert = chai.assert;


//setting test environment
process.env.NODE_ENV = 'test';

const app = require('./../../../src/app.js');
const connection = require('./../../../src/database/connection');

describe('Post Country',async ()=>{
    before((done)=>{
        connection().then(()=> done()).catch((err)=>done(err));
    })

    // calling home page api
    it("should save entry to database",function(done){
        this.timeout(10000);
        request(app)
        .post("/country")
        .set("Connection", "keep alive")
        .set("Content-Type", "application/json")
        .type("form")
        .send({
            id: Math.random() * 100,
            code: 'abc',
            name: 'abcd',
            nativeName: 'abcde',
            class: 'cls'
        }).then((res)=>{
            const body = res.body;
            assert.notEqual(body, null);
            done();
        }).catch((err)=> console.error(err));
    });
})
