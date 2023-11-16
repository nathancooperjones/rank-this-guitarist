// Common function to fetch guitarists data
function fetchGuitaristsData(url, callback) {
    const noCache = new Date().getTime();
    fetch(`${url}?_=${noCache}`)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error loading guitarists data:', error));
}

// Common function to show popups
function showPopup(message, callback) {
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.innerHTML = `<div id="popup-content">${message}</div>`;
    document.body.appendChild(popup);
    popup.addEventListener('click', function () {
        document.body.removeChild(popup);
        callback();
    });
}

// Common score object and function
let score = { rollingStones: 0, chatGPT: 0 };

function updateScore(scoreDivId) {
    const scoreDiv = document.getElementById(scoreDivId);

    let scoreText = 'Score: ';

    if (score.rollingStones > score.chatGPT) {
        scoreText += `<span class="winning">Rolling Stone - ${score.rollingStones}</span> | ChatGPT - ${score.chatGPT}`;
    } else if (score.chatGPT > score.rollingStones) {
        scoreText += `Rolling Stone - ${score.rollingStones} | <span class="winning">ChatGPT - ${score.chatGPT}</span>`;
    } else {
        scoreText += `Rolling Stone - ${score.rollingStones} | ChatGPT - ${score.chatGPT}`;
    }

    scoreDiv.innerHTML = `<p>${scoreText}</p>`;
}

// Load image with some sort of progress indicator
function loadImage(imgElement, imageUrl) {
    const placeholder = 'assets/loading.gif';
    imgElement.src = placeholder;

    const actualImage = new Image();
    actualImage.src = imageUrl;
    actualImage.onload = () => {
        imgElement.src = imageUrl;
    };
}

const endGuitaristComparison = () => {
    document.getElementById('guitarist-info').innerHTML = '<p>No more guitarists to compare!</p>';
    document.getElementById('choices').style.display = 'none';
};

export { endGuitaristComparison, fetchGuitaristsData, loadImage, showPopup, score, updateScore };
