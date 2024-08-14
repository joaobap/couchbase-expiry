import { env } from 'node:process';
import { connect } from 'couchbase'

async function main() {
    const cluster = await connect(env.CB_HOST, {
        username: env.CB_USER,
        password: env.CB_PASSWORD,
    });
    const bucket = cluster.bucket(env.BUCKET);
    const collection = bucket.defaultCollection();
    const doc = {
        hello: "world",
    };
    const expiry = Math.floor(Date.now() / 1000) + 60 * 60;
    const options = { expiry };
    await collection.upsert('bar440', doc, options);

    const getRes = await collection.get('bar440', { withExpiry: true });
    console.log(getRes.expiryTime);
}

main().catch(error => console.log(error));
