const MembersController = require('../controllers/members');
const express = require('express');
const router = express.Router();
const check_auth = require('../middleware/check-auth'); 


router.get('/:groupId',MembersController.get_members_with_id );

router.post('/createmember',MembersController.post_members_createmember);

router.post('/',MembersController.delete_members_with_id);

router.post('/edit/:name',MembersController.post_members_edit_name);

module.exports = router;