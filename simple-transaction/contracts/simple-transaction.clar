
;; simple-transaction
;; Clarity contract that supports simple transfer of stx from one account to another

;; traits
;;
(impl-trait .simple-transaction-trait.simple-transaction-trait)

;; constants
;;
(define-constant ERR-ZERO-BALANCE (err u100))
(define-constant ERR-NOT-ENOUGH-BALANCE (err u101))

;; public functions
;;
(define-public (send-amount (receiver principal) (amount uint)) 
  (begin
    (asserts! ( > (try! (get-sender-balance)) u0) ERR-ZERO-BALANCE)
    (asserts! ( >= (try! (get-sender-balance) ) amount) ERR-NOT-ENOUGH-BALANCE)
    (try! (stx-transfer? amount tx-sender receiver))
    (ok true)
  )
)

;; read-only functions
;;
(define-read-only (get-sender-balance) 
  (begin
    (asserts! (> (stx-get-balance tx-sender) u0) ERR-ZERO-BALANCE)
    (ok (stx-get-balance tx-sender))
  )
)
