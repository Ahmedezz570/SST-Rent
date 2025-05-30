const express = require('express');
const router = express.Router();
const RentRequest = require('../models/RequestSchema');

const authMiddleware = require('../middleware/auth'); 
const Tool = require('../models/ToolsSchema');
const logToolAction = require('../utils/logToolAction');
router.post('/rent/:toolId', authMiddleware, async (req, res) => {
  const { toolId } = req.params;
  const { reason } = req.body;

  try {
    const tool = await Tool.findById(toolId);
    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    const request = new RentRequest({
       toolId: toolId,      
  userId: req.user._id,    
      reason,
        expectedReturnDate: req.body.expectedReturnDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    });

    await request.save();
     await logToolAction({
            tool: tool._id, 
            user: req.user._id, 
            action: 'pending' ,
            date: new Date(),
          });
    res.status(201).json({ message: 'Request has been send succefuly', request }); 

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'حصل خطأ أثناء إرسال الطلب' });
  }
});


router.get('/rent/requests', async (req, res) => {
  try {
    const requests = await RentRequest.find(); 
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب الطلبات' });
  }
});


router.post('/rent/approve/:id', authMiddleware, async (req, res) => {
  const { id , name} = req.params;

  try {
    const request = await RentRequest.findById(id);
    if (!request) {
      return res.status(404).json({ error: 'الطلب غير موجود' });
    }

    request.status = 'approved';
    await request.save();

    const tool = await Tool.findById(request.toolId);
    if (tool) {
      tool.status = 'In Use';
      await tool.save();
    }

    await logToolAction({
      tool: request.toolId,
      user: request.userId,
      admin : req.user._id,
      action: 'rented',
    });

    res.status(200).json({ message: 'تمت الموافقة على الطلب بنجاح', request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'حدث خطأ أثناء الموافقة على الطلب' });
  }
});


router.post('/rent/reject/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const request = await RentRequest.findById(id);
    if (!request) {
      return res.status(404).json({ error: 'الطلب غير موجود' });
    }

    request.status = 'rejected';
    await request.save();

  

    res.status(200).json({ message: 'تم رفض الطلب بنجاح', request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'حدث خطأ أثناء رفض الطلب' });
  }
});

module.exports = router;
