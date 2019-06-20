require("dotenv").config();

import express from 'express';
import nextapp from './nextapp'
import router from './api';

const port = parseInt(process.env.PORT || '3000', 10);

const handle = nextapp.getRequestHandler();

nextapp.prepare().then(() => {
    const server = express();

    server.use('/api', router);

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
