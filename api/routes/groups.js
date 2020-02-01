const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/groups');
const check_auth = require('../middleware/check-auth'); 


router.get('/',GroupController.get_groups_all);

router.post('/creategroup',GroupController.post_group_create);

router.post('/',GroupController.delete_group_with_id);

router.post('/edit',GroupController.post_group_edit_id);

router.get('/groupIds',GroupController.get_groups_Id);

module.exports = router;