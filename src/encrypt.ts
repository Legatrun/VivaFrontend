import crypto from 'crypto-js';

export default class Encrypt {
    private passwordAES32: any = '[6bg#d1sa%y5ui/4pb=cxawf8bsFs+z';
	private keySize = 256;
	private ivSize = 128;
	private iterations = 100;
	private iv: any;
	private salt: any;
	private paramsEncripted!: string;

	public EncryptAES(text: string) {
		this.GenerateKey();
        const key = crypto.PBKDF2(this.passwordAES32, this.salt, {
            keySize: this.keySize / 32,
            iterations: this.iterations,
        });
        const encrypted = crypto.AES.encrypt(text, key, {
            iv: this.iv,
            padding: crypto.pad.Pkcs7,
            mode: crypto.mode.CBC,
        });
		const transitmessage = this.salt.toString() + this.iv.toString() + encrypted.toString();
		return transitmessage;
	}

	public DecryptAES(text: string) {
		this.GenerateKey();
        const key = crypto.PBKDF2(this.passwordAES32, this.salt, {
            keySize: this.keySize / 32,
            iterations: this.iterations,
        });
        const decrypted = crypto.AES.decrypt(text, key, {
            iv: this.iv,
            padding: crypto.pad.Pkcs7,
            mode: crypto.mode.CBC,
        });
		const plainmessage =  decrypted.toString();
        return plainmessage;
	}
	private GenerateKey() {
        this.salt = crypto.lib.WordArray.random(this.ivSize / 8);
        this.iv = crypto.lib.WordArray.random(this.ivSize / 8);
    }
    private GetKey(salt: any, iv: any) {
        this.salt = salt;
        this.iv = iv;
    }
}
