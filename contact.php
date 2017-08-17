<?php
$actual_page = "contact";
include 'header.php';
?>
	<link rel="stylesheet" type="text/css" href="styles/management.css">
	<article>
		<div class="contact">
			<form id="contact" onsubmit="alert('We will respond as soon as possible')">
				<h3>Send us your suggestions or questions.</h3>
				<h3> We will respond as soon as possible.</h3>
				<label>Name:<input type="text" name="name" placeholder="Name" autocomplete="off" required></label><br>
				<label>Email:<input type="email" name="email" placeholder="Email" autocomplete="off" required></label><br>
				<label>Subject:<input type="text" name="subject" placeholder="Subject" autocomplete="off" required></label><br>
				<label>Message:
				<textarea rows="4" cols="50" name="message" placeholder="Write your message here."></textarea></label>
				<div class="buttons">
					<input type="submit" value="Send Message">
				</div>
			</form>
		</div>
	</article>
	<footer>Talk to Us</footer>
</body>
</html>