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

// Function to fetch and display job listings based on the selected major

function fetchAndDisplayJobListings(majorID) {
    $.ajax({
        url: `https://localhost:44346/api/Mobile/GetVacancyByMajor/${majorID}`,
        method: "GET",
        success: function(response) {
            var jobListingColumn = $("#jobListingColumn");
            jobListingColumn.empty(); 

            if (response.length === 0) {

                jobListingColumn.append('<h2 style={color:red;}>No offers were found.</h2>');
            } else {
             
                response.forEach(function(vacancy) {
                    var cardHtml = `
                    <div class="card job-card">
                        <div class="job-card-body">
                            <h5 class="job-title">${vacancy.jobOffer}</h5>
                            <p class="job-info"><i class="fas fa-building job-icon"></i> ${vacancy.companyName}</p>
                            <p class="job-info"><i class="fas fa-map-marker-alt job-icon"></i> ${vacancy.workLocation}</p>
                            <p class="job-info"><i class="fas fa-clock job-icon"></i> ${vacancy.experience} Experience</p>
                            <p class="job-salary">$${vacancy.salary}</p>
                            <p class="job-info"><strong>Job Description:</strong> ${vacancy.description}</p>
                            <p class="job-info"><strong>Requirements:</strong> ${vacancy.requirements}</p>
                            <p class="job-info"><strong>Responsibility:</strong> ${vacancy.responsibility}</p>
                            <p class="job-info"><strong>Working Hours:</strong> ${vacancy.workingHours} hours per day</p>
                            <p class="job-info"><strong>Status:</strong> ${vacancy.status}</p>
                            <p class="job-info"><strong>Experience:</strong> ${vacancy.experience}</p>
                            <p class="job-info"><strong>Work Location:</strong> ${vacancy.workLocation}</p>
                            <p class="job-info"><strong>Company Name:</strong> ${vacancy.companyName}</p>
                            <p class="job-info"><strong>Major Name:</strong> ${vacancy.majorName}</p>
                            <p class="job-info"><strong>Recruiter:</strong> ${vacancy.recruiterUsername}</p>
                            <button class="btn btn-success">Apply</button>
                            <!-- Comment Input Section -->
                            <div class="comment-input-section">
                                <input type="text" id="commentInput" placeholder="Add a comment...">
                                <button>Add Comment</button>
                            </div>
                
                            <!-- See All Comments Section -->
                            <div class="see-all-comments-section">
                                <a href="#">See All Comments</a>
                            </div>
                        </div>
                    </div>`;
                
                    jobListingColumn.append(cardHtml);
                });
            }
        },
        error: function(error) {
            if (error.status === 404) {
                // Display a message when the API returns a 404 status (Not Found)
                var jobListingColumn = $("#jobListingColumn");
                jobListingColumn.empty();
                jobListingColumn.append('<h2 style={color:red;}>No offers were found.</h2>');
            } else {
                console.error("Error fetching job listings:", error);
            }
        }
    });
}


function fetchAndDisplayJobByLocation() {
    var selectedMajorID = $("#majorFilter").val();
    var selectedLocation = $("#locationFilter").val();

    $.ajax({
        url: `https://localhost:44346/api/Filter/LocationFilter?location=${selectedLocation}&MajorID=${selectedMajorID}`,
        method: "GET",
        success: function(response) {
            var jobListingColumn = $("#jobListingColumn");
            jobListingColumn.empty(); // Clear existing job listings

            if (response.length === 0) {
                // Display a message when no offers are found
                jobListingColumn.append('<h2 style="color:red;">No offers were found.</h2>');
            } else {
                // Loop through the response and append job cards to the job listing column
                response.forEach(function(vacancy) {
                    var cardHtml = `
                    <div class="card job-card">
                        <div class="job-card-body">
                            <h5 class="job-title">${vacancy.jobOffer}</h5>
                            <p class="job-info"><i class="fas fa-building job-icon"></i> ${vacancy.companyName}</p>
                            <p class="job-info"><i class="fas fa-map-marker-alt job-icon"></i> ${vacancy.workLocation}</p>
                            <p class="job-info"><i class="fas fa-clock job-icon"></i> ${vacancy.experience} Experience</p>
                            <p class="job-salary">$${vacancy.salary}</p>
                            <p class="job-info"><strong>Job Description:</strong> ${vacancy.description}</p>
                            <p class="job-info"><strong>Requirements:</strong> ${vacancy.requirements}</p>
                            <p class="job-info"><strong>Responsibility:</strong> ${vacancy.responsibility}</p>
                            <p class="job-info"><strong>Working Hours:</strong> ${vacancy.workingHours} hours per day</p>
                            <p class="job-info"><strong>Status:</strong> ${vacancy.status}</p>
                            <p class="job-info"><strong>Experience:</strong> ${vacancy.experience}</p>
                            <p class="job-info"><strong>Work Location:</strong> ${vacancy.workLocation}</p>
                            <p class="job-info"><strong>Company Name:</strong> ${vacancy.companyName}</p>
                            <p class="job-info"><strong>Major Name:</strong> ${vacancy.majorName}</p>
                            <p class="job-info"><strong>Recruiter:</strong> ${vacancy.recruiterUsername}</p>
                            <button class="btn btn-success" onclick="applyToVacancy(${vacancy.vacancyId})">Apply</button>
                            <!-- Comment Input Section -->
                            <div class="comment-input-section">
                                <input type="text" id="commentInput" placeholder="Add a comment...">
                                <button>Add Comment</button>
                            </div>
                
                            <!-- See All Comments Section -->
                            <div class="see-all-comments-section">
                                <a href="#">See All Comments</a>
                            </div>
                        </div>
                    </div>`;
                
                    jobListingColumn.append(cardHtml);
                });
            }
        },
        error: function(error) {
            if (error.status === 404) {
                // Display a message when the API returns a 404 status (Not Found)
                var jobListingColumn = $("#jobListingColumn");
                jobListingColumn.empty();
                jobListingColumn.append('<h2 style="color:red;">No offers were found.</h2>');
            } else {
                console.error("Error fetching job listings:", error);
            }
        }
    });
}

