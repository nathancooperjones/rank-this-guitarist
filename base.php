<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="content">
        <?php echo $content; ?>
    </div>
    <script src="<?php echo $scriptSrc; ?>" type="module"></script>
</body>
</html>
