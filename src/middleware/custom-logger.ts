import type { Request, Response, NextFunction } from 'express';
import debug from 'debug';

const log = debug('express-server:middleware');
log('Custom logger loaded');

export const customLogger = () => {
    return (_req: Request, _res: Response, next: NextFunction) => {
        log(`[${_req.method}], ${_req.url}`);
        next();
        return;
    };
};
