
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.3/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that get and set receiver works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let sender = accounts.get("deployer")
        let receiver = accounts.get("wallet_1")
        let mid1 = accounts.get("wallet_2")
        let mid2 = accounts.get("wallet_3")
        let mid3 = accounts.get("wallet_4")

        let block = chain.mineBlock([
            Tx.contractCall('delivery-tracking', 'get-receiver', [], sender.address),
            Tx.contractCall('delivery-tracking', 'get-receiver', [], mid1.address),
            Tx.contractCall('delivery-tracking', 'set-receiver', [
                types.principal(receiver.address),
                types.utf8("abcd"),
                types.uint(1234)
            ], mid1.address),
            Tx.contractCall('delivery-tracking', 'set-receiver', [
                types.principal(receiver.address),
                types.utf8("abcd"),
                types.uint(1234)
            ], sender.address),
            Tx.contractCall('delivery-tracking', 'get-receiver', [], sender.address)
        ])

        // console.log(block)

        assertEquals(block.receipts.length, 5)

        block.receipts[0].result.expectErr().expectUint(100)
        block.receipts[1].result.expectErr().expectUint(100)
        block.receipts[2].result.expectErr().expectUint(106)
        block.receipts[3].result.expectOk().expectBool(true)
        block.receipts[4].result.expectOk().expectPrincipal(receiver.address)
    },
});

Clarinet.test({
    name: "Ensure that get current holder works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let sender = accounts.get("deployer")
        let receiver = accounts.get("wallet_1")
        let mid1 = accounts.get("wallet_2")
        let mid2 = accounts.get("wallet_3")
        let mid3 = accounts.get("wallet_4")

        let block = chain.mineBlock([
            Tx.contractCall('delivery-tracking', 'get-current-holder', [], sender.address),
            Tx.contractCall('delivery-tracking', 'set-receiver', [
                types.principal(receiver.address),
                types.utf8("abcd"),
                types.uint(1234)
            ], sender.address),
            Tx.contractCall('delivery-tracking', 'get-current-holder', [], sender.address),
            Tx.contractCall('delivery-tracking', 'get-current-holder', [], mid1.address)
        ])

        console.log(block)

        assertEquals(block.receipts.length, 4)

        block.receipts[0].result.expectErr().expectUint(100)
        block.receipts[1].result.expectOk().expectBool(true)
        block.receipts[2].result.expectOk().expectPrincipal(sender.address)
        block.receipts[3].result.expectOk().expectPrincipal(sender.address)
    },
});

Clarinet.test({
    name: "Ensure that move-to-warehouse works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let sender = accounts.get("deployer")
        let receiver = accounts.get("wallet_1")
        let mid1 = accounts.get("wallet_2")
        let mid2 = accounts.get("wallet_3")
        let mid3 = accounts.get("wallet_4")

        let block = chain.mineBlock([
            Tx.contractCall('delivery-tracking', 'set-receiver', [
                types.principal(receiver.address),
                types.utf8("abcd"),
                types.uint(1234)
            ], sender.address),
            Tx.contractCall('delivery-tracking', 'get-current-holder', [], receiver.address),
            Tx.contractCall('delivery-tracking', 'move-to-warehouse', [
                types.principal(mid1.address)
            ], sender.address),
            Tx.contractCall('delivery-tracking', 'get-current-holder', [], receiver.address),
            Tx.contractCall('delivery-tracking', 'move-to-warehouse', [
                types.principal(mid1.address)
            ], sender.address),
            Tx.contractCall('delivery-tracking', 'move-to-warehouse', [
                types.principal(mid2.address)
            ], mid1.address),
            Tx.contractCall('delivery-tracking', 'get-current-holder', [], receiver.address),
            Tx.contractCall('delivery-tracking', 'move-to-warehouse', [
                types.principal(receiver.address)
            ], mid2.address),
        ])

        // console.log(block)

        assertEquals(block.receipts.length, 8)

        block.receipts[0].result.expectOk().expectBool(true)
        block.receipts[1].result.expectOk().expectPrincipal(sender.address)
        block.receipts[2].result.expectOk().expectBool(true)
        block.receipts[3].result.expectOk().expectPrincipal(mid1.address)
        block.receipts[4].result.expectErr().expectUint(104)
        block.receipts[5].result.expectOk().expectBool(true)
        block.receipts[6].result.expectOk().expectPrincipal(mid2.address)
        block.receipts[7].result.expectErr().expectUint(103)
    },
});

Clarinet.test({
    name: "Ensure that deliver to reciever works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let sender = accounts.get("deployer")
        let receiver = accounts.get("wallet_1")
        let mid1 = accounts.get("wallet_2")
        let mid2 = accounts.get("wallet_3")
        let mid3 = accounts.get("wallet_4")

        let block = chain.mineBlock([
            Tx.contractCall('delivery-tracking', 'set-receiver', [
                types.principal(receiver.address),
                types.utf8("abcd"),
                types.uint(1234)
            ], sender.address),
            Tx.contractCall('delivery-tracking', 'move-to-warehouse', [
                types.principal(mid1.address)
            ], sender.address),
            Tx.contractCall('delivery-tracking', 'move-to-warehouse', [
                types.principal(mid2.address)
            ], mid1.address),
            Tx.contractCall('delivery-tracking', 'get-current-holder', [], receiver.address),
            Tx.contractCall('delivery-tracking', 'deliver', [], sender.address),
            Tx.contractCall('delivery-tracking', 'deliver', [], mid2.address),
            Tx.contractCall('delivery-tracking', 'deliver', [], mid2.address),
            Tx.contractCall('delivery-tracking', 'move-to-warehouse', [
                types.principal(receiver.address)
            ], mid2.address),
        ])

        // console.log(block)

        assertEquals(block.receipts.length, 8)

        block.receipts[0].result.expectOk().expectBool(true)
        block.receipts[1].result.expectOk().expectBool(true)
        block.receipts[2].result.expectOk().expectBool(true)
        block.receipts[3].result.expectOk().expectPrincipal(mid2.address)
        block.receipts[4].result.expectErr().expectUint(104)
        block.receipts[5].result.expectOk().expectBool(true)
        block.receipts[6].result.expectErr().expectUint(102)
        block.receipts[7].result.expectErr().expectUint(102)

    },
});