
;; delivery-tracking
;; Clarity contract to take care of delivery of a single product

;; traits
;;
(impl-trait .delivery-tracking-trait.delivery-tracking-trait)

;; constants
;;
(define-constant ORIGIN tx-sender)

(define-constant ERR-RECEIVER-NOT-SET (err u100))
(define-constant ERR-RECEIVER-ALREADY-SET (err u101))
(define-constant ERR-ALREADY-DELIVERED (err u102))
(define-constant ERR-ONLY-MIDDLE-TRANSFER (err u103))
(define-constant ERR-NOT-OWNED (err u104))
(define-constant ERR-NO-MIDDLE-TRANSFER (err u105))
(define-constant ERR-NOT-ORIGIN (err u106))
(define-constant ERR-PLACEHOLDER (err u999))

;; data maps and vars
;;
(define-data-var receiver (optional principal) none)
(define-data-var is-receiver-set bool false)
(define-data-var receiver-address (optional (string-utf8 500)) none)
(define-data-var receiver-pin (optional uint) none)
(define-data-var current-holder principal ORIGIN)
(define-data-var is-delivered bool false)

;; private functions
;;

;; public functions
;;
(define-public (set-receiver (person principal) (address (string-utf8 500)) (pin uint))
  (begin
    (asserts! (is-eq (var-get is-receiver-set) false) ERR-RECEIVER-ALREADY-SET)
    (asserts! (is-eq ORIGIN tx-sender) ERR-NOT-ORIGIN)
    (var-set receiver (some person))
    (var-set receiver-address (some address))
    (var-set receiver-pin (some pin))
    (var-set is-receiver-set true)
    (ok true)
  )
)

(define-public (move-to-warehouse (id principal)) 
  (begin
    (asserts! (is-eq (var-get is-receiver-set) true) ERR-RECEIVER-NOT-SET)
    (asserts! (is-eq (var-get is-delivered) false) ERR-ALREADY-DELIVERED)
    (asserts! (is-eq tx-sender (var-get current-holder)) ERR-NOT-OWNED)
    (asserts! (not (is-eq (unwrap! (var-get receiver) ERR-PLACEHOLDER) id)) ERR-ONLY-MIDDLE-TRANSFER)
    (var-set current-holder id)
    (ok true)
  )
)

(define-public (deliver) 
  (begin
    (asserts! (is-eq (var-get is-receiver-set) true) ERR-RECEIVER-NOT-SET)
    (asserts! (is-eq (var-get is-delivered) false) ERR-ALREADY-DELIVERED)
    (asserts! (is-eq tx-sender (var-get current-holder)) ERR-NOT-OWNED)
    (asserts! (not (is-eq (unwrap! (var-get receiver) ERR-PLACEHOLDER) tx-sender)) ERR-NO-MIDDLE-TRANSFER)
    (var-set current-holder (unwrap! (var-get receiver) ERR-PLACEHOLDER))
    (var-set is-delivered true)
    (ok true)
  )
)

;; read-only functions
;;
(define-read-only (get-receiver) 
  (begin
    (asserts! (is-eq (var-get is-receiver-set) true) ERR-RECEIVER-NOT-SET)
    (ok (unwrap! (var-get receiver) ERR-PLACEHOLDER))
  )
)

(define-read-only (get-current-holder) 
  (begin
    (asserts! (is-eq (var-get is-receiver-set) true) ERR-RECEIVER-NOT-SET)
    (ok (var-get current-holder))
  )
)

