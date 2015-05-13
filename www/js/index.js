//Add event listener to run when the device is ready
document.addEventListener("deviceready", onDeviceReady, false);

//Device is ready
function onDeviceReady() {
   $(document).ready(function(){
       $('#saveBtn').bind('click',function(){
           saveContact();
       });
   });
}     

function saveContact(){
    console.log('Getting Contact Info...');
    //Create variables from form input
    var firstName    = document.getElementById('firstName').value;
    var lastName     = document.getElementById('lastName').value;
    var fullName     = document.getElementById('firstName').value+' '+document.getElementById('lastName').value;
    var note         = document.getElementById('note').value
    var emailAddress = document.getElementById('email').value
    
    //Create contact object
    var theContact = navigator.contacts.create({"displayName" : fullName});
    //
    //Note Field
    theContact.note = note;
    
    //Email Field
    var emails = [];
    emails[0] = new ContactField('email', emailAddress, false); 
    theContact.emails = emails;
    
    //Save contact info   
    theContact.save(onSaveSuccess,onSaveError);             
}

function onSaveSuccess(contact){
    alert('Your Contact Has Been Saved');
}

function onSaveError(error){
    alert('Error: '+ error.code);
}