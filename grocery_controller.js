const express = require('express');
const AdminSchema = require('../Models/admin')
const GrocerySchema = require('../Models/grocery')
const UserSchema = require('../Models/user')
const OrderSchema = require('../Models/order')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()



const UpdateGrocery = async (req, res) => {
    try {
        let id = req.params.id;
        const { name, description, price, quantity,image } = req.body
        let grocery = await GrocerySchema.findById(id)
        if (!grocery) {
            return res.json({ success: false, message: "Grocery Not Found!!!" })
        }
        let newGrocery = {}
        if (name) { newGrocery.name = name }
        if (description) { newGrocery.description = description }
        if (price) { newGrocery.price = price }
        if (quantity) { newGrocery.quantity = quantity }
        if (image) { newGrocery.image = image }
        let updatedGrocery = await GrocerySchema.findByIdAndUpdate(id, { $set: newGrocery }, { new: true })
        res.json({ success: true, updatedGrocery })
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}

const DeleteGrocery = async (req, res) => {
    try {
        let id = req.params.id;
        let grocery = await GrocerySchema.findById(id);
        if (!grocery) {
            res.json({ success: false, message: "Grocery Not Found!!!" })
        }
        let deleteGrocery = await GrocerySchema.findByIdAndDelete(id)
        return res.json({ success: true, deleteGrocery })
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}

module.exports = { UpdateGrocery, DeleteGrocery }