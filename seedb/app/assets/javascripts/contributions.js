_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};


// Backbone Model

var GraphModel = Backbone.Model.extend({
    defaults: {
        query: "SELECT * FROM donations WHERE cand_nm='Obama, Barack' LIMIT 500",
        counts: null,
        chart_type: "ColumnChart",
        aggregate_by: "contbr_occupation",
        width: 600,
        height: 500
    },

    initialize: function() {
        this.on("change:query", this.fetchData);
        this.on("change:data_fetched change:aggregate_by", this.updateCounts);
        this.fetchData();
    },

    fetchData: function() {
        $.get("/contributions.json", {"query": this.get("query")}, $.proxy(this.saveData, this), "json");
    },

    saveData: function(data_fetched) {
        this.set("data_fetched", data_fetched);
    },

    updateCounts: function() {    
        var counts = {};
        var aggregate_by = this.get("aggregate_by");

        this.get("data_fetched").forEach(function(contribution) {
            if (! counts[contribution[aggregate_by]]) {
                counts[contribution[aggregate_by]] = 1;
            } else {
                counts[contribution[aggregate_by]] += 1;
            }
        });
        this.set("counts", counts);
    }
});


// Backbone View
var GraphView = Backbone.View.extend({
    initialize: function(){
        this.model.on("change:chart_type change:aggregate_by change:width change:height change:counts", $.proxy(this.render, this));
        this.render();
    },
    render: function() {
        if(this.model.get("counts")) {
            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', this.model.get("x_axis_label"));
            data.addColumn('number', this.model.get("aggregate_by"));
            data.addRows(_.pairs(this.model.get("counts")));

            // Set chart options
            var options = {'title': this.model.get("aggregate_by"),
                           'width': this.model.get("width"),
                           'height': this.model.get("height")};

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization[this.model.get("chart_type")](this.el);
            chart.draw(data, options);
        }
    }
})
var GraphControlsView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        var template = _.template( $("#render_template").html(), this.model.attributes );
        this.$el.html( template );
    },
    events: {
        "click #render_button": "setValues",
        "change select": "setValues",
        "keypress input[type=text]"  : "updateOnEnter"  
    },
    updateOnEnter: function(e) {
        if (e.type === "keypress" && e.keyCode === 13) {
            this.setValues();
        }
    },
    setValues: function() {
        this.model.set("query", $("#query_input").val());
        this.model.set("chart_type", $("#chart_type_input").val());
        this.model.set("aggregate_by", $("#aggregate_by_input").val());
        this.model.set("width", $("#width_input").val());
        this.model.set("height", $("#height_input").val());
    }
});



// Draw Chart Google Charts 

google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(createView);

function createView() {
    var model = new GraphModel();
    $(function() { // only create the view when the page is ready
        new GraphControlsView({ el: $("#render_container"), model: model});
        new GraphView({ el: $("#chart_div"), model: model});
    });
}