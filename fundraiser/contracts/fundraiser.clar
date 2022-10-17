
;; fundraiser
;; Clarity contract that implement a fundraiser assuming the contract as a DAO

;; traits
;;
(impl-trait .fundraiser-trait.fundraiser-trait)

;; constants
;;
(define-constant ERR-CONTRACT-OWNER-ONLY (err u100))
(define-constant ERR-FUNDRAISER-CLOSED (err u101))

(define-constant contract-owner tx-sender)

;; data maps and vars
;;
(define-data-var fundraiser-open bool true)

;; public functions
;;
(define-public (fund (amount uint)) 
  (begin 
    (asserts! (is-eq (var-get fundraiser-open) true) ERR-FUNDRAISER-CLOSED)
    (try! (stx-transfer? amount tx-sender (as-contract contract-owner)))
    (ok true)
  )
)

(define-public (cash-out (beneficiary principal)) 
  (begin
    (asserts! (is-eq (var-get fundraiser-open) true) ERR-FUNDRAISER-CLOSED)
    (asserts! (is-eq tx-sender contract-owner) ERR-CONTRACT-OWNER-ONLY)
    (try! (stx-transfer? (try! (get-balance)) tx-sender beneficiary))
    (var-set fundraiser-open false)
    (ok true)
  )
)

;; read-only functions
;;
(define-read-only (get-balance) 
  (begin
    (asserts! (is-eq tx-sender contract-owner) ERR-CONTRACT-OWNER-ONLY)
    (ok (stx-get-balance (as-contract contract-owner)))
  )
)