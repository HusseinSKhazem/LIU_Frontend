function populateMajorOptions() {
    $.ajax({
        url: "https://localhost:44346/api/Major/GetMajors",
        method: "GET",
        success: function(response) {
            var majorFilter = $("#majorFilter");

            // Clear existing options
            majorFilter.empty();

            // Add options from the response
            response.forEach(function(major) {
                majorFilter.append('<option value="' + major.majorID + '">' + major.majorName + '</option>');
            });

            // Trigger the change event to fetch and display job listings for the default selected major (if any)
            majorFilter.trigger('change');
        },
        error: function(error) {
            console.error("Error fetching majors:", error);
        }
    });
}

$(document).ready(function() {
    // Populate majors on page load
    populateMajorOptions();

});