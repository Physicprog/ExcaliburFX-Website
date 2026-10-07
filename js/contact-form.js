(function () {
  "use strict";

  var form = document.getElementById("footer-form");
  if (!form) return;

  var button = document.getElementById("footer-submit");
  var status = document.getElementById("footer-form-status");
  var statusTimeout;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    button.disabled = true;
    button.textContent = "Sending...";
    status.textContent = "";
    status.classList.remove("is-success", "is-error");
    clearTimeout(statusTimeout);

    try {
      var response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("The message service returned an error.");
      var result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Unable to send the message.");
      }

      status.textContent = "Message sent successfully! Thank you for reaching out.";
      status.classList.add("is-success");
      form.reset();
    } catch (error) {
      console.error("Web3Forms error:", error);
      status.textContent = "An error occurred. Please try again.";
      status.classList.add("is-error");
    } finally {
      button.disabled = false;
      button.textContent = "Send Message";
      statusTimeout = setTimeout(function () {
        status.textContent = "";
        status.classList.remove("is-success", "is-error");
      }, 5000);
    }
  });
})();
