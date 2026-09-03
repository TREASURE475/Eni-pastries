// CONFIGURATION: Replace with your actual WhatsApp number with country code
const WHATSAPP_NUMBER = "237674460464";

let selectedProduct = "";
let selectedPrice = "";

// Transition from Welcome Screen to Main Website
function enterStore() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('main-site').style.display = 'block';
    window.scrollTo(0, 0);
}

// Return to Welcome Screen
function showWelcomeScreen() {
    document.getElementById('main-site').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'flex';
    window.scrollTo(0, 0);
}

// Single Page Application Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    
    document.getElementById(pageId).classList.add('active');
    event.target.classList.add('active');
    window.scrollTo(0, 0);
}

// Modal Control
function openOrderModal(productName, productPrice) {
    selectedProduct = productName;
    selectedPrice = productPrice;
    document.getElementById('modalProductInfo').innerText = `Product: ${productName} (${productPrice})`;
    document.getElementById('orderModal').style.display = 'flex';
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
}

// Send Order to WhatsApp
 function sendWhatsApp(event) {
    event.preventDefault();

    // 1. Fetch values entered by the customer in your HTML modal inputs
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddress').value;

    // 2. Format the message as ONE clean multi-line string using backticks (`)
    const rawText = `*NEW ORDER REQUEST - ENI PASTRIES*

*Product:* ${selectedProduct}
*Price:* ${selectedPrice}

*Customer Details:*
- *Phone:* ${phone}
- *Address:* ${address}`;

    // 3. Convert spaces and line breaks into proper URL format
    const text = encodeURIComponent(rawText);

    // 4. Build URL using your global WHATSAPP_NUMBER variable and open WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    
    window.open(whatsappUrl, '_blank');
    closeOrderModal();
}

// =========================================
// FULL-SCREEN LIGHTBOX FUNCTIONS
// =========================================

// Open Full-Screen Image
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.style.display = 'flex';
    }
}

// Close Full-Screen Image
function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

// Close when clicking outside the photo
document.addEventListener('click', function(e) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (e.target === lightbox && e.target !== lightboxImg) {
        closeLightbox();
    }
});
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    // Opens and closes the menu when clicking the 3-line icon
    menuToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      navLinks.classList.toggle('active');
    });

    // Closes the menu automatically if you click anywhere outside of it
    document.addEventListener('click', (event) => {
      if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove('active');
      }
    });

    // Closes the menu automatically after selecting a page link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
});