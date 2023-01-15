
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer, getAssociatedTokenAddress } from '@solana/spl-token';
import User from '../models/user';
const bs58 = require('bs58');

export const claim = async (req, res) => {
    
    // Connect to cluster
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    const user = await User.findOne({address: req.query.address}).exec();

    
    const fromWallet = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.PK)));
  

    const toWallet = new PublicKey(
        req.query.address
    );
  
    const mint = "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263";

    // // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(mint),
        fromWallet.publicKey
      );



    const associatedTokenTo = await getAssociatedTokenAddress(
        new PublicKey(mint),
        toWallet,
        true
    );

    // // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, new PublicKey(mint), toWallet, true);

    // Transfer the new token to the "toTokenAccount" we just created
    // if(user.bonkPoints > .01) {
    let signature = await transfer(
        connection,
        fromWallet,
        fromTokenAccount,
        associatedTokenTo,
        fromWallet.publicKey,
        Math.round(100000*user.bonkPoints)
        // 500000000
    // );

    user.bonkPoints = 0;
    user.save();
    user.password = undefined;
    return res.status(200).send(user);
    // } else {
    //     return res.send('no bonk points');
    // }


    
};