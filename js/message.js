document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
    subject: document.getElementById("subject").value,
  };

  try {
    const response = await fetch("https://igat-admin.vercel.app/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.success) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Message Sent Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("message").value = "";
      document.getElementById("subject").value = "";
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "An error has ocurred",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log(result);
  } catch (error) {
    Swal.fire({
      position: "top",
      icon: "error",
      title: "An error has ocurred",
      showConfirmButton: false,
      timer: 1500,
    });
    console.error("Error:", error);
  }
});
