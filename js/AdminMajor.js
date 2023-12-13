function populateMajorOptions() {
    $.ajax({
        url: "https://localhost:44346/api/Major/GetMajors",
        method: "GET",
        success: function(response) {
            var majorFilter = $("#majorFilter");
            majorFilter.empty();


            response.forEach(function(major) {
                majorFilter.append('<option value="' + major.majorID + '">' + major.majorName + '</option>');
            });
            majorFilter.trigger('change');
        },
        error: function(error) {
            console.error("Error fetching majors:", error);
        }
    });
}

$(document).ready(function() {
    populateMajorOptions();

});