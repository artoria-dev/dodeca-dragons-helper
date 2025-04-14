// ==UserScript==
// @name         [DodecaDragons] Automation
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Provides sidebar for DodecaDragons automation
// @author       artoria-dev
// @match        https://demonin.com/games/dodecaDragons/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=demonin.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // config
    const CONFIG = {
        updateInterval: 50,
        defaultStates: {
            // basic
            produceGold: true,
            buyMaxMiners: true,
            dragonUpgrades: true,
            knowledgeMaxAll: true,
            purchaseKnowledgeTrades: true,
            tomeUpgradeBuyMax: true,
            buyMaxTomes: true,

            // magic
            magicUpgradeBuyMax: true,
            darkMagicUpgradeBuyMax: true,

            // fire
            fireMaxAll: true,
            blueFireMaxAll: true,
            holyFireMaxAll: true,

            // alchemy
            platinumConvert: true,
            platinumMaxAll: true,
            uraniumConvert: true,
            uraniumMaxAll: true,
            plutoniumConvert: true,
            plutoniumMaxAll: true,
            buyOganessonUpgrade: true,

            // dragon
            dragonSpendTime: true,
            dragonFeed: true,

            // sigils
            cyanSigils: true,
            blueSigils: true,
            indigoSigils: true,
            violetSigils: true,
            pinkSigils: true,
            maxAllSigilUpgrades: true,
            maxRedSigilUpgrades: true,
            maxOrangeSigilUpgrades: true,
            maxYellowSigilUpgrades: true,

            // planets
            formPlanet: true,
            gainSupercluster: true,

            // cosmic plague
            gainSpore: true,
            plagueMaxAll: true,
            holyUpgradeProfit: true,

            // essences
            lightEssenceMaxAll: true,
            darkEssenceMaxAll: true,
            deathEssenceMaxAll: true,
            finalityEssenceMaxAll: true,

            // pasta
            gainMaxPasta: true,
            buyNuclearPastaUpgrade: true,

            // finality
            gainMaxFinalityCubes: true,
            boostFinality: true
        },

        categories: [{
            name: "Basic Resources",
            icon: "💰",
            color: "#ffd700",
            functions: ["produceGold", "buyMaxMiners", "dragonUpgrades", "knowledgeMaxAll",
                "purchaseKnowledgeTrades", "tomeUpgradeBuyMax", "buyMaxTomes"
            ]
        },
            {
                name: "Magic",
                icon: "✨",
                color: "#9966cc",
                functions: ["magicUpgradeBuyMax", "darkMagicUpgradeBuyMax"],
                extras: [{
                    type: "action",
                    label: "Run Full Magic Challenge Cycle",
                    action: "runFullCycle",
                    tooltip: "Cycles through all magic challenge combinations (~45s)"
                },
                    {
                        type: "action",
                        label: "Run Quick Magic Challenge Cycle",
                        action: "runQuickCycle",
                        tooltip: "Cycles through all magic challenge combinations (~15s)"
                    }
                ]
            },
            {
                name: "Fire",
                icon: "🔥",
                color: "#ff4500",
                functions: ["fireMaxAll", "blueFireMaxAll", "holyFireMaxAll"]
            },
            {
                name: "Alchemy",
                icon: "⚗️",
                color: "#c0c0c0",
                functions: ["platinumConvert", "platinumMaxAll", "uraniumConvert", "uraniumMaxAll",
                    "plutoniumConvert", "plutoniumMaxAll", "buyOganessonUpgrade"
                ]
            },
            {
                name: "Dragon",
                icon: "🐉",
                color: "#228b22",
                functions: ["dragonSpendTime", "dragonFeed"]
            },
            {
                name: "Sigils",
                icon: "🔯",
                color: "#1e90ff",
                functions: ["cyanSigils", "blueSigils", "indigoSigils", "violetSigils", "pinkSigils",
                    "maxAllSigilUpgrades", "maxRedSigilUpgrades", "maxOrangeSigilUpgrades", "maxYellowSigilUpgrades"
                ]
            },
            {
                name: "Planets",
                icon: "🪐",
                color: "#4169e1",
                functions: ["formPlanet", "gainSupercluster"]
            },
            {
                name: "Cosmic Plague",
                icon: "🦠",
                color: "#8b008b",
                functions: ["gainSpore", "plagueMaxAll", "holyUpgradeProfit"]
            },
            {
                name: "Essences",
                icon: "⚡",
                color: "#f08080",
                functions: ["lightEssenceMaxAll", "darkEssenceMaxAll", "deathEssenceMaxAll", "finalityEssenceMaxAll"]
            },
            {
                name: "Pasta",
                icon: "🍝",
                color: "#ffa07a",
                functions: ["gainMaxPasta", "buyNuclearPastaUpgrade"]
            },
            {
                name: "Finality",
                icon: "🔄",
                color: "#4b0082",
                functions: ["gainMaxFinalityCubes", "boostFinality"]
            }
        ]
    };

    // function names for UI display
    const functionLabels = {
        produceGold: "Gold Clicker",
        buyMaxMiners: "Buy Miners",
        dragonUpgrades: "Dragon Upgrades",
        knowledgeMaxAll: "Knowledge",
        purchaseKnowledgeTrades: "Knowledge Trades",
        tomeUpgradeBuyMax: "Tome Upgrades",
        buyMaxTomes: "Tome Convert",
        magicUpgradeBuyMax: "Magic Upgrades",
        darkMagicUpgradeBuyMax: "Dark Magic Upgrades",
        fireMaxAll: "Fire",
        blueFireMaxAll: "Blue Fire",
        holyFireMaxAll: "Holy Fire",
        platinumConvert: "Platinum Convert",
        platinumMaxAll: "Platinum Upgrades",
        uraniumConvert: "Uranium Convert",
        uraniumMaxAll: "Uranium Upgrades",
        plutoniumConvert: "Plutonium Convert",
        plutoniumMaxAll: "Plutonium Upgrades",
        buyOganessonUpgrade: "Oganesson",
        dragonSpendTime: "Spend Dragon Time",
        dragonFeed: "Feed Dragon",
        cyanSigils: "Cyan",
        blueSigils: "Blue",
        indigoSigils: "Indigo",
        violetSigils: "Violet",
        pinkSigils: "Pink",
        maxAllSigilUpgrades: "All (C-B-I-V-P)",
        maxRedSigilUpgrades: "Red",
        maxOrangeSigilUpgrades: "Orange",
        maxYellowSigilUpgrades: "Yellow",
        formPlanet: "Form Planet",
        gainSupercluster: "Super Cluster",
        gainSpore: "Spores",
        plagueMaxAll: "Upgrades",
        holyUpgradeProfit: "Show highest holy profit",
        lightEssenceMaxAll: "Light Essence",
        darkEssenceMaxAll: "Dark Essence",
        deathEssenceMaxAll: "Death Essence",
        finalityEssenceMaxAll: "Finality Essence",
        gainMaxPasta: "Gain Pasta",
        buyNuclearPastaUpgrade: "Pasta Upgrades",
        gainMaxFinalityCubes: "Gain Cubes",
        boostFinality: "Boosts"
    };

    // function tooltips
    const functionTooltips = {
        produceGold: "automatically clicks the gold button",
        buyMaxMiners: "automatically buys max miners",
        dragonUpgrades: "automatically buys dragon upgrades when available",
        knowledgeMaxAll: "automatically maximizes knowledge purchases",
        purchaseKnowledgeTrades: "automatically purchases knowledge trades",
        tomeUpgradeBuyMax: "automatically buys tome upgrades",
        buyMaxTomes: "automatically converts tomes",
        holyUpgradeProfit: "highlights the holy shape with highest profit",
        cyanSigils: "automatically buys cyan sigil upgrades",
    };

    // state management
    let state = {
        isRunningCycle: false,
        isOverlayMinimized: false,
        openCategories: {},
        isDragging: false,
        dragOffsetX: 0,
        dragOffsetY: 0
    };

    function loadSavedStates() {
        const functionNames = Object.keys(CONFIG.defaultStates);
        functionNames.forEach(func => {
            const savedValue = localStorage.getItem(func);
            if (savedValue === null) {
                localStorage.setItem(func, CONFIG.defaultStates[func]);
            }
        });
    }

    function toggleFunction(functionName, newState = null) {
        const currentState = localStorage.getItem(functionName) === 'true';
        const targetState = newState !== null ? newState : !currentState;
        localStorage.setItem(functionName, targetState);
        updateOverlay();
    }

    function toggleAllFunctions(state) {
        Object.keys(CONFIG.defaultStates).forEach(func => {
            localStorage.setItem(func, state);
        });
        updateOverlay();
    }

    // core automation function - executes all enabled automations
    function executeFunctions() {
        const automationGroups = {
            basicResources: () => {
                if (localStorage.getItem('produceGold') === 'true') produceGold();
                if (localStorage.getItem('buyMaxMiners') === 'true') buyMaxMiners();
                if (localStorage.getItem('knowledgeMaxAll') === 'true') knowledgeMaxAll();
                if (localStorage.getItem('tomeUpgradeBuyMax') === 'true') tomeUpgradeBuyMax();
                if (localStorage.getItem('buyMaxTomes') === 'true') buyMaxTomes();
            },

            magic: () => {
                if (localStorage.getItem('magicUpgradeBuyMax') === 'true') magicUpgradeBuyMax();
                if (localStorage.getItem('darkMagicUpgradeBuyMax') === 'true') darkMagicUpgradeBuyMax();
            },

            fire: () => {
                if (localStorage.getItem('fireMaxAll') === 'true') fireMaxAll();
                if (localStorage.getItem('blueFireMaxAll') === 'true') blueFireMaxAll();
                if (localStorage.getItem('holyFireMaxAll') === 'true') holyFireMaxAll();
            },

            alchemy: () => {
                if (localStorage.getItem('platinumMaxAll') === 'true') platinumMaxAll();
                if (localStorage.getItem('uraniumMaxAll') === 'true') uraniumMaxAll();
                if (localStorage.getItem('plutoniumMaxAll') === 'true') plutoniumMaxAll();
                if (localStorage.getItem('platinumConvert') === 'true') platinumConvert();
                if (localStorage.getItem('uraniumConvert') === 'true') uraniumConvert();
                if (localStorage.getItem('plutoniumConvert') === 'true') plutoniumConvert();

                if (localStorage.getItem('buyOganessonUpgrade') === 'true') {
                    for (let i = 7; i >= 1; i--) {
                        buyOganessonUpgrade(i);
                    }
                }
            },

            dragon: () => {
                if (localStorage.getItem('dragonSpendTime') === 'true') dragonSpendTime();
                if (localStorage.getItem('dragonFeed') === 'true') dragonFeed();

                if (localStorage.getItem('dragonUpgrades') === 'true') {
                    const dragonButtons = document.querySelectorAll('.upgradeDragonButton');
                    const visibleButton = Array.from(dragonButtons).find(button =>
                        button.style.display === 'block'
                    );

                    if (visibleButton) {
                        const match = visibleButton.getAttribute('onclick').match(/upgradeDragon\((\d+)\)/);
                        if (match) {
                            const upgradeNumber = parseInt(match[1]);
                            upgradeDragon(upgradeNumber);
                        }
                    }
                }
            },

            sigils: () => {
                if (localStorage.getItem('maxAllSigilUpgrades') === 'true') maxAllSigilUpgrades();
                if (localStorage.getItem('maxRedSigilUpgrades') === 'true') maxRedSigilUpgrades();
                if (localStorage.getItem('maxOrangeSigilUpgrades') === 'true') maxOrangeSigilUpgrades();
                if (localStorage.getItem('maxYellowSigilUpgrades') === 'true') maxYellowSigilUpgrades();

                handleIndividualSigils();
            },

            planets: () => {
                if (localStorage.getItem('formPlanet') === 'true') {
                    for (let i = 1; i <= 3; i++) {
                        formPlanet(i);
                    }
                }

                if (localStorage.getItem('gainSupercluster') === 'true') gainSupercluster();
            },

            plague: () => {
                if (localStorage.getItem('gainSpore') === 'true') gainSpore();
                if (localStorage.getItem('plagueMaxAll') === 'true') plagueMaxAll();

                if (localStorage.getItem('holyUpgradeProfit') === 'true') {
                    holyUpgradeProfit();
                } else {
                    document.getElementById('tab_holyTetrahedrons').style.border = 'none';
                    document.getElementById('tab_holyOctahedrons').style.border = 'none';
                    document.getElementById('tab_holyDodecahedrons').style.border = 'none';
                }
            },

            knowledge: () => {
                if (localStorage.getItem('purchaseKnowledgeTrades') === 'true') {
                    for (let i = 1; i <= 3; i++) {
                        purchaseKnowledgeTrade(i);
                    }

                    for (let i = 4; i >= 1; i--) {
                        buyNuclearPastaUpgrade(i);
                    }
                }
            },

            essences: () => {
                if (localStorage.getItem('lightEssenceMaxAll') === 'true') lightEssenceMaxAll();
                if (localStorage.getItem('darkEssenceMaxAll') === 'true') darkEssenceMaxAll();
                if (localStorage.getItem('deathEssenceMaxAll') === 'true') deathEssenceMaxAll();
                if (localStorage.getItem('finalityEssenceMaxAll') === 'true') finalityEssenceMaxAll();
            },

            pasta: () => {
                if (localStorage.getItem('gainMaxPasta') === 'true') gainMaxPasta();
                if (localStorage.getItem('buyNuclearPastaUpgrade') === 'true') {
                    for (let i = 4; i >= 1; i--) {
                        buyNuclearPastaUpgrade(i);
                    }
                }
            },

            finality: () => {
                if (localStorage.getItem('gainMaxFinalityCubes') === 'true') gainMaxFinalityCubes();
                if (localStorage.getItem('boostFinality') === 'true') {
                    boostFinalityBoosts();
                    boostFinalityCubes();
                }
            }
        };

        Object.values(automationGroups).forEach(groupFunc => groupFunc());
    }

    function handleIndividualSigils() {
        if (localStorage.getItem('cyanSigils') === 'true') {
            const fourth = document.querySelector('.cyanSigilUpgrade:nth-child(4)');
            if (fourth && !fourth.disabled) {
                buyBlueSigilUpgrade(4);
            }
            buyCyanSigilUpgrade(3);
            buyCyanSigilUpgrade(2);
            buyCyanSigilUpgrade(1);
        }

        if (localStorage.getItem('blueSigils') === 'true') {
            const third = document.querySelector('.blueSigilUpgrade:nth-child(3)');
            const fourth = document.querySelector('.blueSigilUpgrade:nth-child(4)');
            if (fourth && !fourth.disabled) {
                buyBlueSigilUpgrade(4);
            }
            if (third && !third.disabled) {
                buyBlueSigilUpgrade(3);
            }
            buyBlueSigilUpgrade(2);
            buyBlueSigilUpgrade(1);
        }

        if (localStorage.getItem('indigoSigils') === 'true') {
            const fourth = document.querySelector('.indigoSigilUpgrade:nth-child(4)');
            if (fourth && !fourth.disabled) {
                buyIndigoSigilUpgrade(4);
            }
            buyIndigoSigilUpgrade(3);
            buyIndigoSigilUpgrade(2);
            buyIndigoSigilUpgrade(1);
        }

        if (localStorage.getItem('violetSigils') === 'true') {
            const fourth = document.querySelector('.violetSigilUpgrade:nth-child(4)');
            const third = document.querySelector('.violetSigilUpgrade:nth-child(3)');
            if (fourth && !fourth.disabled) {
                buyVioletSigilUpgrade(4);
            }
            if (third && !third.disabled) {
                buyVioletSigilUpgrade(3);
            }
            buyVioletSigilUpgrade(2);
            buyVioletSigilUpgrade(1);
        }

        if (localStorage.getItem('pinkSigils') === 'true') {
            const second = document.querySelector('.pinkSigilUpgrade:nth-child(2)');
            const fourth = document.querySelector('.pinkSigilUpgrade:nth-child(4)');
            if (second && !second.disabled) {
                buyPinkSigilUpgrade(2);
            }
            if (fourth && !fourth.disabled) {
                buyPinkSigilUpgrade(4);
            }
            buyPinkSigilUpgrade(3);
            buyPinkSigilUpgrade(1);
        }
    }

    function getChallengeCombinations() {
        const challenges = [1, 2, 3, 4];
        let combinations = [];
        for (let i = 1; i < (1 << challenges.length); i++) {
            let combination = [];
            for (let j = 0; j < challenges.length; j++) {
                if (i & (1 << j)) {
                    combination.push(challenges[j]);
                }
            }
            combinations.push(combination);
        }
        return combinations;
    }

    async function cycleMagicChallenges(time) {
        if (state.isRunningCycle) return;

        state.isRunningCycle = true;
        updateOverlay();

        const combinations = getChallengeCombinations();
        for (const combination of combinations) {
            combination.forEach(challenge => activateMagicChallenge(challenge));
            enterExitMagicChallenges();
            await new Promise(resolve => setTimeout(resolve, time));
            enterExitMagicChallenges();
            dragonFeed();
            combination.forEach(challenge => activateMagicChallenge(challenge));
        }

        state.isRunningCycle = false;
        updateOverlay();
    }

    function holyUpgradeProfit() {
        function parseExponent(value) {
            if (!value) return 0;
            const parts = value.split('e');
            return parts.length > 1 ? parseFloat(parts[1].replace(/,/g, '')) : 0;
        }

        const tetraCurrent = parseExponent(document.getElementById('holyTetrahedrons')?.innerHTML);
        const tetraToGet = parseExponent(document.getElementById('holyTetrahedronsToGet')?.innerHTML);
        const octaCurrent = parseExponent(document.getElementById('holyOctahedrons')?.innerHTML);
        const octaToGet = parseExponent(document.getElementById('holyOctahedronsToGet')?.innerHTML);
        const dodecaCurrent = parseExponent(document.getElementById('holyDodecahedrons')?.innerHTML);
        const dodecaToGet = parseExponent(document.getElementById('holyDodecahedronsToGet')?.innerHTML);

        const tetraDiff = tetraToGet > tetraCurrent ? tetraToGet - tetraCurrent : -Infinity;
        const octaDiff = octaToGet > octaCurrent ? octaToGet - octaCurrent : -Infinity;
        const dodecaDiff = dodecaToGet > dodecaCurrent ? dodecaToGet - dodecaCurrent : -Infinity;

        const maxDiff = Math.max(tetraDiff, octaDiff, dodecaDiff);

        const elements = [
            document.getElementById('tab_holyTetrahedrons'),
            document.getElementById('tab_holyOctahedrons'),
            document.getElementById('tab_holyDodecahedrons')
        ];

        elements.forEach(el => {
            if (el) el.style.border = '';
        });

        if (maxDiff > -Infinity) {
            if (maxDiff === tetraDiff && elements[0]) {
                elements[0].style.border = '5px solid red';
            } else if (maxDiff === octaDiff && elements[1]) {
                elements[1].style.border = '5px solid red';
            } else if (maxDiff === dodecaDiff && elements[2]) {
                elements[2].style.border = '5px solid red';
            }
        }
    }

    // ui creation
    function createStyles() {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
        #dd-automation-overlay {
            position: fixed;
            top: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 10px;
            border-radius: 8px;
            font-family: 'Arial', sans-serif;
            z-index: 10000;
            width: 280px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            transition: height 0.3s ease, opacity 0.3s ease;
            max-height: 90vh;
            overflow-y: auto;
            user-select: none;
        }

        #dd-automation-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            cursor: move;
            padding-bottom: 5px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        #dd-automation-title {
            font-weight: bold;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        #dd-automation-controls {
            display: flex;
            gap: 10px;
        }

        .dd-control-button {
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
            font-size: 16px;
        }

        .dd-control-button:hover {
            opacity: 1;
        }

        .dd-category {
            margin-top: 10px;
            border-radius: 6px;
            overflow: hidden;
            border-left: 3px solid transparent;
            transition: border-color 0.3s;
        }

        .dd-category-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 10px;
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.1);
            transition: background-color 0.2s;
        }

        .dd-category-header:hover {
            background-color: rgba(255, 255, 255, 0.15);
        }

        .dd-category-title {
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .dd-category-icon {
            font-size: 16px;
        }

        .dd-category-arrow {
            transition: transform 0.3s;
        }

        .dd-category-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            background-color: rgba(0, 0, 0, 0.2);
        }

        .dd-category.open .dd-category-content {
            max-height: 500px;
            padding: 8px 10px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .dd-category.open .dd-category-arrow {
            transform: rotate(90deg);
        }

        .dd-function-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
            padding: 4px 0;
            position: relative;
        }

        .dd-function-label {
            flex-grow: 1;
            font-size: 14px;
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        .dd-function-row:hover {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
        }

        .dd-toggle {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
        }

        .dd-toggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .dd-toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #555;
            transition: .4s;
            border-radius: 20px;
        }

        .dd-toggle-slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }

        input:checked + .dd-toggle-slider {
            background-color: #4CAF50;
        }

        input:focus + .dd-toggle-slider {
            box-shadow: 0 0 1px #4CAF50;
        }

        input:checked + .dd-toggle-slider:before {
            transform: translateX(20px);
        }

        .dd-global-actions {
            display: flex;
            gap: 10px;
            margin: 10px 0;
            justify-content: space-between;
        }

        .dd-global-button {
            padding: 6px 10px;
            border-radius: 4px;
            border: none;
            background-color: #555;
            color: white;
            cursor: pointer;
            font-size: 12px;
            transition: background-color 0.2s;
            text-align: center;
            flex: 1;
        }

        .dd-global-button:hover {
            background-color: #666;
        }

        .dd-global-button.enable-all {
            background-color: #4CAF50;
        }

        .dd-global-button.disable-all {
            background-color: #f44336;
        }

        .dd-global-button.enable-all:hover {
            background-color: #45a049;
        }

        .dd-global-button.disable-all:hover {
            background-color: #d32f2f;
        }

        .dd-action-button {
            padding: 6px 10px;
            border-radius: 4px;
            border: none;
            background-color: #4169e1;
            color: white;
            cursor: pointer;
            font-size: 12px;
            transition: background-color 0.2s;
            text-align: center;
            margin-top: 5px;
            width: 100%;
        }

        .dd-action-button:hover {
            background-color: #3a5fcd;
        }

        .dd-tooltip {
            position: absolute;
            background-color: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 5px 8px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 10001;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s;
            max-width: 250px;
            left: 50%;
            transform: translateX(-50%);
            bottom: 100%;
            margin-bottom: 5px;
        }

        .dd-function-row:hover .dd-tooltip {
            opacity: 1;
        }

        #dd-automation-overlay.minimized {
            height: 30px;
            overflow: hidden;
            opacity: 0.5;
            width: auto;
            padding: 5px 10px;
        }

        #dd-automation-overlay.minimized #dd-automation-content {
            display: none;
        }
    `;
        document.head.appendChild(styleEl);
    }

    function createOverlay() {
        const existingOverlay = document.getElementById('dd-automation-overlay');
        if (existingOverlay) existingOverlay.remove();

        const overlay = document.createElement('div');
        overlay.id = 'dd-automation-overlay';

        overlay.innerHTML = `
        <div id="dd-automation-header">
            <div id="dd-automation-title">
                <span>DodecaDragons Automation</span>
            </div>
            <div id="dd-automation-controls">
                <span class="dd-control-button minimize-btn" title="Minimize">−</span>
                <span class="dd-control-button close-btn" title="Close">×</span>
            </div>
        </div>
        <div id="dd-automation-content">
            <div class="dd-global-actions">
                <button class="dd-global-button enable-all" title="Enable all functions">Enable All</button>
                <button class="dd-global-button disable-all" title="Disable all functions">Disable All</button>
            </div>
            ${generateCategoryHTML()}
        </div>
    `;

        document.body.appendChild(overlay);

        setupOverlayEventListeners();
        updateOverlay();
    }

    function generateCategoryHTML() {
        return CONFIG.categories.map(category => {
            const isOpen = state.openCategories[category.name] !== false;
            const functionsHTML = category.functions.map(func => {
                const isActive = localStorage.getItem(func) === 'true';
                const tooltip = functionTooltips[func] ? `<div class="dd-tooltip">${functionTooltips[func]}</div>` : '';

                return `
                <div class="dd-function-row">
                    <label class="dd-function-label" for="${func}-toggle">
                        ${functionLabels[func] || func}
                        ${tooltip}
                    </label>
                    <label class="dd-toggle">
                        <input type="checkbox" id="${func}-toggle" ${isActive ? 'checked' : ''}>
                        <span class="dd-toggle-slider"></span>
                    </label>
                </div>
            `;
            }).join('');

            const extrasHTML = category.extras ? category.extras.map(extra => {
                if (extra.type === 'action') {
                    return `<button class="dd-action-button" data-action="${extra.action}" title="${extra.tooltip || ''}">${extra.label}</button>`;
                }
                return '';
            }).join('') : '';

            return `
            <div class="dd-category ${isOpen ? 'open' : ''}" style="border-left-color: ${category.color}">
                <div class="dd-category-header">
                    <div class="dd-category-title">
                        <span class="dd-category-icon">${category.icon}</span>
                        <span>${category.name}</span>
                    </div>
                    <span class="dd-category-arrow">›</span>
                </div>
                <div class="dd-category-content">
                    ${functionsHTML}
                    ${extrasHTML}
                </div>
            </div>
        `;
        }).join('');
    }

    function setupOverlayEventListeners() {
        const overlay = document.getElementById('dd-automation-overlay');
        if (!overlay) return;

        overlay.querySelector('.minimize-btn')?.addEventListener('click', () => {
            state.isOverlayMinimized = !state.isOverlayMinimized;
            overlay.classList.toggle('minimized', state.isOverlayMinimized);
        });

        overlay.querySelector('.close-btn')?.addEventListener('click', () => {
            state.isOverlayMinimized = true;
            overlay.classList.add('minimized');
        });

        overlay.querySelector('.enable-all')?.addEventListener('click', () => {
            toggleAllFunctions('true');
        });

        overlay.querySelector('.disable-all')?.addEventListener('click', () => {
            toggleAllFunctions('false');
        });

        overlay.querySelectorAll('.dd-category-header').forEach(header => {
            header.addEventListener('click', () => {
                const category = header.closest('.dd-category');
                const categoryName = header.querySelector('.dd-category-title span').textContent;
                state.openCategories[categoryName] = !category.classList.contains('open');
                category.classList.toggle('open');
            });
        });

        overlay.querySelectorAll('.dd-toggle input').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const functionName = e.target.id.replace('-toggle', '');
                toggleFunction(functionName, e.target.checked);
            });
        });

        overlay.querySelectorAll('.dd-action-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                if (action === 'runFullCycle') {
                    cycleMagicChallenges(3000);
                } else if (action === 'runQuickCycle') {
                    cycleMagicChallenges(1000);
                }
            });
        });
    }

    function updateOverlay() {
        const overlay = document.getElementById('dd-automation-overlay');
        if (!overlay) return;

        Object.keys(CONFIG.defaultStates).forEach(func => {
            const toggle = overlay.querySelector(`#${func}-toggle`);
            if (toggle) {
                toggle.checked = localStorage.getItem(func) === 'true';
            }
        });

        const allOn = Object.keys(CONFIG.defaultStates).every(func => localStorage.getItem(func) === 'true');
        const allOff = Object.keys(CONFIG.defaultStates).every(func => localStorage.getItem(func) === 'false');

        const enableAllBtn = overlay.querySelector('.enable-all');
        const disableAllBtn = overlay.querySelector('.disable-all');

        if (enableAllBtn) {
            enableAllBtn.disabled = allOn;
            enableAllBtn.classList.toggle('active', allOn);
        }
        if (disableAllBtn) {
            disableAllBtn.disabled = allOff;
            disableAllBtn.classList.toggle('active', allOff);
        }
    }

    function setupDragListeners() {
        const overlay = document.getElementById('dd-automation-overlay');
        const header = document.getElementById('dd-automation-header');

        if (!overlay || !header) return;

        header.addEventListener('mousedown', (e) => {
            if (e.target !== header && !header.contains(e.target)) return;

            state.isDragging = true;
            const rect = overlay.getBoundingClientRect();
            state.dragOffsetX = e.clientX - rect.left;
            state.dragOffsetY = e.clientY - rect.top;
            overlay.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!state.isDragging) return;

            overlay.style.left = `${e.clientX - state.dragOffsetX}px`;
            overlay.style.top = `${e.clientY - state.dragOffsetY}px`;
            overlay.style.right = 'auto';
        });

        document.addEventListener('mouseup', () => {
            if (state.isDragging) {
                state.isDragging = false;
                overlay.style.cursor = '';
            }
        });
    }

    loadSavedStates();
    createStyles();
    createOverlay();
    setInterval(executeFunctions, CONFIG.updateInterval);
    setupDragListeners();
})();