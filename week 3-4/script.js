/* Small demonstration only: form events.
   The main project focus remains HTML5 + CSS3. */

const styleForm = document.getElementById("styleForm");
const formMessage = document.getElementById("formMessage");

styleForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!styleForm.checkValidity()) {
    formMessage.textContent = "Please complete the required fields.";
    styleForm.reportValidity();
    return;
  }

  formMessage.textContent = "Thank you! Your style consultation request has been received.";
  styleForm.reset();
});

const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage = document.getElementById("newsletterMessage");

newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!newsletterForm.checkValidity()) {
    newsletterForm.reportValidity();
    return;
  }

  newsletterMessage.textContent = "You're on the list — welcome to The Style Letter.";
  newsletterForm.reset();
});
