<?php


$method = isset($_REQUEST['method']) ? $_REQUEST['method'] : '';
$result = [];

$sms_key = urlencode("NmU0YTM3MzY2MTcwNDE0MjQzNjg1NzUxNjg2ZjMxNzU=");

if($method == 'login')
{
    $mobile = trim($_REQUEST['mobile']);

    if(!empty($mobile))
    {
        $otp = sprintf( "%04d", rand(0,9999));

        // Message details
        $sender = urlencode('TXTLCL');
        $message = rawurlencode('This is your message');
        
    
        // Prepare data for POST request
        $data = array('apikey' => $sms_key, 'numbers' => $mobile, "sender" => $sender, "message" => $message);
    
        // Send the POST request with cURL
        $ch = curl_init('https://api.textlocal.in/send/');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        
        // Process your response here
        // echo $response;
        // $response = json_decode($response);
        if($response)
        {
            $result['status'] = 200;
            $result['message'] = 'OTP Successfully sent to mobile number '.$mobile;
            $result['data'] = json_decode($response);
        } else {
            $result['status'] = 200;
            $result['message'] = 'SMS Api failed';
            $result['data'] = json_decode($response);
        }
    } else {
        $result['status'] = 200;
        $result['message'] = 'Mobile number required';
        $result['data'] = '';
    }

} else {
    $result['status'] = 200;
    $result['message'] = 'Samething went wrong';
    $result['data'] = '';
}
echo "<pre>";
print_r(json_encode($result));
die();