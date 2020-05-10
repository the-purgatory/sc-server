const express = require('express');

const router = express.Router();

const { UserModel } = require('../models');

const { constructRestResponse, parseUserDataToSend } = require('../helpers');

const _user = new UserModel();

// Get all Users data
router.get('/me', async (req, res) => {
  try {
    const user = parseUserDataToSend(
      await _user.getUserFromId(req.user._id),
      true
    );
    res.status(200).send(constructRestResponse(200, 'SUCCESS', user));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, 'ERROR', err));
  }
});

// Get all Users data
router.get('/all_friends', async (req, res) => {
  try {
    const userId = req.query.id;
    let filter = {};
    console.log('---------', userId);
    if (userId) {
      filter = {
        _id: {
          $ne: userId
        }
      };
    }
    const users = (await _user.getUsers(filter)).map((user) =>
      parseUserDataToSend(user)
    );
    res.status(200).send(constructRestResponse(200, 'SUCCESS', users));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, 'ERROR', err));
  }
});

// Mark / Unmark favourites
router.get('/mark_favourite', async (req, res) => {
  const { id, mark, unmark } = req.query;

  try {
    const response = await _user.markFavourite(id, mark, unmark);
    res.status(200).send(constructRestResponse(200, 'SUCCESS', response));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, 'ERROR', err));
  }
});

// Mark / Unmark block
router.get('/mark_block', async (req, res) => {
  const { id, mark, unmark } = req.query;

  try {
    const response = await _user.markBlock(id, mark, unmark);
    res.status(200).send(constructRestResponse(200, 'SUCCESS', response));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, 'ERROR', err));
  }
});

// Get all Users data
router.get('/', async (req, res) => {
  try {
    const users = (await _user.getUsers()).map((user) =>
      parseUserDataToSend(user)
    );
    res.status(200).send(constructRestResponse(200, 'SUCCESS', users));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, 'ERROR', err));
  }
});

// Get a User data
router.get('/:id', async (req, res) => {
  try {
    const user = parseUserDataToSend(await _user.getUserFromId(req.params.id));
    res.status(200).send(constructRestResponse(200, 'SUCCESS', user));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, 'ERROR', err));
  }
});

// Delete a User
router.delete('/:id', async (req, res) => {
  try {
    const response = await _user.removeUser(req.params.id);
    res.status(200).send(constructRestResponse(200, 'SUCCESS', response));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, 'ERROR', err));
  }
});

// Update a User data
router.put('/:id', async (req, res) => {
  try {
    const user = parseUserDataToSend(
      await _user.updateUser(req.params.id, req.body)
    );
    res.status(200).send(constructRestResponse(200, 'SUCCESS', user));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, 'ERROR', err));
  }
});

module.exports = router;
