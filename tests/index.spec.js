const request = require('supertest');
const app = require('../app');
const mongoose = require("mongoose");
const Mailer = require("../models/mailerModel");
const createMailer = require('../controller/createMailer')
const db = require('./db')

beforeAll(async () => await db.connect())

afterAll(async () => await db.closeDatabase())

describe("Test responses from querying database", () => {

    it(`Returns a Mailer`, async done => {
        const { mailerId } = await createMailer("Jim", "Bo", "e@mail.com")

        //find mailer from db
        const mailer = await Mailer.findById(mailerId)

        // check the name, email of mailer found
        expect(mailer.fName).toEqual("Jim")
        expect(mailer.lName).toEqual("Bo")
        expect(mailer.email).toEqual("e@mail.com")
        done()
    })
})