<html>
<body>

<?php
    echo $_POST["messenger"]."<br>";
    echo $_POST["nickname"]."<br>";
    echo $_POST["email"]."<br>";
    echo $_POST["phone"]."<br>";
    echo $_POST["message"]."<br>";
    // if (!(isset($_POST["messenger"]) && isset($_POST["nickname"])) && 
    //     !isset($_POST["email"]) && 
    //     !isset($_POST["phone"]))
    //     {
    //         echo('<script>');
    //         echo('alert("Please, fill in at least one of the following fields: messenger + nickname, email or phone")');
    //         echo('</script>');
    //     }
?>

</body>
</html>