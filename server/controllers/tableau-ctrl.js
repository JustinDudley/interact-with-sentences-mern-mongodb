const Tableau = require('../models/tableau-model')

createTableau = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a tableau'
        })
    }
    // could also say: const tableau = new Tableau({"letter_pair": "AB", "sentence": "...", ... ...})
    const tableau = new Tableau(body)

    if (!tableau) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }

    tableau
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: tableau._id,
                message: 'Tableau created!',
            })

        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Tableau not created!'
            })
        })
}

getTableauById = async (req, res) => {
    await Tableau.findOne(
        {letter_pair: req.params.id.toUpperCase()},
        (err, tableau) => {
            if (err) {
                return res.status(400).json({success: false, error: err})
            }

        if (!tableau) {
            return res
                .status(404)
                .json({ success: false, error: 'Tableau not found'})
        }
        return res.status(200).json({ success: true, data: tableau})

        }).catch(err => console.log(err))
}

// postComment = async (req, res) => {
//     const body = req.body

//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: "You must provide a comment"
//         })
//     }
// }


// The following block logs ALL sentences to the console:
// const myFunc = async () => {
//     const all_tableaus = await Tableau.find()
//     console.log(all_tableaus)
// }
// myFunc()

module.exports = {
    createTableau,
    getTableauById,
}