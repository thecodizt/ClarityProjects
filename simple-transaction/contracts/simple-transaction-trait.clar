
;; simple-transaction-trait
;; Trait (ADT) defining the operations supported by simple-transaction contract

(define-trait simple-transaction-trait 
  (
    (get-sender-balance () (response uint uint))
    (send-amount (principal uint) (response bool uint))
  )
)
