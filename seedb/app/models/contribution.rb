class Contribution < ActiveRecord::Base
    self.table_name = "donations"

    alias_attribute "candidate_name", "cand_nm"
    alias_attribute "contributor_name", "contbr_nm"

end
