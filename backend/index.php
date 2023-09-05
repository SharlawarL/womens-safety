<?php

/**
 * **********************************************************************
 * 
 * API          - Core PHP
 * Version      - 7.2
 * Developer    - Lalit Adellu Sharlawar
 * Email        - lalitsharlawar@gmail.com
 * Mobile       - 9657256675
 * 
 * **********************************************************************
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS, PATCH, DELETE');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Authorization, Content-Type, x-xsrf-token, x_csrftoken, Cache-Control, X-Requested-With');
header('Content-Type: application/json');

$method = isset($_REQUEST['method']) ? $_REQUEST['method'] : '';
$result = [];

// SMS Secret key
$sms_key = '6meJWIzOYGEh0uMRZqoHrKvjnTdD17XslBfQ3c84kg2b5VaA9yNlztM5cPoRjTWQXCfrEL8Jmdn1uOUh';

// Databse Crediationals
$servername = "localhost";
$username = "u641427100_womes_safety";
$password = "7Zb;D[Ts?H";
$dbname = "u641427100_womes_safety";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


// Register User
if($method == 'register')
{
    $mobile = trim($_REQUEST['mobile']);
    $name = trim($_REQUEST['name']);
    $email = trim($_REQUEST['email']);
    $address = trim($_REQUEST['address']);
    $dob = trim($_REQUEST['dob']);
    $message = trim($_REQUEST['message']);
    
    $sql = "SELECT * FROM user where mobile='".$mobile."'";
    $resultSql = $conn->query($sql);
    
    if ($resultSql->num_rows > 0) {
            $result['status'] = 200;
            $result['response'] = false;
            $result['message'] = 'User already exits';
            $result['data'] = "";
    } else {
        $sql = "INSERT INTO user (name, mobile, email, address, dob)  VALUES ('".$name."', '".$mobile."', '".$email."', '".$address."', '".$dob."')";
        
        if ($conn->query($sql) === TRUE) {
            $otp = sprintf( "%04d", rand(0,9999));
            
            $fields = array(
                "message" => $message.' '.$otp,
                "language" => "english",
                "route" => "q",
                "numbers" => $mobile,
            );
            
            $curl = curl_init();
            
            curl_setopt_array($curl, array(
              CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2",
              CURLOPT_RETURNTRANSFER => true,
              CURLOPT_ENCODING => "",
              CURLOPT_MAXREDIRS => 10,
              CURLOPT_TIMEOUT => 30,
              CURLOPT_SSL_VERIFYHOST => 0,
              CURLOPT_SSL_VERIFYPEER => 0,
              CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
              CURLOPT_CUSTOMREQUEST => "POST",
              CURLOPT_POSTFIELDS => json_encode($fields),
              CURLOPT_HTTPHEADER => array(
                "authorization: ".$sms_key,
                "accept: */*",
                "cache-control: no-cache",
                "content-type: application/json"
              ),
            ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            
            curl_close($curl);
            
            if ($err) {
                $result['status'] = 200;
                $result['response'] = false;
                $result['message'] = 'SMS Api failed';
                $result['data'] = "cURL Error #:" . $err;
        
            } else {
                $result['status'] = 200;
                $result['response'] = true;
                $result['message'] = 'New User created '.$mobile;
                $result['otp'] = $otp;
                $result['data'] = array('name'=> $name, 'sms_responce' => $response);
            }
        } else {
            $result['status'] = 200;
            $result['response'] = false;
            $result['message'] = "Error: " . $sql . "<br>" . $conn->error;
            $result['data'] = "";
        }
    }

