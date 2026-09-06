/* ==========================================
   RAVI SENSI
   SISTEMA PRINCIPAL
========================================== */


/* ==========================================
   GERADOR DE SENSIBILIDADE
========================================== */

const sensis = {

    android: {

        precisao: {
            geral: 92,
            redDot: 88,
            mira2x: 82,
            mira4x: 76,
            awm: 45,
            dpi: 480,
            botao: 52
        },

        capa: {
            geral: 98,
            redDot: 94,
            mira2x: 88,
            mira4x: 80,
            awm: 48,
            dpi: 520,
            botao: 55
        },

        equilibrada: {
            geral: 95,
            redDot: 90,
            mira2x: 84,
            mira4x: 77,
            awm: 46,
            dpi: 500,
            botao: 53
        },

        rapida: {
            geral: 100,
            redDot: 97,
            mira2x: 92,
            mira4x: 84,
            awm: 50,
            dpi: 560,
            botao: 58
        }

    },


    iphone: {

        precisao: {
            geral: 90,
            redDot: 86,
            mira2x: 80,
            mira4x: 74,
            awm: 43,
            dpi: 420,
            botao: 50
        },

        capa: {
            geral: 96,
            redDot: 93,
            mira2x: 87,
            mira4x: 79,
            awm: 47,
            dpi: 450,
            botao: 54
        },

        equilibrada: {
            geral: 93,
            redDot: 89,
            mira2x: 83,
            mira4x: 76,
            awm: 45,
            dpi: 430,
            botao: 52
        },

        rapida: {
            geral: 100,
            redDot: 96,
            mira2x: 91,
            mira4x: 83,
            awm: 49,
            dpi: 470,
            botao: 57
        }

    },


    emulador: {

        precisao: {
            geral: 88,
            redDot: 84,
            mira2x: 78,
            mira4x: 72,
            awm: 40,
            dpi: 800,
            botao: 48
        },

        capa: {
            geral: 94,
            redDot: 91,
            mira2x: 86,
            mira4x: 78,
            awm: 44,
            dpi: 900,
            botao: 52
        },

        equilibrada: {
            geral: 91,
            redDot: 87,
            mira2x: 82,
            mira4x: 75,
            awm: 42,
            dpi: 850,
            botao: 50
        },

        rapida: {
            geral: 98,
            redDot: 94,
            mira2x: 90,
            mira4x: 82,
            awm: 47,
            dpi: 950,
            botao: 56
        }

    }

};


/* GERAR SENSI */

function generateSensi() {

    const device =
        document.getElementById("device").value;

    const style =
        document.getElementById("style").value;


    const config =
        sensis[device][style];


    document.getElementById("geral").textContent =
        config.geral;

    document.getElementById("redDot").textContent =
        config.redDot;

    document.getElementById("mira2x").textContent =
        config.mira2x;

    document.getElementById("mira4x").textContent =
        config.mira4x;

    document.getElementById("awm").textContent =
        config.awm;

    document.getElementById("dpi").textContent =
        config.dpi;

    document.getElementById("botao").textContent =
        config.botao;


    const result =
        document.getElementById("result");


    result.style.display = "block";


    document.getElementById("message").textContent =
        "🔥 Configuração gerada! Teste e ajuste conforme sua preferência.";


    result.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}


/* COPIAR SENSI */

function copySensi() {

    const texto = `🔥 RAVI SENSI

🎯 Geral: ${document.getElementById("geral").textContent}
🔴 Red Dot: ${document.getElementById("redDot").textContent}
🔭 Mira 2X: ${document.getElementById("mira2x").textContent}
🔭 Mira 4X: ${document.getElementById("mira4x").textContent}
🎯 AWM: ${document.getElementById("awm").textContent}
📱 DPI: ${document.getElementById("dpi").textContent}
🔘 Botão: ${document.getElementById("botao").textContent}

⚡ RAVI SENSI`;


    navigator.clipboard.writeText(texto)

        .then(() => {

            document.getElementById("message").textContent =
                "✅ Configuração copiada com sucesso!";

        })

        .catch(() => {

            alert(
                "Não foi possível copiar automaticamente. " +
                "Copie a configuração manualmente."
            );

        });

}


/* ==========================================
   RAVI BOOST
========================================== */

const boostConfigs = {

    android: {

        fps: "Alto",

        graphics: "Suave",

        shadows: "Desativadas",

        effects: "Baixo",

        performance: "Prioridade máxima",

        connection: "Estável",

        tip:
            "Feche aplicativos em segundo plano e evite jogar com o aparelho muito quente."

    },


    iphone: {

        fps: "Alto",

        graphics: "Suave",

        shadows: "Desativadas",

        effects: "Baixo",

        performance: "Alta estabilidade",

        connection: "Estável",

        tip:
            "Feche aplicativos desnecessários e evite jogar enquanto o aparelho estiver aquecendo demais."

    },


    emulador: {

        fps: "Alto",

        graphics: "Suave",

        shadows: "Desativadas",

        effects: "Baixo",

        performance: "Alto desempenho",

        connection: "Estável",

        tip:
            "Feche programas desnecessários no Windows e evite downloads durante a gameplay."

    }

};


/* OTIMIZAR */

function optimizeGame() {

    const device =
        document.getElementById(
            "optimizationDevice"
        ).value;


    const config =
        boostConfigs[device];


    document.getElementById("boostFps").textContent =
        config.fps;

    document.getElementById("boostGraphics").textContent =
        config.graphics;

    document.getElementById("boostShadows").textContent =
        config.shadows;

    document.getElementById("boostEffects").textContent =
        config.effects;

    document.getElementById("boostPerformance").textContent =
        config.performance;

    document.getElementById("boostConnection").textContent =
        config.connection;

    document.getElementById("boostTip").textContent =
        config.tip;


    const result =
        document.getElementById(
            "optimizationResult"
        );


    result.style.display = "block";


    result.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}


/* ==========================================
   RAVI STORE
========================================== */

const products = {

    "RAVI CAPA": {

        name: "RAVI CAPA",

        price: "R$ 9,90",

        device: "Android"

    },


    "RAVI ULTRA": {

        name: "RAVI ULTRA",

        price: "R$ 14,90",

        device: "Android / iPhone"

    },


    "RAVI EMULATOR": {

        name: "RAVI EMULATOR",

        price: "R$ 12,90",

        device: "Emulador"

    }

};


/* COMPRAR */

function buyProduct(productName) {

    const product =
        products[productName];


    if (!product) {

        alert(
            "Produto não encontrado."
        );

        return;

    }


    alert(

        `🔥 ${product.name}\n\n` +

        `💰 Preço: ${product.price}\n` +

        `📱 Compatibilidade: ${product.device}\n\n` +

        `🛒 Sistema de checkout em desenvolvimento.`

    );

}


/* ==========================================
   RAVI HUD
========================================== */

function copyHud(code, button) {

    navigator.clipboard.writeText(code)

        .then(() => {

            const message =
                document.getElementById(
                    "hudMessage"
                );


            message.textContent =
                `✅ Código ${code} copiado!`;


            const originalText =
                button.textContent;


            button.textContent =
                "✅ COPIADO!";


            setTimeout(() => {

                button.textContent =
                    originalText;

            }, 1800);


            setTimeout(() => {

                message.textContent =
                    "";

            }, 3000);

        })

        .catch(() => {

            alert(
                "Não foi possível copiar automaticamente."
            );

        });

}


/* ==========================================
   INICIALIZAÇÃO
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "🔥 RAVI SENSI carregado com sucesso!"
        );

    }
);
