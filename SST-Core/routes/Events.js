const express = require("express");
const router = express.Router();
const Event = require("../models/EventSchema");

router.post("/add", async (req, res) => {
  try {
    const { title, description, location, date,type, imageUrl, photos } = req.body;

    const newEvent = new Event({
      title,
      description,
      location,
      date,
      type,  
      imageUrl,
      photos
    });
 const allowedTypes = ['competition', 'update', 'workshop', 'announcement'];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ error: "Invalid event type" });
    }
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json({ error: "Event add error " });
  }
});


router.get("/", async (req, res) => {
  try {
    const events = await Event.find(); 
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Error " });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "الحدث غير موجود" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "حدث خطأ أثناء تحميل الحدث" });
  }
});

// ✅ تحديث Event
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!updatedEvent) return res.status(404).json({ error: "الحدث غير موجود" });
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: "حدث خطأ أثناء التحديث" });
  }
});

// ✅ حذف Event
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ error: "الحدث غير موجود" });
    res.json({ message: "تم حذف الحدث بنجاح" });
  } catch (err) {
    res.status(500).json({ error: "حدث خطأ أثناء الحذف" });
  }
});

module.exports = router;
