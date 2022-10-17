
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.3/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that get sender balance works properly",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let sender = accounts.get("deployer");
        let assetMaps = chain.getAssetsMaps();
        let balance = assetMaps.assets['STX'][sender.address];

        let block = chain.mineBlock([
            Tx.contractCall('simple-transaction', 'get-sender-balance', [], sender.address)
        ])

        // console.log(block)

        assertEquals(block.receipts.length, 1)

        // Check if sender balance returns the proper amount
        block.receipts[0].result.expectOk().expectUint(balance)
    },
});

Clarinet.test({
    name: "Ensure that get sender balance works properly",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let sender = accounts.get("deployer");
        let drain = accounts.get("wallet_1")
        let assetMaps = chain.getAssetsMaps();
        let balance = assetMaps.assets['STX'][sender.address];

        let block = chain.mineBlock([
            Tx.contractCall('simple-transaction', 'send-amount', [
                types.principal(drain.address),
                types.uint(balance+1)
            ], sender.address),
            Tx.contractCall('simple-transaction', 'send-amount', [
                types.principal(drain.address),
                types.uint(balance)
            ], sender.address),
            Tx.contractCall('simple-transaction', 'get-sender-balance', [], sender.address),
        ])

        // console.log(block)

        // Check if all 4 calls worked
        assertEquals(block.receipts.length, 3)

        // Check if proper error is returned for sending more that available amount
        block.receipts[0].result.expectErr().expectUint(101)

        // check if transaction properly goes through even when sending all available amount
        block.receipts[1].result.expectOk().expectBool(true)

        // Check if zero balance error works properly (in this case 0 because we already sent all the available amount)
        block.receipts[2].result.expectErr().expectUint(100)
    },
});
