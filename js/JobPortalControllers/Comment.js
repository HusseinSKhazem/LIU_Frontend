function addComment(vacancyID) {
    const commentInput = document.querySelector(`.job-card[data-vacancy-id="${vacancyID}"] .comment-input`);
    console.log("addComment function called for Vacancy ID:", vacancyID);
    if (commentInput) {
        const commentContent = commentInput.value;
        const jwtToken = localStorage.getItem('jwtToken');
        var claims = parseJwt(jwtToken);
        var email = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        fetch(`https://localhost:44346/api/Comments/AddComment?vacancyID=${vacancyID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: commentContent,
                userEmail: email
            })
        })
        .then(response => {
            if (response.ok) {
                setTimeout(() => {
                    const successAlert = document.getElementById('comment-success-alert');
                    centerElementInViewport(successAlert);
                    successAlert.style.display = 'block';
                }, 100);

               
                setTimeout(() => {
                    const successAlert = document.getElementById('comment-success-alert');
                    successAlert.style.display = 'none';
                }, 2500);
            } else {
                if (response.status === 400) {
                    // Handle plain text response
                    response.text().then(errorMessage => {
                        alert(`Bad Request: ${errorMessage}`);
                    });
                } else {
                    throw new Error(`Error adding comment for Vacancy ${vacancyID}. Status: ${response.status}`);
                }
            }
        })
        
        .then(data => {
            // Handle the text response, you can update the UI or perform other actions here
            console.log(`Comment added successfully for Vacancy ${vacancyID}:`, data);
        })
        .catch(error => {
            console.error(error);
        });
    } else {
        console.error('Comment input element not found');
    }
    }

    

    function centerElementInViewport(element) {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
    
        const elementHeight = element.clientHeight;
        const elementWidth = element.clientWidth;
    
        const topPosition = Math.max(0, (windowHeight - elementHeight) / 2);
        const leftPosition = Math.max(0, (windowWidth - elementWidth) / 2);
    
        element.style.top = `${topPosition}px`;
        element.style.left = `${leftPosition}px`;
    }



    function fetchCommentsFromApi(vacancyId) {
        return $.ajax({
            url: `https://localhost:44346/api/Comments/GetComments?vacancyID=${vacancyId}`,
            method: "GET",
            dataType: "json",
        });
    }
    
    // Function to display comments in a modal
    function displayCommentsModal(comments) {
        var commentsContainer = $("#commentsContainer");
        commentsContainer.empty();
    
        comments.forEach(function(comment) {
            var commentHtml = `
                <div class="comment-container mt-3">
                    <div class="comment-profile-picture">
                        <img src="https://localhost:44346/api/User/GetProfilePicture/${comment.profilePicture.id}" alt="Profile Picture">
                    </div>
                    <div class="comment-content">
                        <p class="comment-username">${comment.username}</p>
                        <p class="comment-text">${comment.content}</p>
                    </div>
                </div>
            `;
            commentsContainer.append(commentHtml);
        });
    
        // Show the modal
        $("#commentsModal").modal("show");
    }
    
    // Event delegation for "See All Comments" link
    $(document).on("click", ".see-all-comments-section a", function(e) {
        e.preventDefault();
    
        // Get the vacancy ID associated with the clicked job card
        var vacancyId = $(this).closest(".job-card").data("vacancy-id");
    
        // Fetch comments from the API
        fetchCommentsFromApi(vacancyId)
            .then(function(comments) {
                // Display comments in the modal
                displayCommentsModal(comments);
            })
            .catch(function(error) {
                console.error("Error fetching comments:", error);
            });
    });
    
