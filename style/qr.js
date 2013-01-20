var qr = {};
//API URL
qr.api = 'http://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=';
// qr.api = 'http://localhost/qrcode/api.php?chl=';
//空白图 URL
qr.blankimg = 'img/blank.gif';
//默认数据
qr.defaultData = 'newt0n';

qr.text = function(text){
	return qr.api + encodeURIComponent(text);
};
qr.vcard = function(name, email, tel, adr, org, title, url, memo){
	return qr.api + encodeURIComponent('BEGIN:VCARD\nVERSION:3.0\nN:'+name+';;;;\nEMAIL:'+email+'\nTEL:'+tel+'\nADR:;;'+adr+';;;;\nORG:'+org+'\nTITLE:'+title+'\nURL:'+url+'\nNOTE:'+memo+'\nEND:VCARD');
}
qr.wifi = function (ssid, pw, encryptype) {
	if(encryptype == '')
		pw = '';

	return qr.api + encodeURIComponent('WIFI:T:'+encryptype+';S:'+ssid+';P:'+pw+';;');
}

function getParam()
{
	var curUrl = decodeURIComponent(window.location.href);
	var vars = curUrl.split('?');
	if(vars.length < 2)
		return;

	var data = '';
	var varsList = vars[1].split('&');
	var equalString = varsList[0];
	var equalArray=equalString.split('=');        
	if(equalArray[0]=='d')
		data = equalArray[1];

	$('#qrtext').val(data);
}

function getImg()
{
	var src = '';
	var type = $('#qrbtn').attr('qrtype');

	switch(type)
	{
		case 'vcard':
			src = qr.vcard(
				$('#vcardfname').val(),
				$('#vcardemail').val(),
				$('#vcardtel').val(),
				$('#vcardadr').val(),
				$('#vcardorg').val(),
				$('#vcardtitle').val(),
				$('#vcardurl').val(),
				$('#vcardmemo').val()
				);
		break;	
		case 'wifi':
			src = qr.wifi($('#wifiname').val(), $('#wifipw').val(), $('#wifiencrypt').val());
		break;
		default:
			if($('#qrtext').val() != '')
				src = qr.text($('#qrtext').val());
			else
				src = qr.text(qr.defaultData);
		break;
	}

	$('#qrimg').attr('src',qr.blankimg);
	$.get(src,function(){
		$('#qrimg').attr('src',src);
	});
}