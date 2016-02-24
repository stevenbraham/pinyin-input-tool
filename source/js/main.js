$(document).ready(function() {
    $("#pinyinText").on("input",function(){
        var originalText = $(this).val();
        //search a pinyin tone code using regex
        var regexMatch = originalText.match(/([a,A,e,E,I,i,o,O,U,u][0,1,2,3,4,5])/);
        if(regexMatch){
            var pinYincode = regexMatch[0];
            var newCharacter = pinyinTable[pinYincode[0]][pinYincode[1]];
            var newText = originalText.replace(pinYincode,newCharacter);
            $("#pinyinText").val(newText);
        }
    })
});
