
;; fundraiser-trait
;; Trait (ADT) defining the preperties of fundraiser contract

(define-trait fundraiser-trait 
  (
    ;; function to send amount to the fundraiser DAO contract
    (fund (uint) (response bool uint))

    ;; DAO privileged function to transfer the funds to beneficiary and close the fundraiser
    (cash-out (principal) (response bool uint))

    ;; DAO privileged function to check the recieved funds so far
    (get-balance () (response uint uint))
  )
)

