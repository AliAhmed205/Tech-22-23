const form = document.getElementById("theme-builder-form")

form.addEventListener("submit", (event) => {
  event.preventDefault()

  const formData = new FormData(form)

  fetch("/api/theme-builder", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      // Update the UI with the new theme
      document.body.style.backgroundColor = formData.get("bg-color")
      document.body.style.fontFamily = formData.get("font-family")
      const imageUrl = URL.createObjectURL(formData.get("image"))
      document.body.style.backgroundImage = `url(${imageUrl})`
    })
    .catch((error) => {
      console.error("There was an error submitting the form:", error)
    })
})