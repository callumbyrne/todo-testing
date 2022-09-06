import "dotenv/config";

export default {
    port: 1337,
    origin: "https://callumbyrne.com/",
    domain: "callumbyrne.com",
    dbUri: process.env.MONGODB_URI,
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1yr",
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
};
