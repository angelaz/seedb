class ContributionsController < ApplicationController
  before_action :set_contribution, only: [:show, :edit, :update, :destroy]

  # GET /contributions
  # GET /contributions.json
  def index
    # @contributions = []
    # Contribution.find_each do |contribution|
    #   if contribution.cand_nm == "Obama, Barack"
    #     @contributions.push(contribution)
    #   end
    # end
    @contributions = Contribution.where({cand_nm: "Obama, Barack"}).first(500)
  end

  # GET /contributions/1
  # GET /contributions/1.json
  def show
  end

  # GET /contributions/new
  def new
    @contribution = Contribution.new
  end

  # GET /contributions/1/edit
  def edit
  end

  # POST /contributions
  # POST /contributions.json
  def create
    @contribution = Contribution.new(contribution_params)

    respond_to do |format|
      if @contribution.save
        format.html { redirect_to @contribution, notice: 'Contribution was successfully created.' }
        format.json { render action: 'show', status: :created, location: @contribution }
      else
        format.html { render action: 'new' }
        format.json { render json: @contribution.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /contributions/1
  # PATCH/PUT /contributions/1.json
  def update
    respond_to do |format|
      if @contribution.update(contribution_params)
        format.html { redirect_to @contribution, notice: 'Contribution was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @contribution.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /contributions/1
  # DELETE /contributions/1.json
  def destroy
    @contribution.destroy
    respond_to do |format|
      format.html { redirect_to contributions_url }
      format.json { head :no_content }
    end
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
