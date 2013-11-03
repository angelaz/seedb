_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};


// Backbone Model

var ChartModel = Backbone.Model.extend({
    defaults: function() {
      return {
        counts: null,
        div_name: "chart_div",
        chart_type: "ColumnChart",
        title: "Contributor Occupations",
        x_axis: "Occupations",
        y_axis: "Number of Contributors",
        width: 600,
        height: 500
      };
    }
});

var model = new ChartModel();
model.on("change", drawChart);


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
        "click input[id=render_button]": "doRender"  
    },
    doRender: function(){
        model.set("chart_type", $("#chart_type_input").val());
        model.set("title", $("#title_input").val());
        model.set("x_axis", $("#x_axis_input").val());
        model.set("y_axis", $("#y_axis_input").val());
        model.set("width", $("#width_input").val());
        model.set("height", $("#height_input").val());
    }
});

var graph_view = new GraphView({ el: $("#render_container") });


// Draw Chart Google Charts 

google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(fetchData);

function fetchData() {
    $.get("/contributions.json", {}, prepareChart, "json");
}

function prepareChart(data) {

    var counts = {};

    data.forEach(function(contribution) {
        if (! counts[contribution.contbr_occupation]) {
            counts[contribution.contbr_occupation] = 1;
        } else {
            counts[contribution.contbr_occupation] += 1;
        }
    });

    model.set("counts", counts);
}

function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', model.get("x_axis"));
    data.addColumn('number', model.get("y_axis"));
    data.addRows(_.pairs(model.get("counts")));

    // Set chart options
    var options = {'title': model.get("title"),
                   'width':model.get("width"),
                   'height':model.get("height")};

    // Instantiate and draw our chart, passing in some options.

    var chart = new google.visualization[model.get("chart_type")](document.getElementById(model.get("div_name")));

    $(document).ready(function() {
        chart.draw(data, options);
    });
}