
;; auction
;; Clarity contract for an Open Single Item Auction

;; traits
;;
(impl-trait .auction-trait.auction-trait)

;; constants
;;
(define-constant ERR-NO-ITEM (err u100))
(define-constant ERR-ITEM-ALREADY-SET (err u101))
(define-constant ERR-SELLER-ONLY (err u102))
(define-constant ERR-NO-MIN-BID (err u103))
(define-constant ERR-MIN-BID-ALREADY-SET (err u104))
(define-constant ERR-SELF-BID (err u105))
(define-constant ERR-NOT-ENOUGH-BALANCE (err u106))
(define-constant ERR-AUCTION-CLOSED (err u107))
(define-constant ERR-NO-BIDDER (err u108))
(define-constant ERR-AUCTION-NOT-CLOSED (err u109))
(define-constant ERR-NOT-MAX-BIDDER (err u110))
(define-constant ERR-PLACEHOLDER (err u999))

(define-constant SELLER tx-sender)

;; data maps and vars
;;
(define-data-var auction-open bool false)
(define-data-var sold bool false)

(define-data-var auction-item-url (optional (string-utf8 500)) none)
(define-data-var auction-item-url-set bool false)

(define-data-var minimum-bid (optional uint) none)
(define-data-var minimum-bid-set bool false)

(define-data-var current-max-bid (optional uint) none)
(define-data-var current-max-bidder (optional principal) none)
;; private functions
;;

;; public functions
;;
(define-public (set-auction-item-url (url (string-utf8 500))) 
  (begin
    (asserts! (is-eq (var-get auction-item-url-set ) false) ERR-ITEM-ALREADY-SET)
    (asserts! (is-eq SELLER tx-sender) ERR-SELLER-ONLY)
    (var-set auction-item-url (some url))
    (var-set auction-item-url-set true)
    (var-set auction-open true)
    (ok true)
  )
)

(define-public (set-minimum-bid (amount uint))
  (begin
    (asserts! (not (is-none (var-get auction-item-url))) ERR-NO-ITEM)  
    (asserts! (is-eq SELLER tx-sender) ERR-SELLER-ONLY)
    (asserts! (is-none (var-get minimum-bid)) ERR-MIN-BID-ALREADY-SET)
    (var-set minimum-bid (some amount))
    (var-set current-max-bid (some amount))
    (var-set minimum-bid-set true)
    (ok true)
  )
)

(define-public (bid-extra (amount uint)) 
  (begin
    (asserts! (not (is-eq tx-sender SELLER)) ERR-SELF-BID)
    (asserts! (not (is-none (var-get auction-item-url))) ERR-NO-ITEM)  
    (asserts! (is-eq (var-get minimum-bid-set) true) ERR-NO-MIN-BID)
    (asserts! (> (stx-get-balance tx-sender) (+ amount (unwrap! (var-get current-max-bid) ERR-PLACEHOLDER))) ERR-NOT-ENOUGH-BALANCE)
    (var-set current-max-bid (some (+ amount  (unwrap! (var-get current-max-bid) ERR-PLACEHOLDER))))
    (var-set current-max-bidder (some tx-sender))
    (ok true)
  )
)

(define-public (close-auction)
  (begin
    (asserts! (is-eq (var-get auction-open) true) ERR-AUCTION-CLOSED)
    (asserts! (not (is-none (var-get current-max-bidder))) ERR-NO-BIDDER)
    (asserts! (> (stx-get-balance tx-sender) (unwrap! (var-get current-max-bid) ERR-PLACEHOLDER)) ERR-NOT-ENOUGH-BALANCE)
    (var-set auction-open false)
    (ok true)
  )
)

(define-public (cash-out)
  (begin
    (asserts! (not (is-none (var-get current-max-bidder))) ERR-NO-BIDDER)
    (asserts! (is-eq (var-get auction-open) false) ERR-AUCTION-NOT-CLOSED)
    (asserts! (is-eq (unwrap! (var-get current-max-bidder) ERR-PLACEHOLDER) tx-sender) ERR-NOT-MAX-BIDDER)
    (try! (stx-transfer? (unwrap! (var-get current-max-bid) ERR-PLACEHOLDER) tx-sender SELLER))
    (var-set sold true)
    (ok true)
  )
)

;; read-only functions
;;
(define-read-only (get-auction-item-url) 
  (begin
    (asserts! (not (is-none (var-get auction-item-url))) ERR-NO-ITEM)
    (ok (unwrap! (var-get auction-item-url) ERR-PLACEHOLDER))
  )
)

(define-read-only (get-minimum-bid) 
  (begin
    (asserts! (not (is-none (var-get auction-item-url))) ERR-NO-ITEM)  
    (asserts! (is-eq (var-get minimum-bid-set) true) ERR-NO-MIN-BID)
    (ok (unwrap! (var-get minimum-bid) ERR-PLACEHOLDER))
  )
)

(define-read-only (get-current-max-bid) 
  (begin
    (asserts! (not (is-none (var-get auction-item-url))) ERR-NO-ITEM)  
    (asserts! (is-eq (var-get minimum-bid-set) true) ERR-NO-MIN-BID)
    (ok (unwrap! (var-get current-max-bid) ERR-PLACEHOLDER))
  )
)

(define-read-only (get-current-max-bidder) 
  (begin
    (asserts! (is-eq tx-sender SELLER) ERR-SELLER-ONLY)
    (asserts! (not (is-none (var-get auction-item-url))) ERR-NO-ITEM)  
    (asserts! (is-eq (var-get minimum-bid-set) true) ERR-NO-MIN-BID)
    (ok (unwrap! (var-get current-max-bidder) ERR-NO-BIDDER))
  )
)

(define-read-only (get-bidder-balance) 
  (begin
    (asserts! (not (is-eq (stx-get-balance tx-sender) u0))  ERR-NOT-ENOUGH-BALANCE)
    (ok (stx-get-balance tx-sender))
  )
)

(define-read-only (is-item-sold) 
  (begin
    (asserts! (not (is-none (var-get auction-item-url))) ERR-NO-ITEM)  
    (asserts! (is-eq (var-get minimum-bid-set) true) ERR-NO-MIN-BID)
    (ok (var-get sold))
  )
)