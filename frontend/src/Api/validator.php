<?php

class  Input {
	static $errors = true;

	static function check($arr, $on = false) {
		if ($on === false) {
			$on = $_REQUEST;
		}
		foreach ($arr as $value) {	
			if (empty($on[$value])) {
                return false;
			}
		}
        return $arr;
	}

	static function int($val) {
		$val = filter_var($val, FILTER_VALIDATE_INT);
		if ($val === false) {
            return false;
		}
		return $val;
	}

	static function str($val) {
		if (!is_string($val)) {
			// self::throwError('Invalid String', 902);
            return false;
		}
		$val = trim(htmlspecialchars($val));
		return $val;
	}

	static function bool($val) {
		$val = filter_var($val, FILTER_VALIDATE_BOOLEAN);
		return $val;
	}

	static function email($val) {
		$val = filter_var($val, FILTER_VALIDATE_EMAIL);
		if ($val === false) {
			// self::throwError('Invalid Email', 903);
            return false;
		}
		return $val;
	}

	static function url($val) {
		$val = filter_var($val, FILTER_VALIDATE_URL);
		if ($val === false) {
			// self::throwError('Invalid URL', 904);
            return false;
		}
		return $val;
	}

    static function size($val, $minimum, $maximum) {
		$length = strlen($val);
		if ($length < $minimum) {
            // self::throwError('Size is too short', 905);	
            return false;
		}
        if($length > $maximum){
            // self::throwError('Size is too long', 906);
            return false;
        }
        return $val;
	}

	static function badcontent($val) {
		if (!preg_match("/^[a-zA-Z0-9 '-]*$/",$val)) {
			// self::throwError('This is a bad content', 907);		
            return false;
		}
        return $val;
	}

    static function isPhone($val) {
        $filtered_phone_number = filter_var($val, FILTER_SANITIZE_NUMBER_INT);
        $val = str_replace("-", "", $filtered_phone_number);
        if (strlen($val) < 10 || strlen($val) > 14) {
           return false;
        } else {
          return $val;
        }
	}

	static function throwError($error = 'Error In Processing', $errorCode = 0) {
		if (self::$errors === true) {
			throw new Exception($error, $errorCode);
		}
	}

}


?>