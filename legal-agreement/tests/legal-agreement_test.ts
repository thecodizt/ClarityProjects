
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.3/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that get and set documents work properly",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let testURL = "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu"
        let promisor = accounts.get("deployer")
        let promisee = accounts.get("wallet_1")

        let block = chain.mineBlock([
            Tx.contractCall('legal-agreement', 'get-document-url', [], promisor.address),
            Tx.contractCall('legal-agreement', 'set-document-url', [
                types.utf8(testURL)
            ], promisee.address),
            Tx.contractCall('legal-agreement', 'set-document-url', [
                types.utf8(testURL)
            ], promisor.address),
            Tx.contractCall('legal-agreement', 'get-document-url', [], promisor.address),
            Tx.contractCall('legal-agreement', 'get-document-url',[], promisee.address),
            Tx.contractCall('legal-agreement', 'set-document-url', [
                types.utf8(testURL)
            ], promisor.address),
        ])

        // console.log(block)

        assertEquals(block.receipts.length, 6)

        block.receipts[0].result.expectErr().expectUint(100)
        block.receipts[1].result.expectOk().expectBool(true)
        block.receipts[2].result.expectErr().expectUint(101)
        block.receipts[3].result.expectOk().expectUtf8(testURL)
        block.receipts[4].result.expectOk().expectUtf8(testURL)
        block.receipts[5].result.expectErr().expectUint(101)
    },
});

Clarinet.test({
    name: "Ensure that agreeing and getting promisee works properly",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let testURL = "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu"
        let promisor = accounts.get("deployer")
        let promisee = accounts.get("wallet_1")

        let block = chain.mineBlock([
            Tx.contractCall('legal-agreement', 'set-document-url', [
                types.utf8(testURL)
            ], promisor.address),
            Tx.contractCall('legal-agreement', 'get-document-url', [], promisee.address),
            Tx.contractCall('legal-agreement', 'get-promisee',[], promisor.address),
            Tx.contractCall('legal-agreement', 'agree', [], promisee.address),
            Tx.contractCall('legal-agreement', 'get-promisee',[], promisor.address),
            Tx.contractCall('legal-agreement', 'get-promisee',[], promisee.address),
        ])

        console.log(block)

        assertEquals(block.receipts.length, 6)

        block.receipts[0].result.expectOk().expectBool(true)
        block.receipts[1].result.expectOk().expectUtf8(testURL)
        block.receipts[2].result.expectErr().expectUint(104)
        block.receipts[3].result.expectOk().expectBool(true)
        block.receipts[4].result.expectOk().expectPrincipal(promisee.address)
        block.receipts[5].result.expectOk().expectPrincipal(promisee.address)

    },
});

