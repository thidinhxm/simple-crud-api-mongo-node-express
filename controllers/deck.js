const User = require('../models/User')
const Deck = require('../models/Deck')

const deleteDeck = async (req, res, next) => {
    try {
        const { deckID } = req.value.params
        
        const deck = await Deck.findById(deckID)
        const ownerID = deck.owner

        const owner = await User.findById(ownerID)
        
        await deck.remove()

        await owner.decks.pull(deck)
        await owner.save()

        return res.status(200).json({success: true})
    } catch (err) {
        next(err)
    }
}
const getDeck = async (req, res, next) => {
    try {
        const deck = await Deck.findById(req.value.params.deckID)
        return res.status(200).json({deck})
    } catch (err) {
        next(err)
    }
} 
const index = async (req, res, next) => {
    try {
        const decks = await Deck.find({})
        return res.status(200).json({decks})
    }
    catch (err) {
        next(err)
    }
}


const newDeck = async (req, res, next) => {
    try {
        const owner = await User.findById(req.value.body.owner)
        const newDeck = new Deck(req.value.body)
        await newDeck.save()
        owner.decks.push(newDeck._id)
        await owner.save()
        return res.status(201).json({deck: newDeck})
    } catch (err) {
        next(err)
    }

}

const replaceDeck = async (req, res, next) => {
    try {
        console.log(req.value.params)
        const { deckID } = req.value.params
        const newDeck = req.value.body
        const result = await Deck.findByIdAndUpdate(deckID, newDeck)
        return res.status(200).json({success: true})
    } catch (err) {
        next(err)
    }
}

const updateDeck = async (req, res, next) => {
    try {
        const { deckID } = req.value.params
        const newDeck = req.value.body
        const result = await Deck.findByIdAndUpdate(deckID, newDeck)
        return res.status(200).json({success: true})
    } catch (err) {
        next(err)
    }
}


module.exports = {
    index,
    newDeck,
    deleteDeck,
    getDeck,
    replaceDeck,
    updateDeck,
}