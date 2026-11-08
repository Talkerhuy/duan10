document.addEventListener("DOMContentLoaded", function () {
  // ================= 1. XỬ LÝ MENU MOBILE =================
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navbar.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
    });

    const navLinks = navbar.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbar.classList.contains("open")) {
          navbar.classList.remove("open");
          menuToggle.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute("aria-label", "Mở menu");
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".header-container") &&
        navbar.classList.contains("open")
      ) {
        navbar.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Mở menu");
      }
    });
  }

  // ================= 2. HIỆU ỨNG CUỘN HIỂN THỊ (INTERSECTION OBSERVER TỐI ƯU) =================
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px", // Cách đáy màn hình 50px là kích hoạt
    threshold: 0.05,
  };

  const scrollObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.classList.add("active");

        // Lấy thêm hiệu ứng animate ngoài nếu có
        const animationClass =
          target.getAttribute("data-animation") || target.dataset.animate;
        if (animationClass) {
          target.classList.add("animate__animated", animationClass);
        }

        obs.unobserve(target); // Chỉ chạy một lần mượt mà khi cuộn tới
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".reveal-item, .animate-on-scroll")
    .forEach((item) => {
      scrollObserver.observe(item);
    });

  // ================= 3. LỌC SẢN PHẨM THEO TAB =================
  const tabBtns = document.querySelectorAll(".tab-btn");
  const productCards = document.querySelectorAll(".shoe-card");

  if (tabBtns.length > 0 && productCards.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        tabBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        productCards.forEach((card) => {
          const cardCategory = card.getAttribute("data-category");
          if (filterValue === "all" || filterValue === cardCategory) {
            card.style.display = "flex";
            setTimeout(() => card.classList.remove("is-hidden"), 50);
          } else {
            card.classList.add("is-hidden");
            setTimeout(() => {
              if (card.classList.contains("is-hidden"))
                card.style.display = "none";
            }, 400);
          }
        });
      });
    });
  }

  // ================= 4. ĐẾM NGƯỢC THỜI GIAN (COUNTDOWN) =================
  const targetDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
  const timerInterval = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById("days");
    const hEl = document.getElementById("hours");
    const mEl = document.getElementById("minutes");
    const sEl = document.getElementById("seconds");

    if (dEl) dEl.innerText = String(days).padStart(2, "0");
    if (hEl) hEl.innerText = String(hours).padStart(2, "0");
    if (mEl) mEl.innerText = String(minutes).padStart(2, "0");
    if (sEl) sEl.innerText = String(seconds).padStart(2, "0");
  }, 1000);

  // ================= 5. GIỎ HÀNG (CART DRAWER) =================
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const btnCloseCart = document.getElementById("btnCloseCart");

  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove("active");
    if (cartOverlay) cartOverlay.classList.remove("active");
  }

  if (btnCloseCart) btnCloseCart.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  // ================= 6. VÒNG QUAY MAY MẮN =================
  const btnSpin = document.getElementById("btnSpin");
  const spinWheel = document.getElementById("spinWheel");
  const rewardNotice = document.getElementById("rewardNotice");
  let isSpinning = false;

  if (btnSpin && spinWheel) {
    btnSpin.addEventListener("click", function () {
      if (isSpinning) return;
      isSpinning = true;
      btnSpin.style.opacity = "0.6";
      btnSpin.style.cursor = "not-allowed";

      const randomDegree = Math.floor(Math.random() * 360) + 1800;
      spinWheel.style.transform = `rotate(${randomDegree}deg)`;

      setTimeout(function () {
        isSpinning = false;
        btnSpin.style.opacity = "1";
        btnSpin.style.cursor = "pointer";

        if (rewardNotice) {
          rewardNotice.innerHTML = `
            <span class="notice-tag" style="color: #10b981;">CHÚC MỪNG BẠN!</span>
            <h3 style="color: #10b981;">Bạn đã trúng: Suất Đan Cước 0đ!</h3>
            <p>Mã voucher đã lưu. Mang tới Showroom Hải Châu để đổi quà nhé.</p>
          `;
        }
        btnSpin.textContent = "ĐÃ NHẬN THƯỞNG";
      }, 4000);
    });
  }

  // ================= 7. MODAL CHI TIẾT SẢN PHẨM & CHỌN SIZE =================
  const modal = document.getElementById("productModal");
  const modalOverlay =
    document.getElementById("productModalOverlay") ||
    document.querySelector(".modal-backdrop");
  const btnCloseModal =
    document.getElementById("btnCloseModal") ||
    document.querySelector(".modal-close-btn");

  const allProductCards = document.querySelectorAll(
    ".shoe-card, .apparel-card-item",
  );

  if (modal) {
    allProductCards.forEach((card) => {
      card.style.cursor = "pointer";

      card.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-buy-now")) return;

        const imgEl = card.querySelector(".product-img");
        const titleEl = card.querySelector("h3");
        const priceMainEl = card.querySelector(".price-main, .current-price");
        const priceDelEl = card.querySelector(".price-del, .old-price");
        const seriesEl = card.querySelector(".item-series-code, .tech-tag");
        const descEl = card.querySelector(".item-features, .shoe-spec");
        const category = card.getAttribute("data-category");

        const modalImg = document.getElementById("modalProductImg");
        const modalTitle =
          document.getElementById("modalProductTitle") ||
          document.getElementById("modalProductName");
        const modalPrice =
          document.getElementById("modalProductPrice") ||
          document.getElementById("modalCurrentPrice");
        const modalOldPrice =
          document.getElementById("modalProductOldPrice") ||
          document.getElementById("modalOldPrice");
        const modalSeries =
          document.getElementById("modalProductSeries") ||
          document.getElementById("modalTechTag");
        const modalDesc = document.getElementById("modalProductDesc");
        const sizeGroup = document.getElementById("sizeSelectionGroup");

        if (modalImg && imgEl) modalImg.src = imgEl.src;
        if (modalTitle && titleEl) modalTitle.innerText = titleEl.innerText;
        if (modalPrice && priceMainEl)
          modalPrice.innerText = priceMainEl.innerText;

        if (modalOldPrice && priceDelEl) {
          modalOldPrice.innerText = priceDelEl.innerText;
          modalOldPrice.style.display = priceDelEl.innerText
            ? "inline"
            : "none";
        }
        if (modalSeries && seriesEl) modalSeries.innerText = seriesEl.innerText;
        if (modalDesc && descEl) modalDesc.innerText = descEl.innerText;

        if (sizeGroup) {
          sizeGroup.style.display =
            category === "accessories" ? "none" : "block";
        }

        modal.classList.add("active");
        if (modalOverlay) modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    function closeModal() {
      modal.classList.remove("active");
      if (modalOverlay) modalOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    if (btnCloseModal) btnCloseModal.addEventListener("click", closeModal);
    if (modalOverlay) modalOverlay.addEventListener("click", closeModal);
  }

  // Chọn size trong modal
  const sizeBtns = document.querySelectorAll(".size-btn");
  sizeBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      sizeBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });
});

