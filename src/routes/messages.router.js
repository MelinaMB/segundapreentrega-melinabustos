import express from "express";

export const messagesRouter = express.Router();

messagesRouter.get('/', (req, res) => {
    return res.render('chat', {});  
});
