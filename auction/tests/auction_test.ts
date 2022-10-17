
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.3/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that get and set item url works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let testURL = "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu"
        
        let seller = accounts.get("deployer")
        let bidder1 = accounts.get("wallet_1")
        
        let block = chain.mineBlock([
            Tx.contractCall('auction', 'get-auction-item-url', [], seller.address),
            Tx.contractCall('auction', 'get-auction-item-url', [], bidder1.address),
            Tx.contractCall('auction', 'set-auction-item-url', [
                types.utf8(testURL)
            ], bidder1.address),
            Tx.contractCall('auction', 'set-auction-item-url', [
                types.utf8(testURL)
            ], seller.address),
            Tx.contractCall('auction', 'get-auction-item-url', [], seller.address),
            Tx.contractCall('auction', 'get-auction-item-url', [], bidder1.address),
        ])

        // console.log(block)

        assertEquals(block.receipts.length, 6)

        block.receipts[0].result.expectErr().expectUint(100)
        block.receipts[1].result.expectErr().expectUint(100)
        block.receipts[2].result.expectErr().expectUint(102)
        block.receipts[3].result.expectOk().expectBool(true)
        block.receipts[4].result.expectOk().expectUtf8(testURL)
        block.receipts[5].result.expectOk().expectUtf8(testURL)

    },
});

Clarinet.test({
    name: "Ensure that get and set minimum bid works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let testURL = "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu"
        
        let seller = accounts.get("deployer")
        let bidder1 = accounts.get("wallet_1")
        
        let block = chain.mineBlock([
            Tx.contractCall('auction', 'get-minimum-bid', [], seller.address),
            Tx.contractCall('auction', 'set-auction-item-url', [
                types.utf8(testURL)
            ], seller.address),
            Tx.contractCall('auction', 'get-minimum-bid', [], seller.address),
            Tx.contractCall('auction', 'set-minimum-bid', [
                types.uint(1000)
            ], bidder1.address),
            Tx.contractCall('auction', 'set-minimum-bid', [
                types.uint(1000)
            ], seller.address),
            Tx.contractCall('auction', 'get-minimum-bid', [], seller.address),
            Tx.contractCall('auction', 'get-minimum-bid', [], bidder1.address),
        ])

        // console.log(block)

        assertEquals(block.receipts.length, 7)

        block.receipts[0].result.expectErr().expectUint(100)
        block.receipts[1].result.expectOk().expectBool(true)
        block.receipts[2].result.expectErr().expectUint(103)
        block.receipts[3].result.expectErr().expectUint(102)
        block.receipts[4].result.expectOk().expectBool(true)
        block.receipts[5].result.expectOk().expectUint(1000)
        block.receipts[6].result.expectOk().expectUint(1000)

    },
});

Clarinet.test({
    name: "Ensure that placing bids works properly",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let testURL = "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu"
        
        let seller = accounts.get("deployer")
        let bidder1 = accounts.get("wallet_1")
        let bidder2 = accounts.get("wallet_2")

        let assetMap = chain.getAssetsMaps();
        let bidder1Balance = assetMap.assets['STX'][bidder1.address]
        let bidder2Balance = assetMap.assets['STX'][bidder1.address]
        
        let block = chain.mineBlock([
            Tx.contractCall('auction', 'set-auction-item-url', [
                types.utf8(testURL)
            ], seller.address),
            Tx.contractCall('auction', 'set-minimum-bid', [
                types.uint(1000)
            ], seller.address),

            Tx.contractCall('auction', 'get-current-max-bid', [], bidder1.address),
            Tx.contractCall('auction', 'bid-extra', [
                types.uint(1000+bidder1Balance)
            ], bidder1.address),
            Tx.contractCall('auction', 'bid-extra', [
                types.uint(1000)
            ], bidder1.address),

            Tx.contractCall('auction', 'get-current-max-bidder', [], bidder1.address),
            Tx.contractCall('auction', 'get-current-max-bidder', [], seller.address),

            Tx.contractCall('auction', 'get-current-max-bid', [], bidder2.address),
            Tx.contractCall('auction', 'bid-extra', [
                types.uint(1000)
            ], bidder2.address),

            Tx.contractCall('auction', 'get-current-max-bid', [], seller.address),
            Tx.contractCall('auction', 'get-current-max-bidder', [], seller.address),

        ])

        // console.log(block)

        assertEquals(block.receipts.length, 11)

        block.receipts[0].result.expectOk().expectBool(true)
        block.receipts[1].result.expectOk().expectBool(true)
        block.receipts[2].result.expectOk().expectUint(1000)
        block.receipts[3].result.expectErr().expectUint(106)
        block.receipts[4].result.expectOk().expectBool(true)
        block.receipts[5].result.expectErr().expectUint(102)
        block.receipts[6].result.expectOk().expectPrincipal(bidder1.address)
        block.receipts[7].result.expectOk().expectUint(2000)
        block.receipts[8].result.expectOk().expectBool(true)
        block.receipts[9].result.expectOk().expectUint(3000)
        block.receipts[10].result.expectOk().expectPrincipal(bidder2.address)
    },
});


Clarinet.test({
    name: "Ensure that selling and closing works properly",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let testURL = "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu"
        
        let seller = accounts.get("deployer")
        let bidder1 = accounts.get("wallet_1")
        let bidder2 = accounts.get("wallet_2")

        let assetMap = chain.getAssetsMaps();
        let bidder1Balance = assetMap.assets['STX'][bidder1.address]
        let bidder2Balance = assetMap.assets['STX'][bidder1.address]
        
        let block = chain.mineBlock([
            Tx.contractCall('auction', 'set-auction-item-url', [
                types.utf8(testURL)
            ], seller.address),
            Tx.contractCall('auction', 'set-minimum-bid', [
                types.uint(1000)
            ], seller.address),
            Tx.contractCall('auction', 'bid-extra', [
                types.uint(1000)
            ], bidder1.address),
            Tx.contractCall('auction', 'bid-extra', [
                types.uint(1000)
            ], bidder2.address),

            Tx.contractCall('auction', 'close-auction', [], seller.address),
            Tx.contractCall('auction', 'cash-out', [], bidder2.address),

        ])

        // console.log(block)

        assertEquals(block.receipts.length, 6)

        block.receipts[0].result.expectOk().expectBool(true)
        block.receipts[1].result.expectOk().expectBool(true)
        block.receipts[2].result.expectOk().expectBool(true)
        block.receipts[3].result.expectOk().expectBool(true)
        block.receipts[4].result.expectOk().expectBool(true)
        block.receipts[5].result.expectOk().expectBool(true)

    },
});

