// ==UserScript==
// @name         [DodecaDragons] Automation
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Provides sidebar for automation
// @author       artoria-dev
// @match        https://demonin.com/games/dodecaDragons/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=demonin.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function toggleFunction(functionName, state = null) {
        const currentState = localStorage.getItem(functionName);
        const newState = state !== null ? state : (currentState === 'true' ? 'false' : 'true');
        localStorage.setItem(functionName, newState);
        updateOverlay();
    }

    function executeFunctions() {
        if (localStorage.getItem('produceGold') === 'true') produceGold();
        if (localStorage.getItem('buyMaxMiners') === 'true') buyMaxMiners();
        if (localStorage.getItem('fireMaxAll') === 'true') fireMaxAll();
        if (localStorage.getItem('blueFireMaxAll') === 'true') blueFireMaxAll();
        if (localStorage.getItem('magicUpgradeBuyMax') === 'true') magicUpgradeBuyMax();
        if (localStorage.getItem('darkMagicUpgradeBuyMax') === 'true') darkMagicUpgradeBuyMax();
        if (localStorage.getItem('platinumMaxAll') === 'true') platinumMaxAll();
        if (localStorage.getItem('uraniumMaxAll') === 'true') uraniumMaxAll();
        if (localStorage.getItem('plutoniumMaxAll') === 'true') plutoniumMaxAll();
        if (localStorage.getItem('platinumConvert') === 'true') platinumConvert();
        if (localStorage.getItem('uraniumConvert') === 'true') uraniumConvert();
        if (localStorage.getItem('plutoniumConvert') === 'true') plutoniumConvert();
        if (localStorage.getItem('dragonSpendTime') === 'true') dragonSpendTime();
        if (localStorage.getItem('dragonFeed') === 'true') dragonFeed();
        if (localStorage.getItem('knowledgeMaxAll') === 'true') knowledgeMaxAll();
        if (localStorage.getItem('tomeUpgradeBuyMax') === 'true') tomeUpgradeBuyMax();
        if (localStorage.getItem('maxAllSigilUpgrades') === 'true') maxAllSigilUpgrades();
        if (localStorage.getItem('maxRedSigilUpgrades') === 'true') maxRedSigilUpgrades();
        if (localStorage.getItem('maxOrangeSigilUpgrades') === 'true') maxOrangeSigilUpgrades();
        if (localStorage.getItem('maxYellowSigilUpgrades') === 'true') maxYellowSigilUpgrades();
        if (localStorage.getItem('holyFireMaxAll') === 'true') holyFireMaxAll();

        if (localStorage.getItem('formPlanet') === 'true') {
            formPlanet(1);
            formPlanet(2);
            formPlanet(3);
        }
        if (localStorage.getItem('gainSupercluster') === 'true') gainSupercluster();

        if (localStorage.getItem('purchaseKnowledgeTrades') === 'true') {
            purchaseKnowledgeTrade(1);
            purchaseKnowledgeTrade(2);
            purchaseKnowledgeTrade(3);
        }
        if (localStorage.getItem('gainSpore') === 'true') gainSpore();
        if (localStorage.getItem('plagueMaxAll') === 'true') plagueMaxAll();
        if (localStorage.getItem('holyUpgradeProfit') === 'true') {
            holyUpgradeProfit();
        } else {
            document.getElementById('tab_holyTetrahedrons').style.border = 'none';
            document.getElementById('tab_holyOctahedrons').style.border = 'none';
            document.getElementById('tab_holyDodecahedrons').style.border = 'none';
        }

        if (localStorage.getItem('buyOganessonUpgrade') === 'true') {
            buyOganessonUpgrade(7);
            buyOganessonUpgrade(6);
            buyOganessonUpgrade(5);
            buyOganessonUpgrade(4);
            buyOganessonUpgrade(3);
            buyOganessonUpgrade(2);
            buyOganessonUpgrade(1);
        }
        if (localStorage.getItem('lightEssenceMaxAll') === 'true') lightEssenceMaxAll();
        if (localStorage.getItem('darkEssenceMaxAll') === 'true') darkEssenceMaxAll();
        if (localStorage.getItem('deathEssenceMaxAll') === 'true') deathEssenceMaxAll();

        if (localStorage.getItem('gainMaxPasta') === 'true') gainMaxPasta();
        if (localStorage.getItem('purchaseKnowledgeTrades') === 'true') {
            buyNuclearPastaUpgrade(4);
            buyNuclearPastaUpgrade(3);
            buyNuclearPastaUpgrade(2);
            buyNuclearPastaUpgrade(1);
        }
        if (localStorage.getItem('finalityEssenceMaxAll') === 'true') finalityEssenceMaxAll();
        if (localStorage.getItem('gainMaxFinalityCubes') === 'true') gainMaxFinalityCubes();
        if (localStorage.getItem('boostFinality') === 'true') {
            boostFinalityBoosts();
            boostFinalityCubes();
        }
    }

    const functions = {
        produceGold: 'true',
        buyMaxMiners: 'true',
        fireMaxAll: 'true',
        blueFireMaxAll: 'true',
        magicUpgradeBuyMax: 'true',
        darkMagicUpgradeBuyMax: 'true',
        platinumMaxAll: 'true',
        uraniumMaxAll: 'true',
        plutoniumMaxAll: 'true',
        platinumConvert: 'true',
        uraniumConvert: 'true',
        plutoniumConvert: 'true',
        dragonSpendTime: 'true',
        dragonFeed: 'true',
        cyanSigils: 'true',
        maxAllSigilUpgrades: 'true',
        maxRedSigilUpgrades: 'true',
        maxOrangeSigilUpgrades: 'true',
        maxYellowSigilUpgrades: 'true',
        knowledgeMaxAll: 'true',
        tomeUpgradeBuyMax: 'true',
        purchaseKnowledgeTrades: 'true',
        holyFireMaxAll: 'true',
        formPlanet: 'true',
        gainSupercluster: 'true',
        gainSpore: 'true',
        plagueMaxAll: 'true',
        holyUpgradeProfit: 'true',
        buyOganessonUpgrade: 'true',
        lightEssenceMaxAll: 'true',
        darkEssenceMaxAll: 'true',
        deathEssenceMaxAll: 'true',
        gainMaxPasta: 'true',
        buyNuclearPastaUpgrade: 'true',
        finalityEssenceMaxAll: 'true',
        gainMaxFinalityCubes: 'true',
        boostFinality: 'true'
    };

    Object.keys(functions).forEach(func => {
        if (localStorage.getItem(func) === null) {
            localStorage.setItem(func, functions[func]);
        }
    });

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

    async function cycleMagicChallenges() {
        const combinations = getChallengeCombinations();
        for (const combination of combinations) {
            combination.forEach(challenge => activateMagicChallenge(challenge));
            enterExitMagicChallenges();
            await new Promise(resolve => setTimeout(resolve, 3000));
            enterExitMagicChallenges();
            combination.forEach(challenge => activateMagicChallenge(challenge));
        }
    }

    function holyUpgradeProfit() {
        // helper func
        function parseExponent(value) {
            return parseFloat(value.split('e')[1].replace(/,/g, ''));
        }
        var tetra_current = parseExponent(document.getElementById('holyTetrahedrons').innerHTML);
        var tetra_to_get = parseExponent(document.getElementById('holyTetrahedronsToGet').innerHTML);
        var octa_current = parseExponent(document.getElementById('holyOctahedrons').innerHTML);
        var octa_to_get = parseExponent(document.getElementById('holyOctahedronsToGet').innerHTML);
        var dodeca_current = parseExponent(document.getElementById('holyDodecahedrons').innerHTML);
        var dodeca_to_get = parseExponent(document.getElementById('holyDodecahedronsToGet').innerHTML);

        var tetra_diff = tetra_to_get > tetra_current ? tetra_to_get - tetra_current : -Infinity;
        var octa_diff = octa_to_get > octa_current ? octa_to_get - octa_current : -Infinity;
        var dodeca_diff = dodeca_to_get > dodeca_current ? dodeca_to_get - dodeca_current : -Infinity;

        var max_diff = Math.max(tetra_diff, octa_diff, dodeca_diff);

        document.getElementById('tab_holyTetrahedrons').style.border = '';
        document.getElementById('tab_holyOctahedrons').style.border = '';
        document.getElementById('tab_holyDodecahedrons').style.border = '';

        if (max_diff > -Infinity) {
            if (max_diff === tetra_diff) {
                document.getElementById('tab_holyTetrahedrons').style.border = '5px solid red';
            } else if (max_diff === octa_diff) {
                document.getElementById('tab_holyOctahedrons').style.border = '5px solid red';
            } else if (max_diff === dodeca_diff) {
                document.getElementById('tab_holyDodecahedrons').style.border = '5px solid red';
            }
        }
    }


    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'tm-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '10px';
        overlay.style.right = '10px';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.color = 'white';
        overlay.style.padding = '10px';
        overlay.style.borderRadius = '5px';
        overlay.style.zIndex = '10000';
        overlay.style.fontFamily = 'Arial, sans-serif';
        document.body.appendChild(overlay);
        updateOverlay();
    }

    function updateOverlay() {
        const overlay = document.getElementById('tm-overlay');
        const allFunctions = [
            'produceGold',
            'buyMaxMiners',
            'fireMaxAll',
            'blueFireMaxAll',
            'magicUpgradeBuyMax',
            'darkMagicUpgradeBuyMax',
            'platinumMaxAll',
            'uraniumMaxAll',
            'plutoniumMaxAll',
            'platinumConvert',
            'uraniumConvert',
            'plutoniumConvert',
            'dragonSpendTime',
            'dragonFeed',
            'maxAllSigilUpgrades',
            'maxRedSigilUpgrades',
            'maxOrangeSigilUpgrades',
            'maxYellowSigilUpgrades',
            'knowledgeMaxAll',
            'tomeUpgradeBuyMax',
            'purchaseKnowledgeTrades',
            'holyFireMaxAll',
            'formPlanet',
            'gainSupercluster',
            'gainSpore',
            'plagueMaxAll',
            'buyOganessonUpgrade',
            'lightEssenceMaxAll',
            'darkEssenceMaxAll',
            'deathEssenceMaxAll',
            'gainMaxPasta',
            'buyNuclearPastaUpgrade',
            'finalityEssenceMaxAll',
            'gainMaxFinalityCubes',
            'boostFinality'
        ];
        const allOn = allFunctions.every(func => localStorage.getItem(func) === 'true');

        function getToggleText(funcName) {
            const isEnabled = localStorage.getItem(funcName) === 'true';
            const color = isEnabled ? 'green' : 'red';
            return `<span style="color: ${color};">${isEnabled ? 'ON' : 'OFF'}</span>`;
        }

        overlay.innerHTML = `
        <div style="cursor: default;">
            <strong>Keybinds</strong><br>
            <span class="tm-toggle-all" data-function="toggleAll" style="cursor: pointer">${allOn ? 'Disable All' : 'Enable All'}</span><br>
            <small>(use with caution)</small><br><br>
            <div style="margin-top: 0px; border-top: 1px solid white; padding-top: 10px;">
                <strong class="tm-category-title" style="cursor: pointer;">Upgrader (and other stuff)</strong><br>
                <div class="tm-category-content">
                    <span class="tm-toggle" data-function="produceGold" style="cursor: pointer">>Gold Clicker (${getToggleText('produceGold')})</span><br>
                    <span class="tm-toggle" data-function="buyMaxMiners" style="cursor: pointer">>Buy Miners (${getToggleText('buyMaxMiners')})</span><br>
                    <span class="tm-toggle" data-function="magicUpgradeBuyMax" style="cursor: pointer">>Magic Upgrades (${getToggleText('magicUpgradeBuyMax')})</span><br>
                    <span class="tm-toggle" data-function="darkMagicUpgradeBuyMax" style="cursor: pointer">>Dark Magic Upgrades (${getToggleText('darkMagicUpgradeBuyMax')})</span><br>
                    <span class="tm-toggle" data-function="knowledgeMaxAll" style="cursor: pointer">>Knowledge (${getToggleText('knowledgeMaxAll')})</span><br>
                    <span class="tm-toggle" data-function="tomeUpgradeBuyMax" style="cursor: pointer">>Tome (${getToggleText('tomeUpgradeBuyMax')})</span><br>
                    <span class="tm-toggle" data-function="purchaseKnowledgeTrades" style="cursor: pointer">>Knowledge Trades (${getToggleText('purchaseKnowledgeTrades')})</span><br>
                </div>
            </div>
            <div style="margin-top: 10px; border-top: 1px solid white; padding-top: 10px;">
                <strong class="tm-category-title" style="cursor: pointer;">Fire</strong><br>
                <div class="tm-category-content">
                    <span class="tm-toggle" data-function="fireMaxAll" style="cursor: pointer">>Fire (${getToggleText('fireMaxAll')})</span><br>
                    <span class="tm-toggle" data-function="blueFireMaxAll" style="cursor: pointer">>Blue Fire (${getToggleText('blueFireMaxAll')})</span><br>
                    <span class="tm-toggle" data-function="holyFireMaxAll" style="cursor: pointer">>Holy Fire (${getToggleText('holyFireMaxAll')})</span><br>
                </div>
            </div>
            <div style="margin-top: 10px; border-top: 1px solid white; padding-top: 10px;">
                <strong class="tm-category-title" style="cursor: pointer;">Alchemy</strong><br>
                <div class="tm-category-content">
                    <span class="tm-toggle" data-function="platinumConvert" style="cursor: pointer">>Platinum Convert (${getToggleText('platinumConvert')})</span><br>
                    <span class="tm-toggle" data-function="uraniumConvert" style="cursor: pointer">>Uranium Convert (${getToggleText('uraniumConvert')})</span><br>
                    <span class="tm-toggle" data-function="plutoniumConvert" style="cursor: pointer">>Plutonium Convert (${getToggleText('plutoniumConvert')})</span><br>
                    <span class="tm-toggle" data-function="platinumMaxAll" style="cursor: pointer">>Platinum Upgrades (${getToggleText('platinumMaxAll')})</span><br>
                    <span class="tm-toggle" data-function="uraniumMaxAll" style="cursor: pointer">>Uranium Upgrades (${getToggleText('uraniumMaxAll')})</span><br>
                    <span class="tm-toggle" data-function="plutoniumMaxAll" style="cursor: pointer">>Plutonium Upgrades (${getToggleText('plutoniumMaxAll')})</span><br>
                    <span class="tm-toggle" data-function="buyOganessonUpgrade" style="cursor: pointer">>Oganesson (${getToggleText('buyOganessonUpgrade')})</span><br>
                </div>
            </div>
            <div style="margin-top: 10px; border-top: 1px solid white; padding-top: 10px;">
                <strong class="tm-category-title" style="cursor: pointer;">Dragon</strong><br>
                <div class="tm-category-content">
                    <span class="tm-toggle" data-function="dragonSpendTime" style="cursor: pointer">>Spend Dragon Time (${getToggleText('dragonSpendTime')})</span><br>
                    <span class="tm-toggle" data-function="dragonFeed" style="cursor: pointer">>Feed Dragon (${getToggleText('dragonFeed')})</span><br>
                </div>
            </div>
            <div style="margin-top: 10px; border-top: 1px solid white; padding-top: 10px;">
                <strong>Magic Challenge</strong><br>
                <span class="tm-magic-challenge" style="cursor: pointer;">>Run Full Magic Challenge Cycle</span><br>
                <small>(takes about 45 seconds)</small><br>
            </div>
            <div style="margin-top: 10px; border-top: 1px solid white; padding-top: 10px;">
                <strong class="tm-category-title" style="cursor: pointer;">Sigils</strong><br>
                <div class="tm-category-content">
                    <span class="tm-toggle" data-function="maxAllSigilUpgrades" style="cursor: pointer;">>All (C-B-I-V-P) (${getToggleText('maxAllSigilUpgrades')})</span><br>
                    <span class="tm-toggle" data-function="maxRedSigilUpgrades" style="cursor: pointer;">>Red (${getToggleText('maxRedSigilUpgrades')})</span><br>
                    <span class="tm-toggle" data-function="maxOrangeSigilUpgrades" style="cursor: pointer;">>Orange (${getToggleText('maxOrangeSigilUpgrades')})</span><br>
                    <span class="tm-toggle" data-function="maxYellowSigilUpgrades" style="cursor: pointer;">>Yellow (${getToggleText('maxYellowSigilUpgrades')})</span><br>
                </div>
            </div>
            <div style="margin-top: 10px; border-top: 1px solid white; padding-top: 10px;">
                <strong class="tm-category-title" style="cursor: pointer;">Planets</strong><br>
                <div class="tm-category-content">
                    <span class="tm-toggle" data-function="formPlanet" style="cursor: pointer;">>Form Planet (${getToggleText('formPlanet')})</span><br>
                    <span class="tm-toggle" data-function="gainSupercluster" style="cursor: pointer;">>Super Cluster (${getToggleText('gainSupercluster')})</span><br>
                </div>
            </div>
            <div style="margin-top: 10px; border-top: 1px solid white; padding-top: 10px;">
                <strong class="tm-category-title" style="cursor: pointer;">Cosmic Plague</strong><br>
                <div class="tm-category-content">
                    <span class="tm-toggle" data-function="gainSpore" style="cursor: pointer;">>Spores (${getToggleText('gainSpore')})</span><br>
                    <span class="tm-toggle" data-function="plagueMaxAll" style="cursor: pointer;">>Upgrades (${getToggleText('plagueMaxAll')})</span><br>
                    <span class="tm-toggle" data-function="holyUpgradeProfit" style="cursor: pointer;">>Show highest holy profit (${getToggleText('holyUpgradeProfit')})</span><br>
                </div>
            </div>
            <div style="margin-top: 10px; border-top: 1px solid white; padding-top: 10px;">
                <strong class="tm-category-title" style="cursor: pointer;">Essences</strong><br>
                <div class="tm-category-content">
                    <span class="tm-toggle" data-function="lightEssenceMaxAll" style="cursor: pointer">>Light Essence (${getToggleText('lightEssenceMaxAll')})</span><br>
                    <span class="tm-toggle" data-function="darkEssenceMaxAll" style="cursor: pointer">>Dark Essence (${getToggleText('darkEssenceMaxAll')})</span><br>
                    <span class="tm-toggle" data-function="deathEssenceMaxAll" style="cursor: pointer">>Death Essence (${getToggleText('deathEssenceMaxAll')})</span><br>
                    <span class="tm-toggle" data-function="finalityEssenceMaxAll" style="cursor: pointer">>Finality Essence (${getToggleText('finalityEssenceMaxAll')})</span><br>
                </div>
            </div>
            <div style="margin-top: 10px; border-top: 1px solid white; padding-top: 10px;">
            <strong class="tm-category-title" style="cursor: pointer;">Pasta</strong><br>
                <div class="tm-category-content">
                    <span class="tm-toggle" data-function="gainMaxPasta" style="cursor: pointer">>Gain Pasta (${getToggleText('gainMaxPasta')})</span><br>
                    <span class="tm-toggle" data-function="buyNuclearPastaUpgrade" style="cursor: pointer">>Upgrades (${getToggleText('buyNuclearPastaUpgrade')})</span><br>
                </div>
            </div>
            <div style="margin-top: 10px; border-top: 1px solid white; padding-top: 10px;">
            <strong class="tm-category-title" style="cursor: pointer;">Finality Cubes</strong><br>
                <div class="tm-category-content">
                    <span class="tm-toggle" data-function="gainMaxFinalityCubes" style="cursor: pointer">>Gain Cubes (${getToggleText('gainMaxFinalityCubes')})</span><br>
                    <span class="tm-toggle" data-function="boostFinality" style="cursor: pointer">>Boosts (${getToggleText('boostFinality')})</span><br>
                </div>
            </div>
        </div>
        `;

        document.querySelectorAll('.tm-category-title').forEach(function(element) {
            element.addEventListener('click', function() {
            const contentDiv = this.nextElementSibling.nextElementSibling;
            if (contentDiv.style.display === 'none') {
                contentDiv.style.display = 'block';
            } else {
                contentDiv.style.display = 'none';
            }
            });
        });

        document.querySelectorAll('.tm-category-content').forEach(function(content) {
            content.style.display = 'block';
        });

        document.querySelectorAll('.tm-toggle').forEach(function(element) {
            element.addEventListener('click', function() {
                const functionName = this.getAttribute('data-function');
                toggleFunction(functionName);
            });
        });

        document.querySelectorAll('.tm-toggle-buy-x').forEach(function(element) {
            element.addEventListener('click', function() {
                const functionName = this.getAttribute('data-function');
                toggleFunction(functionName);
            });
        });

        document.querySelector('.tm-toggle-all').addEventListener('click', function() {
            const newState = allOn ? 'false' : 'true';
            allFunctions.forEach(func => toggleFunction(func, newState));
        });

        document.querySelector('.tm-magic-challenge').addEventListener('click', function() {
            cycleMagicChallenges(3000);
        });
    }

    setInterval(executeFunctions, 10);
    createOverlay();
})();
