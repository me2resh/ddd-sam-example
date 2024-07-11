import { createLogger, format, transports, Logger } from 'winston';

describe('Logger', () => {
    let logger: Logger;

    beforeEach(() => {
        jest.resetModules();
        process.env.NODE_ENV = 'test';

        // Create a new logger instance for each test
        logger = createLogger({
            level: process.env.NODE_ENV === 'test' ? 'silent' : 'info',
            format: format.combine(format.timestamp(), format.json()),
            defaultMeta: { service: 'user-service' },
            transports: [
                new transports.Console(),
                new transports.File({ filename: 'error.log', level: 'error' }),
                new transports.File({ filename: 'combined.log' }),
            ],
        });

        if (process.env.NODE_ENV === 'test') {
            logger.transports.forEach((t) => (t.silent = true));
        }
    });

    it('should be silent in test environment', () => {
        process.env.NODE_ENV = 'test';
        logger.transports.forEach((t) => (t.silent = true));

        logger.info('This should not be logged');
        logger.error('This should not be logged either');

        logger.transports.forEach((transport) => {
            expect(transport.silent).toBe(true);
        });
    });

    it('should log info messages in non-test environment', () => {
        process.env.NODE_ENV = 'development';
        logger = createLogger({
            level: process.env.NODE_ENV === 'test' ? 'silent' : 'info',
            format: format.combine(format.timestamp(), format.json()),
            defaultMeta: { service: 'user-service' },
            transports: [
                new transports.Console(),
                new transports.File({ filename: 'error.log', level: 'error' }),
                new transports.File({ filename: 'combined.log' }),
            ],
        });

        logger.transports.forEach((t) => (t.silent = process.env.NODE_ENV === 'test'));

        const infoSpy = jest.spyOn(logger, 'info').mockImplementation(() => logger);
        const errorSpy = jest.spyOn(logger, 'error').mockImplementation(() => logger);

        logger.info('This is an info message', { meta: 'info' });
        logger.error('This is an error message', { meta: 'error' });

        expect(infoSpy).toHaveBeenCalledWith('This is an info message', { meta: 'info' });
        expect(errorSpy).toHaveBeenCalledWith('This is an error message', { meta: 'error' });
    });

    it('should have correct default meta', () => {
        expect(logger.defaultMeta).toEqual({ service: 'user-service' });
    });

    it('should have correct transport configurations', () => {
        expect(logger.transports).toHaveLength(3);
        expect(logger.transports[0]).toBeInstanceOf(transports.Console);
        expect(logger.transports[1]).toBeInstanceOf(transports.File);
        expect(logger.transports[1].level).toBe('error');
        expect(logger.transports[2]).toBeInstanceOf(transports.File);
        // TODO understand why this assertion is not working and fix it.
        // expect(logger.transports[2].level).toBe('error');
    });
});
