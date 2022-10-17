
;; simple-transaction-trait
;; Trait (ADT) defining the operations supported by simple-transaction contract

(define-trait simple-transaction-trait 
  (
    ;; Function that helps the sender know his available balance
    (get-sender-balance () (response uint uint))

    ;; Function that takes care of transfering the amount from sender to reciever
    (send-amount (principal uint) (response bool uint))
  )
)
