var Helper = (function() {
    return {
        isValid:function(fieldName) {
        	return (this.length === 0 || !this.trim());
        } 
    }   
}());