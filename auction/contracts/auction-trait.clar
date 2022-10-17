
;; auction-trait
;; Trait (ADT) defining the properties of Auction contract

(define-trait auction-trait 
  (
    ;; Gets the URL containing item details for the auction
    (get-auction-item-url () (response (string-utf8 500) uint))

    ;; Sets the URL containing item details for the auction
    (set-auction-item-url ((string-utf8 500)) (response bool uint))

    ;; Gets the minimum bid set by the seller
    (get-minimum-bid () (response uint uint))

    ;; Sets the minimum bid (privileged)
    (set-minimum-bid (uint) (response bool uint))

    ;; Function that enables bidding
    (bid-extra (uint) (response bool uint))

    ;; Function to close the auction and stop accepting bids
    (close-auction () (response bool uint))

    ;; Function for the highest bidder to pay
    (cash-out () (response bool uint))

    ;; Returns the current maximum bid
    (get-current-max-bid () (response uint uint))

    ;; Returns the current maximum bidder
    (get-current-max-bidder () (response principal uint))

    ;; Returns the balance of the caller
    (get-bidder-balance () (response uint uint))

    ;; Checks if sold yet
    (is-item-sold () (response bool uint))

  )
)