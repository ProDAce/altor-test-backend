const express = require("express");
const { check, validationResult } = require("express-validator");
const Device = require("../models/device");
const router = express.Router();

// @route    GET api/device
// @desc     Fetch all devices
// @access   Public
router.get("/", async (req, res) => {
    try {
        const devices = await Device.find();
        // const devices = await Device.find().select("name");
        res.status(200).json({ result: devices });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" })
    }
})


// @route    POST api/device
// @desc     Add a device
// @access   Public
const checkDataForAdd = [
    check("device_brand", "device_brand is required").notEmpty(),
    check("model", "model is required").notEmpty(),
    check("processor", "processor is required").notEmpty(),
    check("sdk_int", "sdk_int is required").isNumeric().notEmpty(),
    check("username", "username is required").notEmpty(),
    check("vehicle_brand", "vehicle_brand is required").notEmpty(),
    check("vehicle_cc", "vehicle_cc is required").notEmpty(),
    check("vehicle_type", "vehicle_type is required").notEmpty(),
    check("zone", "zone is required").notEmpty()
];

router.post("/", checkDataForAdd, async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { device_brand, model, processor, sdk_int, username, vehicle_brand, vehicle_cc, vehicle_type, zone } = req.body;

        let deviceFields = {
            device_brand,
            model, processor,
            sdk_int, username,
            vehicle_brand,
            vehicle_cc,
            vehicle_type,
            zone
        }
        const device = new Device(deviceFields);
        await device.save();
        res.status(201).json({ message: "Device created successfully" });
    } catch (error) {
        console.error(error);
        if ("code" in error && error.code == 11000) {
            res.status(500).json({ message: "Duplicate username" })
        } else {
            res.status(500).json({ message: "Internal server error" })
        }
    }
})

// const checkDataForDelete = check("username", "username is required").notEmpty();

router.delete("/", async (req, res) => {
    try {
        // const device = Device.findOneAndDelete({ _id: id })
        // console.log(req);
        res.status(201).json(req.body)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router;