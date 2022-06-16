import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import fs from "fs";
import path from "path";
import {Request} from "express";

interface IGenerateHash {
    salt: string;
    hash: string;
}

export interface IUserPayload {
    code: number;
    name: string;
    email: string;
}

const pathToKey = path.join(__dirname, '../../..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
const HASH_ITERATIONS = 10000;

const generateHash = (password: string): IGenerateHash => {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, HASH_ITERATIONS, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: hash
    }
}

const checkPassword = (
    passwordTyped: string,
    salt: string,
    hash: string
): Boolean => {

    const passwordTypedHash = crypto.pbkdf2Sync(
        passwordTyped,
        salt,
        HASH_ITERATIONS,
        64,
        'sha512'
    ).toString('hex');

    return hash === passwordTypedHash;
}


const generateToken = (user: IUserPayload): string => {
    const payload = {
        sub: user.code,
        name: user.name,
        email: user.email,
    }

    return jsonwebtoken.sign(
        payload, 
        PRIV_KEY, 
        { expiresIn: '7d', algorithm: 'RS256' }
    );
}

const getToken = (request: Request): string => {
    const header = request.get('Authorization');
    if(!header) throw new Error("Token not found");
    return header.split(' ')[1];
}

const getAuthenticatedUser = (token: string) => {
    const payload = token.split('.')[1];
    const encodedPayload = Buffer.from(payload, 'base64');
    const decodedPayload = encodedPayload.toString('utf-8');

    return JSON.parse(decodedPayload);
}

export {
    generateHash,
    generateToken,
    getToken,
    getAuthenticatedUser,
    checkPassword,
}