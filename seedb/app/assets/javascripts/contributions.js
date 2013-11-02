var ChartModel = Backbone.Model.extend({});
var model = new ChartModel();

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
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
    model.set("x_axis", "Occupations");
    model.set("y_axis", "Number of Donors");
    model.set("title", "Contributor Occupations");
    model.set("width", 600);
    model.set("height", 500);
    model.set("div_name", "chart_div");
    model.set("chart_type", "ColumnChart");

    drawChart();
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
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

// var ChartModel = Backbone.Model.extend({});


GraphView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        var template = _.template( $("#render_template").html(), {} );
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
        drawChart();      
    }
});

var graph_view = new GraphView({ el: $("#render_container") });







