function loadChat(groupName) {
    // Show chat window if it's hidden
    const chatWrapper = document.getElementById("chatWrapper");
    chatWrapper.classList.remove("hidden");

    // Set group name
    document.getElementById("group-name").textContent = groupName;

    // Get the group image for the selected group
    const groupImageElement = document.getElementById("group-image");
    const groupImage = document.querySelector(`[id="group-${groupName}"] img`);

    if (groupImage) {
        // Set the group image dynamically
        groupImageElement.style.backgroundImage = `url(${groupImage.src})`;
    } else {
        console.error(`Image not found for group: ${groupName}`);
    }

    // Clear previous messages or load messages for the selected group
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML = ''; // Clear previous messages
}
