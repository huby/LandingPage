<?php
/* landing key */
$key = "46623b93754183f2b0e848ed0f7dc169689fd37e";
/* landing id */
$id = 27;

$json = json_encode(
	array(
		"terminado" => 1,
		"resultados" => array(
			"nombres" => $_POST["nombres"],
			"correo" => $_POST["correo"],
			"telefono" => $_POST["telefono"],
			"mensaje" => $_POST["mensaje"],
			"ip" => $_SERVER['REMOTE_ADDR'],
			"browser" => $_POST["browser"]
		)
	)
);
$datos = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($key), $json, MCRYPT_MODE_CBC, md5(md5($key))));

$ub = rand(2, 10);
$uid = "";
for ($i = 1; $i < $ub + rand(0, 15); $i++) {
	if ($i == $ub) {
		$uid = $uid . "|" . $id;
	}
	$uid = $uid . "|" . rand(0, 9);
}
$uid = $ub . $uid;
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://eve.laweb.pe/apiv1.php");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, array("datos" => $datos, "u" => $uid));

$result = curl_exec($ch);

curl_close($ch);

?>

