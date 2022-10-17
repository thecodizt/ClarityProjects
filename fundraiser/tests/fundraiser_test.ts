
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.3/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that get-balance works properly",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let deployer = accounts.get("deployer")
        let funder = accounts.get("wallet_1")
        let assetMap = chain.getAssetsMaps();
        let balance = assetMap.assets['STX'][deployer.address]

        let block = chain.mineBlock([
            Tx.contractCall('fundraiser', 'get-balance', [], deployer.address),
            Tx.contractCall('fundraiser', 'get-balance', [], funder.address),
        ])

        // console.log(block)

        assertEquals(block.receipts.length, 2)

        block.receipts[0].result.expectOk().expectUint(balance)
        block.receipts[1].result.expectErr().expectUint(100)
    },
});


Clarinet.test({
    name: "Ensure that fund works properly",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let deployer = accounts.get("deployer")
        let funder = accounts.get("wallet_1")
        let assetMap = chain.getAssetsMaps();
        let deployerBalance = assetMap.assets['STX'][deployer.address]
        let funderBalance = assetMap.assets['STX'][funder.address]

        let block = chain.mineBlock([
            Tx.contractCall('fundraiser', 'get-balance', [], deployer.address),
            Tx.contractCall('fundraiser', 'fund', [
                types.uint(funderBalance)
            ], funder.address),
            Tx.contractCall('fundraiser', 'get-balance', [], deployer.address),
        ])

        // console.log(block)

        assertEquals(block.receipts.length, 3)

        block.receipts[0].result.expectOk().expectUint(deployerBalance)
        block.receipts[1].result.expectOk().expectBool(true)
        block.receipts[2].result.expectOk().expectUint(deployerBalance+funderBalance)
    },
});

Clarinet.test({
    name: "Ensure that fund works properly",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let deployer = accounts.get("deployer")
        let funder = accounts.get("wallet_1")
        let beneficiary = accounts.get("wallet_2")
        let assetMap = chain.getAssetsMaps();
        let deployerBalance = assetMap.assets['STX'][deployer.address]
        let funderBalance = assetMap.assets['STX'][funder.address]
        let beneficiaryBalance = assetMap.assets['STX'][beneficiary.address]

        let block = chain.mineBlock([
            Tx.contractCall('fundraiser', 'get-balance', [], deployer.address),
            Tx.contractCall('fundraiser', 'fund', [
                types.uint(funderBalance)
            ], funder.address),
            Tx.contractCall('fundraiser', 'get-balance', [], deployer.address),
            Tx.contractCall('fundraiser', 'cash-out', [
                types.principal(beneficiary.address)
            ], deployer.address),
            Tx.contractCall('fundraiser', 'get-balance', [], deployer.address),
            Tx.contractCall('fundraiser', 'fund', [
                types.uint(funderBalance)
            ], funder.address),
        ])

        // console.log(block)

        assertEquals(block.receipts.length, 6)

        block.receipts[0].result.expectOk().expectUint(deployerBalance)
        block.receipts[1].result.expectOk().expectBool(true)
        block.receipts[2].result.expectOk().expectUint(deployerBalance + funderBalance)
        block.receipts[3].result.expectOk().expectBool(true)
        block.receipts[4].result.expectOk().expectUint(0)
        block.receipts[5].result.expectErr().expectUint(101)
        
    },
});
