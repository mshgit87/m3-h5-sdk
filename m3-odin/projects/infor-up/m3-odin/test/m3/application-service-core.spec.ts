import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { ApplicationServiceCore, UserServiceCore } from '../../m3';
import { IMessage } from '../../m3/types';

describe('ApplicationServiceCore', () => {
    let service: ApplicationServiceCore;
    const message: IMessage = {
        m3Command: 'launch',
        m3Parameter: { link: 'foo' }
    };

    beforeEach(() => {
        service = new ApplicationServiceCore();
    });

    afterEach(() => {
        // restore the spy created with spyOn
        jest.restoreAllMocks();
    });


    it('should return if H5 environment', () => {
        UserServiceCore.isH5Host = true;
        expect(service.isH5()).toBe(true);
    });

    it('should launch m3 app', () => {
        const spySendMessage = jest.spyOn(service as any, 'sendMessage').mockImplementation((message) => {
            expect(message).toStrictEqual(message);
        });
        service.launch(message.m3Parameter.link);
        expect(spySendMessage).toHaveBeenCalled();
    });

    it('should post message', () => {
        const spyPostMessage = jest.spyOn(parent, 'postMessage').mockImplementation((message) => {
            expect(message).toBe('{\"m3Command\":\"launch\",\"m3Parameter\":{\"link\":\"foo\"}}');
         });
        service['sendMessage'](message);
        expect(spyPostMessage).toHaveBeenCalled();
    });
});