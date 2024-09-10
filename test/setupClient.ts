import dotenv from 'dotenv';
import KanvasCore, { genericAuthMiddleware } from '../src/index';

dotenv.config();

let client: KanvasCore;

export const initializeClient = async (adminKey?: string) => {
    const getKey = async (): Promise<string | null> => {
        return localStorage.getItem("token") || null; // wherever you have saved the user token
    };

    // Mocking localStorage
    const localStorageMock = (function () {
        let store: { [key: string]: string } = {};

        return {
            getItem(key: string) {
                return store[key] || null;
            },
            setItem(key: string, value: string) {
                store[key] = value;
            },
            clear() {
                store = {};
            },
            removeItem(key: string) {
                delete store[key];
            }
        };
    })();

    Object.defineProperty(global, 'localStorage', { value: localStorageMock });

    client = new KanvasCore({
        url: process.env.KANVAS_URL!,
        key: process.env.KANVAS_APP_KEY!,
        ...(adminKey && { adminKey }), // Add adminKey only if it is provided
        middlewares: [genericAuthMiddleware(getKey)],
    });

    // Log in and set the token in localStorage
    const user = await client.auth.login(process.env.KANVAS_TEST_USER!, process.env.KANVAS_TEST_PASSWORD!);
    localStorage.setItem('token', user.token);
};

export const getClient = () => client;

export const createMockFile = (content: string, name: string, type: string): File => {
    return new File([content], name, { type });
};