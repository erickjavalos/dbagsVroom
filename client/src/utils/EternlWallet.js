class EternlWallet {
    constructor(cardano) {
        this.cardano = cardano
    }

    // Nami Wallet Endpoints
    async isInstalled() {
        if (this.cardano.eternl) return true
        else return false
    }
    // isEnabled()
    async isEnabled() {
        return await this.cardano.isEnabled()
    }
    // prompts user to connect their wallet 
    async enable() {
        try {
            return await this.cardano.eternl.enable()
        } catch (error) {
        throw error
        }
        
    }

}

// export Nami class
module.exports = EternlWallet;