// Update User
} else if($method == 'update')
{
    
    $mobile = trim($_REQUEST['mobile']);
    $name = trim($_REQUEST['name']);
    $email = trim($_REQUEST['email']);
    $address = trim($_REQUEST['address']);
    $dob = trim($_REQUEST['dob']);
    
    $sql = "SELECT * FROM user where mobile='".$mobile."'";
    $resultSql = $conn->query($sql);
    
    if ($resultSql->num_rows > 0) {
            $sql = "Update user SET name= '".$name."', email='".$email."', address='".$address."', dob='".$dob."' WHERE mobile ='".$mobile."'";
        
        if ($conn->query($sql) === TRUE) {
            $result['status'] = 200;
            $result['response'] = true;
            $result['message'] = 'User updated successfully';
            $result['data'] = "";
        } else {
            $result['status'] = 200;
            $result['response'] = false;
            $result['message'] = "Error: " . $sql . "<br>" . $conn->error;
            $result['data'] = "";
        }
            
    } else {
        $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = 'User not exits';
        $result['data'] = "";
    }

// Get User Deatils
} else if($method == 'get')
{
    
    $mobile = trim($_REQUEST['mobile']);
    
    $sql = "SELECT * FROM user where mobile='".$mobile."'";
    $resultSql = $conn->query($sql);
    
    if ($resultSql->num_rows > 0) {
        while($row = $resultSql->fetch_assoc()) {
            $result['status'] = 200;
            $result['response'] = true;
            $result['message'] = 'User data';
            $result['data'] = $row;
        }
            
    } else {
        $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = 'User not exits';
        $result['data'] = "";
    }
} else if($method == 'alert')
{
    $mobile = trim($_REQUEST['mobile']);
    $message = trim($_REQUEST['message']);

    if(!empty($mobile))
    {
        $otp = sprintf( "%04d", rand(0,9999));

        $fields = array(
            "message" => $message,
            "language" => "english",
            "route" => "q",
            "numbers" => $mobile,
        );
        
        $curl = curl_init();
        
        curl_setopt_array($curl, array(
          CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_SSL_VERIFYHOST => 0,
          CURLOPT_SSL_VERIFYPEER => 0,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_POSTFIELDS => json_encode($fields),
          CURLOPT_HTTPHEADER => array(
            "authorization: ".$sms_key,
            "accept: */*",
            "cache-control: no-cache",
            "content-type: application/json"
          ),
        ));
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        
        curl_close($curl);
        
        if ($err) {
            $result['status'] = 200;
            $result['response'] = false;
            $result['message'] = 'SMS Api failed';
            $result['data'] = "cURL Error #:" . $err;
    
        } else {
            $result['status'] = 200;
            $result['response'] = true;
            $result['message'] = 'SMS Successfully sent to mobile number '.$mobile;
            $result['data'] = $response;
        }
    } else {
        $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = 'Mobile number required';
        $result['data'] = '';
    }

// Send OTP
} else if($method == 'otp')
{
    $mobile = trim($_REQUEST['mobile']);
    
    $sql = "SELECT * FROM user where mobile='".$mobile."'";
    $resultSql = $conn->query($sql);
    
    if ($resultSql->num_rows > 0) {
        while($row = $resultSql->fetch_assoc()) {

        if(!empty($mobile))
        {
            $otp = sprintf( "%04d", rand(0,9999));
            $message = "The One time password is ".$otp;
    
            $fields = array(
                "message" => $message,
                "language" => "english",
                "route" => "q",
                "numbers" => $mobile,
            );
            
            $curl = curl_init();
            
            curl_setopt_array($curl, array(
              CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2",
              CURLOPT_RETURNTRANSFER => true,
              CURLOPT_ENCODING => "",
              CURLOPT_MAXREDIRS => 10,
              CURLOPT_TIMEOUT => 30,
              CURLOPT_SSL_VERIFYHOST => 0,
              CURLOPT_SSL_VERIFYPEER => 0,
              CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
              CURLOPT_CUSTOMREQUEST => "POST",
              CURLOPT_POSTFIELDS => json_encode($fields),
              CURLOPT_HTTPHEADER => array(
                "authorization: ".$sms_key,
                "accept: */*",
                "cache-control: no-cache",
                "content-type: application/json"
              ),
            ));
            
            $response = curl_exec($curl);
            $err = curl_error($curl);
            
            curl_close($curl);
            
            if ($err) {
                $result['status'] = 200;
                $result['response'] = false;
                $result['message'] = 'SMS Api failed';
                $result['data'] = "cURL Error #:" . $err;
        
            } else {
                $result['status'] = 200;
                $result['response'] = true;
                $result['message'] = 'OTP Successfully sent to mobile number '.$mobile;
                $result['otp'] = $otp;
                $result['sms_data'] = $response;
                $result['data'] = $row;
            }
        } else {
            $result['status'] = 200;
            $result['response'] = false;
            $result['message'] = 'Mobile number required';
            $result['data'] = '';
        }
        }
    } else {
        $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = 'Mobile not exits';
        $result['data'] = '';
    }

}  else {
    $result['status'] = 200;
    $result['response'] = false;
    $result['message'] = 'Samething went wrong';
    $result['data'] = '';
}
print_r(json_encode($result));
die();

/**
 * **********************************************************************
 * 
 *                          End API
 * 
 * **********************************************************************
 */