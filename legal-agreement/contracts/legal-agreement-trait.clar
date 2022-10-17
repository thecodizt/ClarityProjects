
;; legal-agreement-trait
;; Trait (ADT) defining the properties of legal-agreement contract

(define-trait legal-agreement-trait 
  (
    ;; Function to return the document url
    (get-document-url () (response (string-utf8 500) uint))

    ;; Function to set the document url
    (set-document-url ((string-utf8 500)) (response bool uint))

    ;; Function to agree to the agreement
    (agree () (response bool uint))

    ;; Function to show the agreed account
    (get-promisee () (response principal uint))
  )
)
