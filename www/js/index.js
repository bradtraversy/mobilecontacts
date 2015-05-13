//Add event listener to run when the device is ready
document.addEventListener("deviceready", onDeviceReady, false);

//Device is ready
function onDeviceReady() {
   $(document).ready(function(){
       $('#saveBtn').on('click', function(){
           saveContact();
       });
   });
}     

function saveContact(){
    console.log('Getting Contact Info...');
    //Create variables from form input
    var firstName    = $('#firstName').val();
    var lastName     = $('#lastName').val();
    var fullName     = $('#firstName').val()+' '+$('#lastName').val();
    var note         = $('#note').val();
    var emailAddress = $('#email').val();
    
    //Create contact object
    var myContact = navigator.contacts.create({"displayName" : fullName});
    //
    //Note Field
    myContact.note = note;
    
    //Email Field
    var emails = [];
    emails[0] = new ContactField('email', emailAddress, false); 
    myContact.emails = emails;
    
    //Save contact info   
    myContact.save(onSaveSuccess, onSaveError);             
}

function onSaveSuccess(contact){
    alert('Your Contact Has Been Saved');
}

function onSaveError(error){
    alert('Error: '+ error.code);
}