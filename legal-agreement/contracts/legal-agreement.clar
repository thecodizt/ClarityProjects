
;; legal-agreement
;; Clarity contract for legal agreements between 2 parties

;; constants
;;
(define-constant ERR-DOCUMENT-NOT-SET (err u100))
(define-constant ERR-DOCUMENT-SET-ALREADY (err u101))
(define-constant ERR-SELF-AGREE (err u102))
(define-constant ERR-ALREADY-AGREED (err u103))
(define-constant ERR-NOT-AGREED (err u104))

(define-constant promisor tx-sender)

;; traits
;;
(impl-trait .legal-agreement-trait.legal-agreement-trait)

;; data maps and vars
;;
(define-data-var promisee (optional principal) none)
(define-data-var document-url (string-utf8 500) u"")
(define-data-var document-set bool false)
(define-data-var agreed bool false)

;; public functions
;;
(define-public (set-document-url (url (string-utf8 500))) 
  (begin
    (asserts! (is-eq (var-get document-set) false) ERR-DOCUMENT-SET-ALREADY)
    (var-set document-url url)
    (var-set document-set true)
    (ok true)
  )
)

(define-public (agree) 
  (begin
    (asserts! (not (is-eq promisor tx-sender)) ERR-SELF-AGREE)
    (asserts! (not (is-eq (var-get agreed) true)) ERR-ALREADY-AGREED)
    (var-set promisee (some tx-sender))
    (var-set agreed true)
    (ok true)
  )
)

;; read-only functions
;;
(define-read-only (get-document-url) 
  (begin 
    (asserts! (is-eq (var-get document-set) true) ERR-DOCUMENT-NOT-SET)
    (ok (var-get document-url))
  ) 
)

(define-read-only (get-promisee) 
  (begin
    (asserts! (is-eq (var-get agreed) true) ERR-NOT-AGREED)
    (ok (unwrap! (var-get promisee) ERR-NOT-AGREED))
  )
)
