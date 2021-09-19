$(document).ready(()=>{
    let countries = [];

    fetch('/countriesList')
    .then(response => response.json())
    .then(data => {
        countries = data;
        //console.log(countries);
    })
    .catch((err)=>console.log(err))  
    
    $('#country').change(()=> { 
        let selectedVal = $("#country option:selected").val();
        let selectedCountry = countries[selectedVal-1];
        $("#id").val(selectedCountry.id);
        $("#code").val(selectedCountry.code);
        $("#name").val(selectedCountry.name);
        if(selectedCountry.class && selectedCountry.class!= ""){
            $("#class-wrapper").removeClass('hide');
            $("#class").removeAttr('disabled');
            $("#class").val(selectedCountry.class);
        }else{
            $("#class-wrapper").addClass('hide');
            $("#class").val('');
            $("#class").attr('disabled');
        }
        $("#nativeName").val(selectedCountry.nativeName);
        $("#submit-button").removeClass('disabled');
        $("#submit-button").removeAttr('disabled');
     });

     $("#submit-button").click(function (e){
         let id = $("#id").val();
         let code = $("#code").val();
         let name = $("#name").val();
         let nativeName = $("#name").val();
         let className = $("#class").val();
        let data = {
            id,
            code,
            name,
            nativeName,
            'class' : className ? className : ''
        };
         console.log(data); 
     })

})