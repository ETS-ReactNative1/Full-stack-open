const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Syntax error!')
    process.exit(1)
}
else {
    const password = process.argv[2]

    const url =
        `mongodb+srv://user_0:${password}@cluster0.vuueh.mongodb.net/phonebook?retryWrites=true&w=majority`
    
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })

    const Person = mongoose.model('Person', personSchema)

    if (process.argv.length == 3) {
        Person
        .find({})
        .then(result => {
                console.log('phonebook:')
                result.forEach(person => {
                    console.log(`${person.name} ${person.number}`)
                })
                mongoose.connection.close()
            })
    }
    else {
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4]
        })

        person.save().then(result => {
            console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
            mongoose.connection.close()
        })
    }
}