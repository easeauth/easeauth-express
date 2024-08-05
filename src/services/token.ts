import jwt from "jsonwebtoken";


export const decryptToken = (
    token: string,
    secret: string
) => {
    return jwt.verify(token, secret);
};
