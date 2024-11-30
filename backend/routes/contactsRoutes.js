const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");
const authenticateToken = require("../Middleware/authMiddleware");
const { default: mongoose } = require("mongoose");

// Get All Contacts (Public Route)
router.get("/api/contacts/getallcontacts", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.send(contacts);
    } catch (error) {
        return res.status(400).json({ message: "An error occurred", error });
    }
});

// Add Contact (Protected Route)
router.post("/api/contacts/addcontacts", authenticateToken, async (req, res) => {
    try {
        const newcontacts = new Contact(req.body);
        await newcontacts.save();
        res.send("Contact added successfully");
    } catch (error) {
        return res.status(400).json({ message: "An error occurred", error });
    }
});

// Edit Contact (Protected Route)
router.put("/api/contacts/editcontact", authenticateToken, async (req, res) => {
    const { _id, name, number, email } = req.body;

    if (!mongoose.isValidObjectId(_id)) {
        return res.status(400).json({ message: "Invalid contact ID" });
    }

    try {
        const contact = await Contact.findById(_id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        contact.name = name || contact.name;
        contact.number = number || contact.number;
        contact.email = email || contact.email;

        await contact.save();
        res.send("Contact updated successfully");
    } catch (error) {
        return res.status(400).json({ message: "An error occurred", error });
    }
});

// Change to DELETE route
router.delete("/api/contacts/deletecontact/:contactid", authenticateToken, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.contactid);
        if (!contact) return res.status(404).json({ message: "Contact not found" });

        res.send("Contact deleted successfully");
    } catch (error) {
        return res.status(400).json({ message: "An error occurred", error });
    }
});


module.exports = router;
