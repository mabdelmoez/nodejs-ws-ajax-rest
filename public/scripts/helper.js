var Helper = (function() {
    return {
        isValidUsername:function(fieldName) {
        	return (fieldName.length != 0 && !(/\s/.test(fieldName)));
        },
        isValidMessage:function(fieldName) {
        	return (fieldName.length != 0 && !(fieldName.trim().length != fieldName.length));
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