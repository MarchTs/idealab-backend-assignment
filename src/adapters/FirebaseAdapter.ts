// Import the functions you need from the SDKs you need
import firebaseConfig from '@cert/firebaseConfig.json';
import { initializeApp } from 'firebase/app';
import { Auth, UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Service } from 'typedi';
import { FirebaseUserAlreadyExistsError, FirebaseUserError, InvalidEmailOrPasswordError } from './FirebaseUserError';

@Service()
export class FirebaseAuthAdapter {
    private readonly firebaseAuth: Auth;
    constructor() {
        const firebaseApp = initializeApp(firebaseConfig);
        this.firebaseAuth = getAuth(firebaseApp);
    }
    public async createUser(email: string, password: string): Promise<UserCredential> {
        try {
            const user = await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
            return user;
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                throw new FirebaseUserAlreadyExistsError();
            }
            console.error(`FirebaseAuthAdapter.createUser`, error);
            throw new FirebaseUserError();
        }
    }

    public async loginUser(email: string, password: string): Promise<UserCredential> {
        try {
            const user = await signInWithEmailAndPassword(this.firebaseAuth, email, password);
            return user;
        } catch (error) {
            throw new InvalidEmailOrPasswordError();
        }
    }
}