function fetchAndDisplayJobBySalary() {
    var selectedMajorID = $("#majorFilter").val();
    var selectedLocation = $("#locationFilter").val();
    var selectedSalary = $("#salaryFilter").val();

    $.ajax({
        url: `https://localhost:44346/api/Filter/SalaryFilter?salary=${selectedSalary}&MajorID=${selectedMajorID}&location=${selectedLocation}`,
        method: "GET",
        success: function(response) {
            var jobListingColumn = $("#jobListingColumn");
            jobListingColumn.empty(); // Clear existing job listings

            if (response.length === 0) {
                // Display a message when no offers are found
                jobListingColumn.append('<h2 style="color:red;">No offers were found.</h2>');
            } else {
                // Loop through the response and append job cards to the job listing column
                response.forEach(function(vacancy) {
                    var cardHtml = `
                    <div class="card job-card">
                    <div class="job-card-body">
                        <h5 class="job-title">${vacancy.jobOffer}</h5>
                        <p class="job-info"><i class="fas fa-building job-icon"></i> ${vacancy.companyName}</p>
                        <p class="job-info"><i class="fas fa-map-marker-alt job-icon"></i> ${vacancy.workLocation}</p>
                        <p class="job-info"><i class="fas fa-clock job-icon"></i> ${vacancy.experience} Experience</p>
                        <p class="job-salary">$${vacancy.salary}</p>
                        <p class="job-info"><strong>Job Description:</strong> ${vacancy.description}</p>
                        <p class="job-info"><strong>Requirements:</strong> ${vacancy.requirements}</p>
                        <p class="job-info"><strong>Responsibility:</strong> ${vacancy.responsibility}</p>
                        <p class="job-info"><strong>Working Hours:</strong> ${vacancy.workingHours} hours per day</p>
                        <p class="job-info"><strong>Status:</strong> ${vacancy.status}</p>
                        <p class="job-info"><strong>Experience:</strong> ${vacancy.experience}</p>
                        <p class="job-info"><strong>Work Location:</strong> ${vacancy.workLocation}</p>
                        <p class="job-info"><strong>Company Name:</strong> ${vacancy.companyName}</p>
                        <p class="job-info"><strong>Major Name:</strong> ${vacancy.majorName}</p>
                        <p class="job-info"><strong>Recruiter:</strong> ${vacancy.recruiterUsername}</p>
                        <button class="btn btn-success">Apply</button>
                        <!-- Comment Input Section -->
                        <div class="comment-input-section">
                            <input type="text" id="commentInput" placeholder="Add a comment...">
                            <button>Add Comment</button>
                        </div>
            
                        <!-- See All Comments Section -->
                        <div class="see-all-comments-section">
                            <a href="#">See All Comments</a>
                        </div>
                    </div>
                </div>
                    `;
                    jobListingColumn.append(cardHtml);
                });
            }
        },
        error: function(error) {
            if (error.status === 404) {
                // Display a message when the API returns a 404 status (Not Found)
                var jobListingColumn = $("#jobListingColumn");
                jobListingColumn.empty();
                jobListingColumn.append('<h2 style="color:red;">No offers were found.</h2>');
            } else {
                console.error("Error fetching job listings:", error);
            }
        }
    });
}



// Document ready
$(document).ready(function() {
    // Populate majors on page load
    populateMajorOptions();

});
    $("#majorFilter").on("change", function() {
        fetchAndDisplayJobByLocation();
    });

    // Add change event listener to the location filter
    $("#locationFilter").on("change", function() {
        fetchAndDisplayJobByLocation();
        var salaryValue = $("#salaryFilter").val();
        if (salaryValue !== "") {
            fetchAndDisplayJobBySalary();
        }
    });

    $("#salaryFilter").on("input", function() {
        fetchAndDisplayJobBySalary();
    });
    






