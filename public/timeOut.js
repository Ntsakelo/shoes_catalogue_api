document.addEventListener("DOMContentLoaded", function () {
  const err = document.querySelector(".err");
  if (err.innerHTML !== "") {
    setTimeout(function () {
      err.innerHTML = "";
    }, 3000);
  }
});
