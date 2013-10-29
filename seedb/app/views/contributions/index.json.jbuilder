json.array!(@contributions) do |contribution|
    json.cand_nm contribution.cand_nm
    json.contb_receipt_amt contribution.contb_receipt_amt
    json.contb_receipt_dt contribution.contb_receipt_dt
    json.contbr_st contribution.contbr_st
    json.contbr_occupation  contribution.contbr_occupation
end
