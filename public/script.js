document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContent = document.getElementById('tab-content');
  const loadingIndicator = document.getElementById('loading-indicator');
  let isLoading = false;

  tabButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      if (isLoading) {
        event.preventDefault();
        return;
      }

      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to the clicked button
      button.classList.add('active');
      // Clear the content and show the loading indicator
      tabContent.innerHTML = '';
      loadingIndicator.style.display = 'block';
      isLoading = true;

      // Disable all buttons
      tabButtons.forEach(btn => btn.disabled = true);
    });
  });

  document.body.addEventListener('htmx:afterOnLoad', (event) => {
    // Hide the loading indicator after content is loaded
    loadingIndicator.style.display = 'none';
    isLoading = false;

    // Re-enable all buttons
    tabButtons.forEach(btn => btn.disabled = false);
  });
});