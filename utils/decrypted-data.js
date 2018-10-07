const crypto=require('crypto');

const decryptData=(encryptedData,iv,sessionKey,appid)=>{
    //base64 decode
    const encryptedDataNew=Buffer.from(encryptedData,'base64');
    const sessionKeyNew=Buffer.from(sessionKey,'base64');
    const ivNew=Buffer.from(iv,'base64');
    // console.log('encryptedData->',encryptedData,'iv:',iv,'sessionKey:',sessionKey,'appid:',appid);
    let decoded='';
    try{
        //解密,使用的算法是aes-128-cbc
        const decipher=crypto.createDecipheriv('aes-128-cbc',sessionKeyNew,ivNew);
        //设置自动padding为true,删除填充补位
        decipher.setAutoPadding(true);
        decoded=decipher.update(encryptedDataNew,'binary','utf8');
        decoded+=decipher.final('utf8');
        console.log('decoded',decoded);
        //解密后的用户信息
        decoded=JSON.parse(decoded)
    }catch(err){
        console.log(err);
        throw new Error('Illegal Buffer');
    }

    if(decoded.watermark.appid!==appid){
        throw new Error('Illegal Buffer');
    }

    //返回解密后的用户的数据
    return decoded;
}

module.exports=decryptData;