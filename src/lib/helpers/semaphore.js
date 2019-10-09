"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSemaphore = () => {
    let sharedPromise = Promise.resolve();
    return class Semaphore {
        constructor() {
            let currentPromise = sharedPromise;
            let resolver;
            let newPromise = new Promise(resolve => {
                resolver = resolve;
            });
            sharedPromise = sharedPromise.then(() => {
                return newPromise;
            });
            this.acquire = function () {
                return currentPromise;
            };
            this.release = function () {
                resolver();
            };
        }
    };
};
