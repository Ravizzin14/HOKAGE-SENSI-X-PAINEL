```javascript
/* =========================================================
   RAVI FF PANEL — SCRIPT.JS
   ========================================================= */

"use strict";

/* =========================================================
   CONFIGURAÇÃO
   ========================================================= */

const ADMIN_CODE = "R2026";

const DEFAULT_CODES = [
    "RAVI-Q8K4-M7XP",
    "RAVI-2N6T-W9ZR",
    "RAVI-H5Q8-K3YM",
    "RAVI-7X2P-N6VK",
    "RAVI-M4ZT-8QWR",
    "RAVI-9K3H-T7XN",
    "RAVI-W6MP-2R8Q",
    "RAVI-F7ZN-5K4T",
    "RAVI-3Y8Q-H6MW",
    "RAVI-P2VK-9X5N",
    "RAVI-X7K9-82QM",
    "RAVI-P4ZT-6N8K",
    "RAVI-3QW7-H9XP",
    "RAVI-M8KD-2R5V",
    "RAVI-T6YQ-9L3N",
    "RAVI-7FHP-4X2M",
    "RAVI-K5RN-8Q6T",
    "RAVI-9Z3C-W7KD",
    "RAVI-H2XM-6P8Q",
    "RAVI-V4TN-7K9R"
];

/* =========================================================
   STORAGE
   ========================================================= */

function loadData(key, fallback) {
    try {
        const data = localStorage.getItem(key);

        if (!data) {
            return fallback;
        }

        return JSON.parse(data);
    } catch (error) {
        console.warn("Erro ao carregar:", key);
        return fallback;
    }
}

function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn("Erro ao salvar:", key);
    }
}

/* =========================================================
   CÓDIGOS
   ========================================================= */

let codes = loadData(
    "ravi_codes",
    DEFAULT_CODES.map(code => ({
        code: code,
        active: true
    }))
);

/* =========================================================
   PRODUTOS
   ========================================================= */

const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: "Basic",
        price: 9.90,
        active: true
    },
    {
        id: 2,
        name: "Premium",
        price: 19.90,
        active: true
    },
    {
        id: 3,
        name: "VIP",
        price: 29.90,
        active: true
    }
];

let products = loadData(
    "ravi_products",
    DEFAULT_PRODUCTS
);

/* =========================================================
   USUÁRIO ATUAL
   ========================================================= */

let currentUser = loadData("ravi_user", null);

/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    setupEvents();
    setupRanges();
    restoreSession();
});

/* =========================================================
   EVENTOS
   ========================================================= */

function setupEvents() {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    const menuButton = document.querySelector(".mobile-menu");

    if (menuButton) {
        menuButton.addEventListener("click", toggleSidebar);
    }

    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", () => {

            document.querySelectorAll(".nav-item")
                .forEach(nav => nav.classList.remove("active"));

            item.classList.add("active");

            closeSidebar();
        });
    });

    document.querySelectorAll(".toggle").forEach(toggle => {
        toggle.addEventListener("click", () => {
            toggle.classList.toggle("active");
        });
    });

    document.querySelectorAll(".zone").forEach(zone => {
        zone.addEventListener("click", () => {

            document.querySelectorAll(".zone")
                .forEach(item => item.classList.remove("selected"));

            zone.classList.add("selected");
        });
    });

    document.querySelectorAll("[data-modal-close]")
        .forEach(button => {
            button.addEventListener("click", closeModal);
        });
}

/* =========================================================
   LOGIN
   ========================================================= */

function handleLogin(event) {

    event.preventDefault();

    const input = document.getElementById("accessCode");

    if (!input) {
        return;
    }

    const enteredCode = input.value.trim().toUpperCase();

    if (!enteredCode) {
        showToast("Digite seu código de acesso.");
        return;
    }

    /* ADM */

    if (enteredCode === ADMIN_CODE) {

        currentUser = {
            type: "ADM",
            code: ADMIN_CODE
        };

        saveData("ravi_user", currentUser);

        showToast("👑 Acesso ADM liberado!");

        setTimeout(() => {
            enterPanel();
        }, 500);

        return;
    }

    /* PLAYER */

    const found = codes.find(item => {
        return item.code.toUpperCase() === enteredCode;
    });

    if (!found) {
        showToast("❌ Código inválido.");
        return;
    }

    if (!found.active) {
        showToast("🔴 Este código está desativado.");
        return;
    }

    currentUser = {
        type: "PLAYER",
        code: found.code
    };

    saveData("ravi_user", currentUser);

    showToast("✅ Acesso liberado!");

    setTimeout(() => {
        enterPanel();
    }, 500);
}

/* =========================================================
   ENTRAR NO PAINEL
   ========================================================= */

function enterPanel() {

    const loginScreen = document.querySelector(".login-screen");
    const app = document.querySelector(".app");

    if (loginScreen) {
        loginScreen.style.display = "none";
    }

    if (app) {
        app.style.display = "flex";
    }

    updateUserInterface();
}

/* =========================================================
   RESTAURAR SESSÃO
   ========================================================= */

function restoreSession() {

    const loginScreen = document.querySelector(".login-screen");
    const app = document.querySelector(".app");

    if (!currentUser) {

        if (loginScreen) {
            loginScreen.style.display = "flex";
        }

        if (app) {
            app.style.display = "none";
        }

        return;
    }

    if (loginScreen) {
        loginScreen.style.display = "none";
    }

    if (app) {
        app.style.display = "flex";
    }

    updateUserInterface();
}

/* =========================================================
   INTERFACE DO USUÁRIO
   ========================================================= */

function updateUserInterface() {

    if (!currentUser) {
        return;
    }

    document.querySelectorAll("[data-user-type]")
        .forEach(element => {
            element.textContent = currentUser.type;
        });

    document.querySelectorAll("[data-user-code]")
        .forEach(element => {
            element.textContent = currentUser.code;
        });

    /* Elementos exclusivos do ADM */

    document.querySelectorAll("[data-admin-only]")
        .forEach(element => {

            if (currentUser.type === "ADM") {
                element.style.display = "";
            } else {
                element.style.display = "none";
            }
        });

    /* Atualiza produtos */

    renderProducts();

    /* Atualiza códigos */

    if (currentUser.type === "ADM") {
        renderCodes();
        renderAdminProducts();
    }
}

/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    localStorage.removeItem("ravi_user");

    currentUser = null;

    const app = document.querySelector(".app");
    const loginScreen = document.querySelector(".login-screen");

    if (app) {
        app.style.display = "none";
    }

    if (loginScreen) {
        loginScreen.style.display = "flex";
    }

    const input = document.getElementById("accessCode");

    if (input) {
        input.value = "";
    }

    showToast("Você saiu do painel.");
}

/* =========================================================
   SIDEBAR
   ========================================================= */

function toggleSidebar() {

    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}

function closeSidebar() {

    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.classList.remove("open");
    }
}

/* =========================================================
   NAVEGAÇÃO
   ========================================================= */

function showSection(sectionId) {

    document.querySelectorAll("[data-section]")
        .forEach(section => {
            section.style.display = "none";
        });

    const target = document.getElementById(sectionId);

    if (target) {
        target.style.display = "block";
        target.classList.add("fade-in");
    }
}

/* =========================================================
   CÓDIGOS ADM
   ========================================================= */

function toggleCode(index) {

    if (!isAdmin()) {
        showToast("Acesso restrito ao ADM.");
        return;
    }

    if (!codes[index]) {
        return;
    }

    codes[index].active = !codes[index].active;

    saveData("ravi_codes", codes);

    renderCodes();

    showToast(
        codes[index].active
            ? "Código ativado."
            : "Código desativado."
    );
}

function renderCodes() {

    const container = document.getElementById("codesList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    codes.forEach((item, index) => {

        const row = document.createElement("div");

        row.className = "code-row";

        row.innerHTML = `
            <span>${escapeHTML(item.code)}</span>

            <span class="status ${item.active ? "on" : "off"}">
                <span class="status-dot"></span>
                ${item.active ? "ATIVO" : "DESATIVADO"}
            </span>

            <button
                class="btn ${item.active ? "btn-danger" : "btn-red"}"
                onclick="toggleCode(${index})"
            >
                ${item.active ? "Desativar" : "Ativar"}
            </button>
        `;

        container.appendChild(row);
    });
}

/* =========================================================
   GERAR CÓDIGO
   ========================================================= */

function generateCode() {

    if (!isAdmin()) {
        showToast("Acesso restrito ao ADM.");
        return;
    }

    const newCode =
        "RAVI-" +
        randomCharacters(4) +
        "-" +
        randomCharacters(4);

    codes.push({
        code: newCode,
        active: true
    });

    saveData("ravi_codes", codes);

    renderCodes();

    showToast("Novo código criado.");
}

/* =========================================================
   GERADOR
   ========================================================= */

function randomCharacters(length) {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let result = "";

    for (let i = 0; i < length; i++) {

        const index =
            Math.floor(Math.random() * characters.length);

        result += characters[index];
    }

    return result;
}

/* =========================================================
   PRODUTOS
   ========================================================= */

function renderProducts() {

    const container =
        document.getElementById("productsList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    products
        .filter(product => product.active)
        .forEach(product => {

            const card =
                document.createElement("div");

            card.className = "product-card";

            const isAdmin =
                currentUser &&
                currentUser.type === "ADM";

            card.innerHTML = `
                <h3>${escapeHTML(product.name)}</h3>

                <p class="product-description">
                    Acesso ao pacote ${escapeHTML(product.name)}.
                </p>

                <div class="price">
                    R$ ${Number(product.price)
                        .toFixed(2)
                        .replace(".", ",")}
                </div>

                ${
                    isAdmin
                    ?
                    `<button class="btn btn-gray" disabled>
                        ACESSO ADM
                    </button>`
                    :
                    `<button
                        class="btn btn-red"
                        onclick="buyProduct(${product.id})"
                    >
                        COMPRAR
                    </button>`
                }
            `;

            container.appendChild(card);
        });
}

/* =========================================================
   COMPRAR
   ========================================================= */

function buyProduct(productId) {

    const product =
        products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    if (isAdmin()) {
        showToast("ADM possui acesso gratuito.");
        return;
    }

    openModal(
        "Comprar " + product.name,
        `
            <p class="modal-text">
                Produto selecionado:
                <strong>${escapeHTML(product.name)}</strong>
            </p>

            <p class="modal-text" style="margin-top:10px">
                Valor:
                <strong>
                    R$ ${Number(product.price)
                        .toFixed(2)
                        .replace(".", ",")}
                </strong>
            </p>

            <div style="margin-top:20px">
                <button
                    class="btn btn-red"
                    onclick="demoPurchase(${product.id})"
                >
                    CONTINUAR
                </button>

                <button
                    class="btn btn-gray"
                    onclick="closeModal()"
                >
                    CANCELAR
                </button>
            </div>
        `
    );
}

/* =========================================================
   COMPRA DEMONSTRAÇÃO
   ========================================================= */

function demoPurchase(productId) {

    const product =
        products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    closeModal();

    showToast(
        "Compra em modo demonstração."
    );
}

/* =========================================================
   PRODUTOS ADM
   ========================================================= */

function renderAdminProducts() {

    const container =
        document.getElementById("adminProductsList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    products.forEach((product, index) => {

        const item =
            document.createElement("div");

        item.className = "card";

        item.style.marginBottom = "12px";

        item.innerHTML = `
            <div style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:12px;
                flex-wrap:wrap;
            ">

                <div>
                    <strong>
                        ${escapeHTML(product.name)}
                    </strong>

                    <div class="text-muted">
                        R$ ${Number(product.price)
                            .toFixed(2)
                            .replace(".", ",")}
                    </div>
                </div>

                <div style="
                    display:flex;
                    gap:8px;
                    flex-wrap:wrap;
                ">

                    <button
                        class="btn ${
                            product.active
                            ? "btn-danger"
                            : "btn-red"
                        }"
                        onclick="toggleProduct(${index})"
                    >
                        ${
                            product.active
                            ? "Desativar"
                            : "Ativar"
                        }
                    </button>

                    <button
                        class="btn btn-gray"
                        onclick="deleteProduct(${index})"
                    >
                        Excluir
                    </button>

                </div>

            </div>
        `;

        container.appendChild(item);
    });
}

/* =========================================================
   ATIVAR / DESATIVAR PRODUTO
   ========================================================= */

function toggleProduct(index) {

    if (!isAdmin()) {
        showToast("Acesso restrito ao ADM.");
        return;
    }

    if (!products[index]) {
        return;
    }

    products[index].active =
        !products[index].active;

    saveData("ravi_products", products);

    renderProducts();
    renderAdminProducts();

    showToast(
        products[index].active
            ? "Produto ativado."
            : "Produto desativado."
    );
}

/* =========================================================
   EXCLUIR PRODUTO
   ========================================================= */

function deleteProduct(index) {

    if (!isAdmin()) {
        showToast("Acesso restrito ao ADM.");
        return;
    }

    if (!products[index]) {
        return;
    }

    products.splice(index, 1);

    saveData("ravi_products", products);

    renderProducts();
    renderAdminProducts();

    showToast("Produto removido.");
}

/* =========================================================
   ADICIONAR PRODUTO
   ========================================================= */

function addProduct(name, price) {

    if (!isAdmin()) {
        showToast("Acesso restrito ao ADM.");
        return;
    }

    const cleanName =
        String(name || "").trim();

    const cleanPrice =
        Number(price);

    if (!cleanName) {
        showToast("Digite o nome do produto.");
        return;
    }

    if (!Number.isFinite(cleanPrice) || cleanPrice < 0) {
        showToast("Digite um preço válido.");
        return;
    }

    products.push({
        id: Date.now(),
        name: cleanName,
        price: cleanPrice,
        active: true
    });

    saveData("ravi_products", products);

    renderProducts();
    renderAdminProducts();

    showToast("Produto adicionado.");
}

/* =========================================================
   SLIDERS
   ========================================================= */

function setupRanges() {

    document.querySelectorAll(
        'input[type="range"]'
    ).forEach(range => {

        updateRangeValue(range);

        range.addEventListener("input", () => {
            updateRangeValue(range);
        });
    });
}

function updateRangeValue(range) {

    const output =
        document.querySelector(
            `[data-range-value="${range.id}"]`
        );

    if (output) {
        output.textContent = range.value;
    }
}

/* =========================================================
   MODAL
   ========================================================= */

function openModal(title, content) {

    const modal =
        document.getElementById("modal");

    if (!modal) {
        return;
    }

    const titleElement =
        modal.querySelector(".modal-title");

    const contentElement =
        modal.querySelector(".modal-content");

    if (titleElement) {
        titleElement.textContent = title;
    }

    if (contentElement) {
        contentElement.innerHTML = content;
    }

    modal.classList.add("show");
}

function closeModal() {

    const modal =
        document.getElementById("modal");

    if (modal) {
        modal.classList.remove("show");
    }
}

/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    const oldToast =
        document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast =
        document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";

        setTimeout(() => {
            toast.remove();
        }, 250);

    }, 2500);
}

/* =========================================================
   ADMIN
   ========================================================= */

function isAdmin() {

    return currentUser &&
        currentUser.type === "ADM";
}

/* =========================================================
   SEGURANÇA BÁSICA DE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* =========================================================
   FECHAR MODAL CLICANDO FORA
   ========================================================= */

window.addEventListener("click", event => {

    const modal =
        document.getElementById("modal");

    if (
        modal &&
        event.target === modal
    ) {
        closeModal();
    }
});

/* =========================================================
   ATUALIZAÇÃO ENTRE ABAS
   ========================================================= */

window.addEventListener("storage", event => {

    if (event.key === "ravi_codes") {

        codes =
            loadData(
                "ravi_codes",
                codes
            );

        if (isAdmin()) {
            renderCodes();
        }
    }

    if (event.key === "ravi_products") {

        products =
            loadData(
                "ravi_products",
                products
            );

        renderProducts();

        if (isAdmin()) {
            renderAdminProducts();
        }
    }
});

/* =========================================================
   EXPOR FUNÇÕES PARA O HTML
   ========================================================= */

window.logout = logout;
window.toggleCode = toggleCode;
window.generateCode = generateCode;
window.buyProduct = buyProduct;
window.demoPurchase = demoPurchase;
window.toggleProduct = toggleProduct;
window.deleteProduct = deleteProduct;
window.addProduct = addProduct;
window.openModal = openModal;
window.closeModal = closeModal;
window.showSection = showSection;
window.toggleSidebar = toggleSidebar;
```
