const Tableau = require('../models/tableau-model')

createTableau = (req, res) => {
    const body = req.body

    // Booyah. This stops the process early if no body is included: 
    if (Object.keys(body).length === 0) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a tableau'
        })
    }

    // could also say: const tableau = new Tableau({"letter_pair": "AB", "sentence": "...", ... ...})
    const tableau = new Tableau(body)

    // don't know under what circumstances this error could happen...
    if (!tableau) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }

    tableau
        // next line creates the document in the database
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
                messageYoFromBE: 'Tableau not created!'
            })
        })
}

getTableauById = async (req, res) => {
    await Tableau.findOne(
        {letter_pair: req.params.id.toUpperCase()},
        (err, tableau) => {
            // can trigger by turning off Wi-Fi
            if (err) {
                return res.status(400).json({success: false, error: err})
            }

            // if user asks for a letter_pair that doesn't exist
            if (!tableau) {
                return res
                    .status(404)
                    .json({ success: false, error: 'Tableau not found'})
            }
            return res.status(200).json({ success: true, document: tableau})

        }).catch(err => console.log('i am console logging this error: ', err))
}

postComment = async (req, res) => {
    const body = req.body

    // This is doing nothing:
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a comment"
        })
    }

    await Tableau.updateOne(
        {letter_pair: req.params.id},
        { $push: { comments: req.body.comment }},
        (error, successObj) => {
            // Can trigger this response to postman by turning off Wi-Fi
            if (error) {
                return res.status(400).json({success: false, error: error})

            } else {
                // if succesObj.matchedCount === 0, return some error message.
                // that means the asked-for letter_pair doesn't exist
                console.log('yesssss ', successObj);
                return res.status(200).json({ 
                    success: true, 
                    myComment: "at least I think so...", 
                    successObj: successObj
                })
            }}
    )
    .catch(err => console.log(err))
    console.log("letter_pair to update is: ", req.params.id )
}

// The following block logs ALL sentences to the console:
// const myFunc = async () => {
//     const all_tableaus = await Tableau.find()
//     console.log(all_tableaus)
// }
// myFunc()

module.exports = {
    createTableau,
    getTableauById,
    postComment,
}