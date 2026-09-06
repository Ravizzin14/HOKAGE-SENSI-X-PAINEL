const sensis = {
    android: {
        precisao: {
            geral: 185,
            redDot: 175,
            mira2x: 165,
            mira4x: 150,
            awm: 95,
            dpi: 520,
            botao: 48
        },
        capa: {
            geral: 195,
            redDot: 185,
            mira2x: 175,
            mira4x: 160,
            awm: 100,
            dpi: 560,
            botao: 52
        },
        equilibrada: {
            geral: 180,
            redDot: 170,
            mira2x: 160,
            mira4x: 145,
            awm: 90,
            dpi: 500,
            botao: 50
        },
        rapida: {
            geral: 200,
            redDot: 190,
            mira2x: 180,
            mira4x: 165,
            awm: 105,
            dpi: 600,
            botao: 55
        }
    },

    iphone: {
        precisao: {
            geral: 170,
            redDot: 160,
            mira2x: 150,
            mira4x: 140,
            awm: 85,
            dpi: "Padrão",
            botao: 45
        },
        capa: {
            geral: 185,
            redDot: 175,
            mira2x: 165,
            mira4x: 150,
            awm: 95,
            dpi: "Padrão",
            botao: 48
        },
        equilibrada: {
            geral: 165,
            redDot: 155,
            mira2x: 145,
            mira4x: 135,
            awm: 80,
            dpi: "Padrão",
            botao: 46
        },
        rapida: {
            geral: 190,
            redDot: 180,
            mira2x: 170,
            mira4x: 155,
            awm: 100,
            dpi: "Padrão",
            botao: 52
        }
    },

    emulador: {
        precisao: {
            geral: 160,
            redDot: 150,
            mira2x: 140,
            mira4x: 130,
            awm: 75,
            dpi: 800,
            botao: 42
        },
        capa: {
            geral: 175,
            redDot: 165,
            mira2x: 155,
            mira4x: 145,
            awm: 85,
            dpi: 900,
            botao: 45
        },
        equilibrada: {
            geral: 155,
            redDot: 145,
            mira2x: 135,
            mira4x: 125,
            awm: 70,
            dpi: 750,
            botao: 43
        },
        rapida: {
            geral: 180,
            redDot: 170,
            mira2x: 160,
            mira4x: 150,
            awm: 90,
            dpi: 1000,
            botao: 48
        }
    }
};


/* ========================= */
/* GERAR SENSI */
/* ========================= */

function generateSensi() {

    const dispositivo = document.getElementById("device").value;
    const estilo = document.getElementById("style").value;

    const config = sensis[dispositivo][estilo];

    document.getElementById("geral").textContent = config.geral;
    document.getElementById("redDot").textContent = config.redDot;
    document.getElementById("mira2x").textContent = config.mira2x;
    document.getElementById("mira4x").textContent = config.mira4x;
    document.getElementById("awm").textContent = config.awm;
    document.getElementById("dpi").textContent = config.dpi;
    document.getElementById("botao").textContent = config.botao + "%";

    document.getElementById("result").style.display = "block";

    document.getElementById("message").textContent =
        "Configuração gerada com sucesso!";
}


/* ========================= */
/* COPIAR SENSI */
/* ========================= */

function copySensi() {

    const texto =
        "🔥 RAVI SENSI\n\n" +
        "Geral: " + document.getElementById("geral").textContent + "\n" +
        "Red Dot: " + document.getElementById("redDot").textContent + "\n" +
        "Mira 2X: " + document.getElementById("mira2x").textContent + "\n" +
        "Mira 4X: " + document.getElementById("mira4x").textContent + "\n" +
        "AWM: " + document.getElementById("awm").textContent + "\n" +
        "DPI: " + document.getElementById("dpi").textContent + "\n" +
        "Botão: " + document.getElementById("botao").textContent;

    navigator.clipboard.writeText(texto)
        .then(function() {

            document.getElementById("message").textContent =
                "Configuração copiada!";

        })
        .catch(function() {

            document.getElementById("message").textContent =
                "Não foi possível copiar.";

        });
}


/* ========================= */
/* RAVI BOOST */
/* ========================= */

function optimizeGame() {

    const dispositivo =
        document.getElementById("optimizationDevice").value;

    const configs = {

        android: {
            fps: "Alto",
            graphics: "Suave",
            shadows: "Desativadas",
            effects: "Baixo",
            performance: "Alto desempenho",
            connection: "Estável",
            tip: "Feche aplicativos pesados em segundo plano e mantenha espaço livre no aparelho. Isso pode ajudar na estabilidade."
        },

        iphone: {
            fps: "Alto",
            graphics: "Suave",
            shadows: "Desativadas",
            effects: "Baixo",
            performance: "Desempenho",
            connection: "Estável",
            tip: "Feche aplicativos desnecessários e mantenha o sistema atualizado. Evite jogar enquanto o aparelho estiver muito quente."
        },

        emulador: {
            fps: "Alto",
            graphics: "Suave",
            shadows: "Desativadas",
            effects: "Baixo",
            performance: "Alto desempenho",
            connection: "Estável",
            tip: "Feche programas pesados no PC e deixe recursos suficientes para o emulador. Evite downloads durante a partida."
        }

    };

    const config = configs[dispositivo];

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

    document.getElementById("optimizationResult").style.display =
        "block";
}
