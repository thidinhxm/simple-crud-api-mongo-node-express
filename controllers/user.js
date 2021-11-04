const User = require('../models/User')
const Deck = require('../models/Deck')

const getUser = async (req, res, next) => {
    try {
        const { userID } = req.value.params
        const user = await User.findById(userID)
        return res.status(200).json({user})
    } catch (err) {
        next(err)
    }
    
}

const getUserDecks = async (req, res, next) => {
    try {
        const { userID } = req.value.params
        const user = await User.findById(userID).populate('decks')
        return res.status(200).json({userDecks: user.decks})
    } catch (err) {
        next(err)
    }
}

const index = async (req, res, next) => {
    try {
        const users = await User.find({})
        return res.status(200).json({users})
    }
    catch (err) {
        next(err)
    }
}


const newUser = async (req, res, next) => {
    try {
        const newUser = new User(req.value.body)
        const user = await newUser.save()
        return res.status(201).json({user})
    } catch (err) {
        next(err)
    }

}

const newUserDecks = async (req, res, next) => {
    try {
        const { userID } = req.value.params
        // create a new deck
        const newDeck = new Deck(req.value.body)

        // get user
        const user = await User.findById(userID)

        // assign user as a deck's user
        newDeck.owner = user

        // save the deck
        await newDeck.save()
        
        //add deck to user's decks array 'decks
        user.decks.push(newDeck._id)

        await user.save()

        res.status(201).json({deck: newDeck})
    } catch (err) {
        next(err)
    }
}
const replaceUser = async(req, res, next) => {
    try {
        // enforce new user to old user
        const { userID } = req.value.params
        const newUser = req.value.body
        const result = await User.findByIdAndUpdate(userID, newUser)
        return res.status(200).json({success: true})
    } catch(err) {
        next(err)
    }
}

const secrect = async () => {

}

const signIn = async () => {

} 

const signUp = async () => {

}

const updateUser = async(req, res, next) => {
    // member of field
    try {
        // enforce new user to old user
        const { userID } = req.value.params
        const newUser = req.value.body
        const result = await User.findByIdAndUpdate(userID, newUser)
        return res.status(200).json({success: true})
    } catch(err) {
        next(err)
    }
}


module.exports = {
    index,
    getUser,
    getUserDecks,
    newUser,
    newUserDecks,
    replaceUser,
    secrect,
    signIn,
    signUp,
    updateUser,
}