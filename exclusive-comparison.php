<?php
$pageTitle = "Exclusive Guitarist Rankings";
$scriptSrc = "exclusive-comparison.js?random=" . filemtime('exclusive-comparison.js');
$content = '
    <h1>The 250 Greatest Guitarists of All Time: Rolling Stone vs. ChatGPT!</h1>
    <div id="intro">
        <p>
            We had an AI chatbot <a target="_blank" href="https://chat.openai.com/share/77061323-0bcf-48de-80cd-67071cb5cdec">[1]</a><a target="_blank" href="https://chat.openai.com/share/7a655a87-a326-4445-9f79-0084ea8a6ed7">[2]</a> create
            its own list of the top 250 guitarists of all time, and compared it to
            <a target="_blank" href="https://www.rollingstone.com/music/music-lists/best-guitarists-1234814010/">
                Rolling Stone\'s 250 Greatest Guitarists of All Time list.
            </a>
        </p>
        <p>Each guitarist shown below appears on one list, but <em>not</em> the other.</p>
        <p>
            Choose the guitarist you think is <strong>more deserving of inclusion on a list of the
            top 250 guitarists of all time</strong>.
    </div>
    <div id="choices"></div>
    <div id="score"></div>
    <div id="guitarist-info-comparison"></div>
    <br/>
    <hr/>
    <br/>
    <div style="text-align: center;">
        <a href="compare-rankings.php">Click Here to Compare Guitarists on Both Lists</a>
    </div>
';
include('base.php');
?>
