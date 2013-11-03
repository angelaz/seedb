class ContributionsController < ApplicationController
  before_action :set_contribution, only: [:show, :edit, :update, :destroy]

  # GET /contributions
  # GET /contributions.json
  def index

    if params[:query]
      query = params[:query]
    else
      query = "SELECT * FROM donations WHERE cand_nm='Obama, Barack' LIMIT 500"
    end

    @contributions = Contribution.find_by_sql(query)


  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contribution
      @contribution = Contribution.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def contribution_params
      params[:contribution]
    end
end
