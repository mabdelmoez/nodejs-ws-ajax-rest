var Helper = (function() {
    return {
        isValidUsername:function(fieldName) {
        	return (fieldName.length != 0 && fieldName.length <= 25 && (/^[A-Za-z0-9\d]+$/.test(fieldName))); // alphanum does not have any spaces, no special characters from 1-25
        },
        isValidMessage:function(fieldName) {
        	return (fieldName.length != 0 && fieldName.length <= 25 && !(/\s/.test(fieldName))); //anything but no spaces 1-25 chrs
        },
        bindInvalidInputMsg:function(field, msg){
        	 if(field.validity.patternMismatch){
        		 field.setCustomValidity(msg);
        	    }    
        	    else {
        	    	field.setCustomValidity('');
        	    }
        	  return true;
        }
    }   
}());