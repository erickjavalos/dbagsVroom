class NamiWallet {
    constructor(cardano) {
        this.cardano = cardano
    }

    // Nami Wallet Endpoints
    async isInstalled() {
        // console.log(this.N)
        if (this.cardano.nami) return true
        else return false
    }
    // isEnabled()
    async isEnabled() {
        return await this.cardano.isEnabled()
    }
    // prompts user to connect their wallet 
    async enable() {
        try {
        return await this.cardano.nami.enable()
        } catch (error) {
        throw error
        }
        
    }

}

// export Nami class
module.exports = NamiWallet;