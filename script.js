// Navigation functionality
function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll(".page")
  pages.forEach((page) => page.classList.remove("active"))

  // Show selected page
  const targetPage = document.getElementById(pageId)
  if (targetPage) {
    targetPage.classList.add("active")
  }

  // Update navigation active state
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => link.classList.remove("active"))

  // Find and activate the corresponding nav link
  const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`)
  if (activeLink) {
    activeLink.classList.add("active")
  }

  // Scroll to top
  window.scrollTo(0, 0)
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu")
  navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex"
}

// File upload handling
function handleFileUpload(input) {
  const file = input.files[0]
  const preview = document.getElementById("upload-preview")

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      preview.innerHTML = `
                <div class="upload-success">
                    <i class="fas fa-check-circle"></i>
                    <p>File uploaded successfully: ${file.name}</p>
                    <img src="${e.target.result}" alt="X-ray preview" style="max-width: 200px; max-height: 200px; margin-top: 1rem; border-radius: 0.5rem;">
                </div>
            `
      preview.style.display = "block"
    }
    reader.readAsDataURL(file)
  }
}

// Risk analysis function
function analyzeRisk() {
  const form = document.getElementById("health-form")
  const formData = new FormData(form)
  const uploadInput = document.getElementById("xray-upload")

  // Check if X-ray is uploaded
  if (!uploadInput.files[0]) {
    alert("Please upload a chest X-ray image first.")
    return
  }

  // Check if form is filled
  let isFormValid = true
  const requiredFields = form.querySelectorAll("[required]")
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      isFormValid = false
      field.style.borderColor = "#dc2626"
    } else {
      field.style.borderColor = "#d1d5db"
    }
  })

  if (!isFormValid) {
    alert("Please fill in all required fields.")
    return
  }

  // Simulate analysis
  const analysisResult = document.createElement("div")
  analysisResult.className = "analysis-result"
  analysisResult.innerHTML = `
        <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 2rem; border-radius: 0.5rem; margin: 2rem 0; text-align: center;">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #0ea5e9; margin-bottom: 1rem;"></i>
            <h3 style="color: #0c4a6e; margin-bottom: 1rem;">Analyzing Your Data...</h3>
            <p style="color: #075985;">Our AI is processing your X-ray and health information. This may take a few moments.</p>
        </div>
    `

  // Insert after the analyze button
  const analyzeSection = document.querySelector(".analyze-section")
  analyzeSection.appendChild(analysisResult)

  // Simulate processing time
  setTimeout(() => {
    analysisResult.innerHTML = `
            <div style="background: #f0fdf4; border: 1px solid #22c55e; padding: 2rem; border-radius: 0.5rem; text-align: center;">
                <i class="fas fa-check-circle" style="font-size: 2rem; color: #16a34a; margin-bottom: 1rem;"></i>
                <h3 style="color: #15803d; margin-bottom: 1rem;">Analysis Complete</h3>
                <p style="color: #166534; margin-bottom: 1rem;">Based on your X-ray and health information, our AI has completed the analysis.</p>
                <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; margin: 1rem 0;">
                    <h4 style="color: #1e293b; margin-bottom: 1rem;">Risk Assessment: Low Risk</h4>
                    <p style="color: #64748b;">No immediate signs of pneumonia detected. However, please consult with a healthcare professional for a comprehensive evaluation.</p>
                </div>
                <button class="btn btn-primary" onclick="showPage('doctors')" style="margin-top: 1rem;">Consult a Specialist</button>
            </div>
        `
  }, 3000)
}

// Contact form submission
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const subject = formData.get("subject")
      const message = formData.get("message")

      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent

      submitButton.textContent = "Sending..."
      submitButton.disabled = true

      setTimeout(() => {
        alert("Thank you for your message! We will get back to you soon.")
        contactForm.reset()
        submitButton.textContent = originalText
        submitButton.disabled = false
      }, 2000)
    })
  }
})

// Smooth scrolling for anchor links
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }
})

// Add loading animation for page transitions
function showPageWithTransition(pageId) {
  const currentPage = document.querySelector(".page.active")
  if (currentPage) {
    currentPage.style.opacity = "0"
    setTimeout(() => {
      showPage(pageId)
      const newPage = document.querySelector(".page.active")
      newPage.style.opacity = "0"
      setTimeout(() => {
        newPage.style.opacity = "1"
      }, 50)
    }, 200)
  } else {
    showPage(pageId)
  }
}

// Initialize page transitions
document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page")
  pages.forEach((page) => {
    page.style.transition = "opacity 0.3s ease-in-out"
  })
})

// Responsive navigation for mobile
window.addEventListener("resize", () => {
  const navMenu = document.querySelector(".nav-menu")
  if (window.innerWidth > 768) {
    navMenu.style.display = "flex"
  } else {
    navMenu.style.display = "none"
  }
})
