
;; delivery-tracking-trait
;; Trait (ADT) describing the properties of delivery-tracking contract

(define-trait delivery-tracking-trait 
  (
    ;; Gets the final receiver address
    (get-receiver () (response principal uint))

    ;; Sets the receiver address (can be done only once)
    (set-receiver (principal (string-utf8 500) uint) (response bool uint))

    ;; Gets the current holder address of the package
    (get-current-holder () (response principal uint))

    ;; Moves to a different non-reciever location
    (move-to-warehouse (principal) (response bool uint))

    ;; Delivers to receiver
    (deliver () (response bool uint))
  )
)
