// Global functions for navigation and interaction

function openChat() {
    window.location.href = 'chatbot.html';
}

function sendQuickReply(message) {
    // Add user message
    const chatMessages = document.getElementById('chatMessages');
    const userMessage = createMessageElement(message, 'user');
    chatMessages.appendChild(userMessage);
    
    // Hide quick replies after selection
    const quickReplies = document.getElementById('quickReplies');
    if (quickReplies) {
        quickReplies.style.display = 'none';
    }
    
    // Simulate bot response based on message
    setTimeout(() => {
        let botResponse = '';
        
        switch(message) {
            case 'When is registration deadline?':
                botResponse = 'Registration for Spring 2026 semester ends on January 15, 2026. You can register through the Student Services tab in your portal.';
                break;
            case 'How to check my grades?':
                botResponse = 'You can check your grades under the "Academic Records" section in the Student Services tab. Grades are typically available 1 week after exams.';
                break;
            case 'Password reset help':
                botResponse = 'For password reset, visit the IT Help Desk or use the "Forgot Password" link on the login page. You\'ll need your student ID and registered email.';
                break;
            case 'Contact IT support':
                botResponse = 'IT Support is available at ithelp@aau.edu.et or call +251-11-123-4567. Office hours: Mon-Fri, 8:30 AM - 5:30 PM.';
                break;
            default:
                botResponse = 'I understand you need help. Let me connect you with a live support agent who can assist you better.';
                // Redirect to handoff for complex queries
                setTimeout(() => {
                    window.location.href = 'handoff.html';
                }, 1500);
        }
        
        const botMessage = createMessageElement(botResponse, 'bot');
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // If it's a complex query, redirect to handoff
        if (message === 'I\'m getting error code 125 during registration') {
            setTimeout(() => {
                window.location.href = 'handoff.html';
            }, 2000);
        }
    }, 1000);
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        sendQuickReply(message);
        input.value = '';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function createMessageElement(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message fade-in`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = 'Just now';
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);
    
    return messageDiv;
}

function proceedToResolution() {
    window.location.href = 'resolution.html';
}

function rateSupport(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#FFD700';
            star.style.transform = 'scale(1.2)';
        } else {
            star.style.color = '#ccc';
            star.style.transform = 'scale(1)';
        }
    });
    
    // Show thank you message
    setTimeout(() => {
        alert(`Thank you for your ${rating}-star rating! Your feedback helps us improve.`);
    }, 500);
}

function goBackToPortal() {
    window.location.href = 'index.html';
}

// Initialize chat with welcome message
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});