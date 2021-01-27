(use-trait ft-trait 'ST3J2GVMMM2R07ZFBJDWTYEYAR8FZH5WKDTFJ9AHA.ft-trait.ft-trait)

(define-public (name (token <ft-trait>))
  (ok (contract-call? token name))
)