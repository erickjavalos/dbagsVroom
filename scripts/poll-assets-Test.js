const ExtractAssets = require('../server/utils/ExtractAssets');

const address = "addr_test1qrnns8ctrctt5ga9g990nc4d7pt0k25gaj0mnlda320ejmprlzyh4mr2psnrgh6ht6kaw860j5rhv44x4mt4csl987zslcr4p6"
const dbagPolicy = "ecb41dc4214459af7e74b40116704b5aed34d4deda785e59a7cf8c53"
const whipPolicy = "a89d6c96713c57190c98cae3d26a85e1528bc9ec22fb85d5e21e0ab7"

// extract all assets
const main = async () => 
{
    const extractAssets = new ExtractAssets(address, dbagPolicy, whipPolicy)
    // get assets 
    const assets = await extractAssets.getAssets()

}

main()
