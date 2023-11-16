import { endGuitaristComparison, fetchGuitaristsData, loadImage, showPopup, score, updateScore } from './utils.js';

let isFirstPopup = true;

const showRandomGuitarist = (guitaristsBothLists) => {
    while (guitaristsBothLists.length > 0) {
        const index = Math.floor(Math.random() * guitaristsBothLists.length);
        const guitarist = guitaristsBothLists[index];

        if (guitarist.rollingStonesRank !== guitarist.chatGPTRank) {
            renderGuitaristInfo(guitarist, index);
            break;
        } else {
            guitaristsBothLists.splice(index, 1);
        }
    }

    if (guitaristsBothLists.length === 0) {
        endGuitaristComparison();
    }
};

const renderGuitaristInfo = (guitarist, index) => {
    const infoDiv = document.getElementById('guitarist-info');
    const imgHtml = guitarist.imageUrl ? `<img id="guitaristImage" alt="${guitarist.name}" style="max-width: 100%; height: auto;">` : '';
    infoDiv.innerHTML = `<h2>${guitarist.name}</h2> ${imgHtml}`;
    if (guitarist.imageUrl) {
        loadImage(document.getElementById('guitaristImage'), guitarist.imageUrl);
    }
    renderChoices(guitarist, index);
};

const renderChoices = (guitarist, index) => {
    // const swap = Math.random() < 0.5;
    const swap = guitarist.rollingStonesRank > guitarist.chatGPTRank;

    const button1Text = `Rank #${swap ? guitarist.chatGPTRank : guitarist.rollingStonesRank}`;
    const button1List = swap ? 'chatGPT' : 'rollingStones';
    const button2Text = `Rank #${swap ? guitarist.rollingStonesRank : guitarist.chatGPTRank}`;
    const button2List = swap ? 'rollingStones' : 'chatGPT';

    document.getElementById('choices').innerHTML = `
        <button onclick="handleUserChoice('${button1List}', ${index})">${button1Text}</button>
        <button onclick="handleUserChoice('${button2List}', ${index})">${button2Text}</button>
    `;
};

const handleUserChoice = (list, index, guitaristsBothLists) => {
    score[list]++;
    updateScore('score');

    const listName = list === 'rollingStones' ? "Rolling Stone's rank" : "ChatGPT's rank";
    let popupMessage = `You chose ${listName}!${isFirstPopup ? " Click anywhere to continue." : ""}`;
    isFirstPopup = false;

    showPopup(popupMessage, () => {
        guitaristsBothLists.splice(index, 1);
        showRandomGuitarist(guitaristsBothLists);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    fetchGuitaristsData('data/guitarists.json', (guitarists) => {
        const guitaristsBothLists = guitarists.filter(g => g.rollingStonesRank && g.chatGPTRank);

        window.handleUserChoice = (list, index) => handleUserChoice(list, index, guitaristsBothLists);

        updateScore('score');
        showRandomGuitarist(guitaristsBothLists);
    });
});
