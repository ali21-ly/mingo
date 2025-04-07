// Simple Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Received';
    
    // Clear the form
    this.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
    }, 3000);
}); 