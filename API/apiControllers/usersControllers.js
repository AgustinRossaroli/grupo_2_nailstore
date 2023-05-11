const allUsers = (req, res) => {
    res.json ({
        users:[
            {
                id: 1,
                nombre: " yhoxin"

            }
        ]
    })
}

module.exports = {
    allUsers
}
