function addComment(vacancyID) {
    const commentInput = document.querySelector(`.job-card[data-vacancy-id="${vacancyID}"] .comment-input`);
    console.log("addComment function called for Vacancy ID:", vacancyID);
    if (commentInput) {
        const commentContent = commentInput.value;
        const jwtToken = sessionStorage.getItem('jwtToken');
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
                    response.text().then(errorMessage => {
                        console.error(`Error adding comment for Vacancy ${vacancyID}: ${errorMessage}`);
                        const errorAlert = document.getElementById('comment-error-alert');
                        centerElementInViewport(errorAlert);
                        errorAlert.style.display = 'block';
        
                        setTimeout(() => {
                            errorAlert.style.display = 'none';
                        }, 2500);
                    });
                } else {
                    throw new Error(`Error adding comment for Vacancy ${vacancyID}. Status: ${response.status}`);
                }
            }
        })
        
        .then(data => {
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
    

    function displayCommentsModal(comments) {
        var commentsContainer = $("#commentsContainer");
        commentsContainer.empty();
    
        comments.forEach(function(comment) {
            var commentHtml = `
            <div class="comment-container">
    <div class="comment-profile">
        <img src="https://localhost:44346/api/User/GetProfilePicture/${comment.profilePicture.id}" alt="Profile Picture">
    </div>
    <div class="comment-details">
        <div class="comment-header">
            <p class="comment-username">${comment.username}</p>
            <p class="comment-date">${formatCustomDate(comment.dateTime)}</p>
        </div>
        <p class="comment-text">${comment.content}</p>
    </div>
</div>
            `;
            commentsContainer.append(commentHtml);
        });
    

        $("#commentsModal").modal("show");
    }
    
    $(document).on("click", ".see-all-comments-section a", function(e) {
        e.preventDefault();
    
        
        var vacancyId = $(this).closest(".job-card").data("vacancy-id");
        fetchCommentsFromApi(vacancyId)
            .then(function(comments) {
                displayCommentsModal(comments);
            })
            .catch(function(error) {
                console.error("Error fetching comments:", error);
            });
    });
    
    function formatCustomDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }