
// import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, Web3} from '@solana/web3.js';
// import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer, getAssociatedTokenAddress } from '@solana/spl-token';
import User from '../models/user';
const bs58 = require('bs58');
import {
    Keypair,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
  clusterApiUrl,
  Connection,
  PublicKey
} from "@solana/web3.js";



export const solClaim = async (req, res) => {

    // Connect to cluster
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    const user = await User.findOne({ address: req.query.address }).exec();


    const fromWallet = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.PK)));


    const toWallet = new PublicKey(
        req.query.address
    );

    // let fromKeypair = Keypair.generate();x/
    // let toKeypair = Keypair.generate();
    let transaction = new Transaction();

    transaction.add(
        SystemProgram.transfer({
            fromPubkey: fromWallet.publicKey,
            toPubkey: toWallet,
            lamports: Math.round(LAMPORTS_PER_SOL * user.solPoints),
        }),
    );


    sendAndConfirmTransaction(connection, transaction, [fromWallet]);

    user.solPoints = 0;
    user.save();
    user.password = undefined;
    return res.status(200).send(user);
    // } else {
    //     return res.send('no bonk points');
    // }



};