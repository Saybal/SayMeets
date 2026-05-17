"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient, UserRequest } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_APP_SECRET;

const generateToken = async () => {
    const user = await currentUser();
    if (!user) {
        throw new Error("User not authenticated");
    }
    if (!apiKey || !apiSecret) {
        throw new Error("Stream API key or secret is missing");
    }

    const client = new StreamClient(apiKey, apiSecret);
// validity is optional (by default the token is valid for an hour)
    const validity = 60 * 60;
    const issuedAt = Math.floor(Date.now() / 1000) - 60; // issued 1 minute ago to account for clock skew
    return client.generateUserToken({ user_id: user.id, validity_in_seconds: validity, issued_at: issuedAt });
}

export default generateToken;