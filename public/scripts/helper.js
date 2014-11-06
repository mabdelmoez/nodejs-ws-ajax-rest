var Helper = (function() {
    return {
        NotValid:function(fieldName) {
        	return (fieldName.length === 0 || !fieldName.trim());
        } 
    }   
}());