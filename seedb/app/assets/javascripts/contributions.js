// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/


// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(fetchData);

function fetchData() {

    $.get("/contributions.json", {}, drawChart, "json");

}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart(data) {

    var counts = {};

    data.forEach(function(contribution) {
        if (! counts[contribution.contbr_occupation]) {
            counts[contribution.contbr_occupation] = 1;
        } else {
            counts[contribution.contbr_occupation] += 1;
        }
    });

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows(_.pairs(counts));

    // Set chart options
    var options = {'title':'Contributor Occupations',
                   'width':800,
                   'height':800};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    $(document).ready(function() {
        chart.draw(data, options);
    });
}