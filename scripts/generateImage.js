// tests the constructMfer-class in node
const ConstructMfer = require('../client/src/utils/ConstructMfer');

const dbag = {
    _id: '64d2cade32ec57aa7a558f04',
    asset: '320eb1b7e2f7127be233d43ff051abfb83684d7bcecb381aa10c238a646261674d66657235',
    policy_id: '320eb1b7e2f7127be233d43ff051abfb83684d7bcecb381aa10c238a',
    asset_name: '646261674d66657235',
    fingerprint: 'asset1s2xdsn4ypdf36t7ckfnjhljgu9wt0jj7jvjq2d',
    quantity: '1',
    initial_mint_tx_hash: '083c80bffe16bec86cca175179b54bc80af86f9f0c4f4790a8e10d93ff9c57c0',
    mint_or_burn_count: '1',
    onchain_metadata: {
        Eyes: 'Ada eyes',
        name: 'dbagMfer5',
        Mouth: 'Smile',
        image: 'ipfs://Qmf5aHqgoarbrM9HnNxjsLXKsahMfrqgPfQixQ7trKmLn6',
        Clothes: '',
        Special: '',
        BodyType: 'Invisible mfer',
        HeadItems: 'Tropical bucket hat',
        mediaType: 'image/webp',
        Background: 'Light red',
        HeadPhones: 'Rainbow',
        MouthItems: ''
    },
    onchain_metadata_standard: 'CIP25v1',
    createdAt: '1691536094469',
    updatedAt: '1691536094469'
}
const auto = {
    _id: '64d2cae132ec57aa7a55c56a',
    asset: '6e86a2dbd55b8b25d3ae95d2f056e47ab3df5b5f779531953c9bb12f446261674d666572734175746f436c75623038333532',
    policy_id: '6e86a2dbd55b8b25d3ae95d2f056e47ab3df5b5f779531953c9bb12f',
    asset_name: '446261674d666572734175746f436c75623038333532',
    fingerprint: 'asset1nvyymg5ua2xelksqjrgsgr92qpkxcelpngaj0g',
    quantity: '1',
    initial_mint_tx_hash: 'c28ca04f37fd09db177f09137e68c02fdeb89b072dfc99bc96c00471837ab184',
    mint_or_burn_count: '1',
    onchain_metadata: {
        name: 'Dbag Mfers Auto Club 8352',
        Car: 'Mfer 420 Fuchsia',
        Background: 'PurpleMoonDbagSpace',
        ExhaustFumes: 'Bubbles',
        image: 'ipfs://QmU26zd2vwmXLCfEmAYPWRWUsAgh8fRJGqjoDswRvAdbMi'
    },
    onchain_metadata_standard: 'CIP25v1',
    createdAt: '1691536097768',
    updatedAt: '1691536097768'
}

const start = async () => {

    // build the mfer + whip
    const constructMfer = new ConstructMfer()
    console.log(constructMfer)
    const img = await constructMfer.generateImage(dbag, auto)
    img.writeAsync(`./imgs/1.png`)

}
start()
