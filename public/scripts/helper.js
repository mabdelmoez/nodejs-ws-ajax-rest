var Helper = (function() {
    return {
        isValid:function(fieldName) {
        	return (fieldName.length === 0 || !fieldName.trim());
        } 
    }   
}());