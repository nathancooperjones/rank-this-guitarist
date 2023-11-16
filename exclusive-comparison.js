import { endGuitaristComparison, fetchGuitaristsData, loadImage, showPopup, score, updateScore } from './utils.js';

let isFirstPopup = true;

const renderGuitaristInfo = (guitarist, index) => `
    <div>
        <h2>${guitarist.name}</h2>
        ${guitarist.imageUrl ? `<img id="guitaristImage${index}" alt="${guitarist.name}" style="max-width: 100%; height: auto;">` : ''}
    </div>
`;

const loadGuitaristImage = (guitarist, index) => {
    if (guitarist.imageUrl) {
        const imgElement = document.getElementById(`guitaristImage${index}`);
        loadImage(imgElement, guitarist.imageUrl);
    }
};

const showRandomGuitarists = (guitaristsRollingStones, guitaristsChatGPT) => {
    if (guitaristsRollingStones.length === 0 || guitaristsChatGPT.length === 0) {
        endGuitaristComparison();
        return;
    }

    const getRandomIndex = arrayLength => Math.floor(Math.random() * arrayLength);
    const index1 = getRandomIndex(guitaristsRollingStones.length);
    const index2 = getRandomIndex(guitaristsChatGPT.length);
    const guitarist1 = guitaristsRollingStones[index1];
    const guitarist2 = guitaristsChatGPT[index2];

    const infoDiv = document.getElementById('guitarist-info-comparison');
    const choicesDiv = document.getElementById('choices');
    const swap = Math.random() < 0.5;

    infoDiv.innerHTML = swap ? renderGuitaristInfo(guitarist2, 2) + renderGuitaristInfo(guitarist1, 1) : renderGuitaristInfo(guitarist1, 1) + renderGuitaristInfo(guitarist2, 2);

    loadGuitaristImage(guitarist1, 1);
    loadGuitaristImage(guitarist2, 2);

    choicesDiv.innerHTML = `
        <button onclick="handleUserChoice('${swap ? 'chatGPT' : 'rollingStones'}', ${index1}, ${index2})">${swap ? guitarist2.name : guitarist1.name}</button>
        <button onclick="handleUserChoice('${swap ? 'rollingStones' : 'chatGPT'}', ${index1}, ${index2})">${swap ? guitarist1.name : guitarist2.name}</button>
    `;
};

const handleUserChoice = (list, index1, index2, guitaristsRollingStones, guitaristsChatGPT) => {
    score[list]++;
    updateScore('score');

    let chosenGuitaristRank;
    if (list === 'rollingStones') {
        chosenGuitaristRank = guitaristsRollingStones[index1].rollingStonesRank;
    } else {
        chosenGuitaristRank = guitaristsChatGPT[index2].chatGPTRank;
    }

    const listName = list === 'rollingStones' ? "Rolling Stone's" : "ChatGPT's";
    let popupMessage = `You chose ${listName} list, ranked at #${chosenGuitaristRank}!`;

    if (isFirstPopup) {
        popupMessage += " Click anywhere to continue.";
        isFirstPopup = false;
    }

    showPopup(popupMessage, () => {
        if (list === 'rollingStones') {
            guitaristsRollingStones.splice(index1, 1);
        } else {
            guitaristsChatGPT.splice(index2, 1);
        }
        showRandomGuitarists(guitaristsRollingStones, guitaristsChatGPT);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    fetchGuitaristsData('data/guitarists.json', (guitarists) => {
        const guitaristsRollingStones = guitarists.filter(g => g.rollingStonesRank && !g.chatGPTRank);
        const guitaristsChatGPT = guitarists.filter(g => !g.rollingStonesRank && g.chatGPTRank);

        window.handleUserChoice = (list, index1, index2) => handleUserChoice(list, index1, index2, guitaristsRollingStones, guitaristsChatGPT);

        updateScore('score');
        showRandomGuitarists(guitaristsRollingStones, guitaristsChatGPT);
    });
});
