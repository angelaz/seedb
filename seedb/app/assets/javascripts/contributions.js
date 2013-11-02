// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(fetchData);

function fetchData() {
    $.get("/contributions.json", {}, organizeData, "json");
}

function organizeData(data) {
    var counts = {};
    var x_axis = "Occupations";
    var y_axis = "Number of Donors";
    var title = "Contributor Occupations";
    var width = 600;
    var height = 500;

    data.forEach(function(contribution) {
        if (! counts[contribution.contbr_occupation]) {
            counts[contribution.contbr_occupation] = 1;
        } else {
            counts[contribution.contbr_occupation] += 1;
        }
    });

    drawChart("ColumnChart", counts, title, x_axis, y_axis, width, height);
}
// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart(chartType, counts, title, x_axis, y_axis, width, height) {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', x_axis);
    data.addColumn('number', y_axis);
    data.addRows(_.pairs(counts));

    // Set chart options
    var options = {'title': title,
                   'width':width,
                   'height':height};

    // Instantiate and draw our chart, passing in some options.

    var chart = new google.visualization[chartType](document.getElementById('chart_div'));

    $(document).ready(function() {
        chart.draw(data, options);
    });
}

SearchView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        var template = _.template( $("#search_template").html(), {} );
        this.$el.html( template );
    },
    events: {
        "click input[type=button]": "doSearch"  
    },
    doSearch: function(){
        // Button clicked
        console.log(this);
    }
});

var search_view = new SearchView({ el: $("#search_container") });







