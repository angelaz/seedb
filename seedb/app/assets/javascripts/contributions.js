_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};


// Backbone Model

var ChartModel = Backbone.Model.extend({
    defaults: function() {
      return {
        query: "SELECT * FROM donations WHERE cand_nm='Obama, Barack' LIMIT 500",
        counts: null,
        div_name: "chart_div",
        chart_type: "ColumnChart",
        aggregate_by: "contbr_occupation",
        x_axis_label: "count",
        width: 600,
        height: 500
      };
    }
});

var model = new ChartModel();
model.on("change:chart_type change:aggregate_by change:width change:height", prepareChart);
model.on("change:query", fetchData);


// Backbone View

GraphView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        var template = _.template( $("#render_template").html(), model.attributes );
        this.$el.html( template );
    },
    events: {
        "click input[id=render_button]": "setValues"  
    },
    setValues: function(){

        model.set("query", $("#query_input").val())
        model.set("chart_type", $("#chart_type_input").val());
        model.set("aggregate_by", $("#aggregate_by_input").val());
        model.set("width", $("#width_input").val());
        model.set("height", $("#height_input").val());
    }
});

var graph_view = new GraphView({ el: $("#render_container") });


// Draw Chart Google Charts 

//Temporary:
google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(fetchData);


function fetchData() {
    console.log("fetchData called.");

    $.get("/contributions.json", {"query": model.get("query")}, prepareChart, "json");
}

function prepareChart(data_fetched) {

    console.log("prepareChart called.");
    
    if (_.isArray(data_fetched)) {
        model.set("data_fetched", data_fetched);
        var data = data_fetched;
    } else {
        var data = model.get("data_fetched");
    }

    var counts = {};
    var aggregate_by = model.get("aggregate_by");

    data.forEach(function(contribution) {
        if (! counts[contribution[aggregate_by]]) {
            counts[contribution[aggregate_by]] = 1;
        } else {
            counts[contribution[aggregate_by]] += 1;
        }
    });

    console.log(counts);
    model.set("counts", counts);

    drawChart();
}

function drawChart() {

    console.log("drawChart called.");
    console.log(model.attributes);
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', model.get("x_axis_label"));
    data.addColumn('number', model.get("aggregate_by"));
    data.addRows(_.pairs(model.get("counts")));

    // Set chart options
    var options = {'title': model.get("aggregate_by"),
                   'width':model.get("width"),
                   'height':model.get("height")};

    // Instantiate and draw our chart, passing in some options.

    var chart = new google.visualization[model.get("chart_type")](document.getElementById(model.get("div_name")));

    $(document).ready(function() {
        chart.draw(data, options);
    });
}