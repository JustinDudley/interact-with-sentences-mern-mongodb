const mongoose = require('mongoose')

const TableauSchema = new mongoose.Schema(
    {
        letter_pair: { type: String, required: true },
        starter_sentence: { type: String, required: true },
        images: {
            person: { type: String, required: true },
            verb: { type: String, required: false },
            object: { type: String, required: false },
            supplemental: { type: String, required: false }
        },
        elaboration: {
            pronunciation: { type: String, required: false },
            synopsis: { type: String, required: true },
            hybrid_definition: { type: String, required: false },
            backstory: {
                story: { type: String, required: true },
                length: { type: Number, required: true }
            }
        },
        group: { type: [String], required: false },
        comments: { type: [String], required: false },
        word_resources: {
            more_words: { type: String, required: false },
            legacy_sentence: { type: String, required: false }
        },
        memory_tags: {
            location: { type: String, required: true },
            tableau: { type: String, required: false }
        }
    },
    { timestamps: true }
)

// embedded_tableaus is the COLLECTION name
const Tableau = mongoose.model('embedded_tableaus', TableauSchema)

// to export this Tableau...
module.exports = Tableau

