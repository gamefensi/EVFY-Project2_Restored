const Mailer = require("../models/mailerModel")

//create a helper function that will add a new email mailer to the database, if they want to add to their mailing list

module.exports = async function createMailer(fName, lName, email) {
    try{
        const existingEmail = await Mailer.findOne({ email: email });
        if (existingEmail) throw new Error(`A user with the this email already exists.`)
        const newMailer = new Mailer ({
            fName,
            lName,
            email
        })
        await newMailer.save()

        return {
            mailerId: newMailer._id
        }
    } catch (err) {
        throw err
    }
}