const mongoose = require('mongoose');
require("dotenv").config();

module.exports.connect = async () => {
		const uri = await process.env.DB;
    const mongooseOpts = 
    {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
    };
		await mongoose.connect(uri, mongooseOpts);
};

//disconnect and close connection
module.exports.closeDatabase = async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
}