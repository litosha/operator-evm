const
    router = require('express').Router(),
    controller = require('../controllers/score');

router.get('/', controller.get_score);
router.post('/create', controller.create_score);

module.exports = router;