// ================= 8. CÁC HÀNH ĐỘNG TOÀN CỤC (GLOBAL FUNCTIONS) =================
function toggleShowerEffect() {
  const container = document.querySelector(".promo-shower-container");
  if (container) container.classList.toggle("active");
}

function copyCode(code, btnElement) {
  navigator.clipboard.writeText(code);
  let originalText = btnElement.innerHTML;
  btnElement.innerHTML = "✓ Đã sao chép";
  btnElement.classList.add("copied");

  setTimeout(() => {
    btnElement.innerHTML = originalText;
    btnElement.classList.remove("copied");
  }, 2000);
}

// ================= 9. TRẮC NGHIỆM TƯ VẤN VỢT =================
let userSelections = { wrist: "", playStyle: "", budget: "" };

function nextQuizStep(stepNumber, choice) {
  if (stepNumber === 2) userSelections.wrist = choice;
  else if (stepNumber === 3) userSelections.playStyle = choice;

  document
    .querySelectorAll(".quiz-step")
    .forEach((el) => el.classList.remove("active"));
  const nextStepEl = document.getElementById(`quizStep${stepNumber}`);
  if (nextStepEl) nextStepEl.classList.add("active");
}

function finishQuiz(budgetChoice) {
  userSelections.budget = budgetChoice;

  document
    .querySelectorAll(".quiz-step")
    .forEach((el) => el.classList.remove("active"));
  const resultStep = document.getElementById("quizResultStep");
  if (resultStep) resultStep.classList.add("active");

  let recommendation = `Dựa trên thông tin cổ tay <strong>(${userSelections.wrist})</strong>, lối đánh <strong>(${userSelections.playStyle})</strong> và ngân sách <strong>(${userSelections.budget})</strong> của bạn:<br><br>`;

  if (userSelections.budget.includes("Dưới 1 triệu")) {
    recommendation += `🏸 Gợi ý dòng vợt phù hợp: <strong>Apacs Feather Weight</strong> hoặc <strong>Kumpoo Power Control</strong> (Trợ lực tốt, dễ thuần, giá cực kỳ tiếp cận).`;
  } else if (userSelections.budget.includes("1 - 2.5 triệu")) {
    recommendation += `🏸 Gợi ý dòng vợt phù hợp: <strong>Lining Windstorm</strong> hoặc <strong>Victor Jetspeed</strong> (Cân bằng tốt giữa tấn công và phòng thủ).`;
  } else {
    recommendation += `🏸 Gợi ý dòng vợt phù hợp: <strong>Yonex Astrox 100ZZ</strong> hoặc <strong>Yonex Nanoforce</strong> (Dòng vợt cao cấp đỉnh cao cho hiệu suất tối đa).`;
  }

  const resultTextEl = document.getElementById("quizResultText");
  if (resultTextEl) resultTextEl.innerHTML = recommendation;
}

function restartQuiz() {
  userSelections = { wrist: "", playStyle: "", budget: "" };
  document
    .querySelectorAll(".quiz-step")
    .forEach((el) => el.classList.remove("active"));
  const step1 = document.getElementById("quizStep1");
  if (step1) step1.classList.add("active");
}
