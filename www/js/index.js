// Device Event Listener
document.addEventListener("deviceready", onDeviceReady, false);

//Device Ready
function onDeviceReady() {
   $(document).ready(function(){
        // Save Event Listener
       $('#saveBtn').on('click', function(){
           saveContact();
       });

       // Get List Of Contacts
       getContacts();
   });
}     

// Get Contacts
function getContacts(){
    console.log('Getting Contacts...');
    var options = new ContactFindOptions();
    options.filter=""; 
    options.multiple=true;
    var fields = ["displayName","id"];
    navigator.contacts.find(fields, onGetSuccess, onGetError, options);
}

// Contacts Fetched
function onGetSuccess(contacts){
    $('#contactMsg').hide();
    for (var i = 0; i < contacts.length; i++) {
        $('#contactList').append('<li><a id="editContact" href="#edit?id='+contacts[i].displayName+'">'+contacts[i].displayName+'</a></li>');
    }
    $( "#contactList" ).listview( "refresh" );
}

// Contact Fetch Error
function onGetError(error){
    alert('Error: '+ error.code);
}

// Add a Contact
function saveContact(){
    console.log('Getting Contact Info...');
    // Get Form Values
    var firstName    = $('#firstName').val();
    var lastName     = $('#lastName').val();
    var fullName     = $('#firstName').val()+' '+$('#lastName').val();
    var note         = $('#note').val();
    var emailAddress = $('#email').val();
    var phone        = $('#phone').val();
    
    // Create Contact Object
    var myContact = navigator.contacts.create({"displayName" : fullName});
    
    // Note Field
    myContact.note = note;
    
    // Email Field
    var emails = [];
    emails[0] = new ContactField('email', emailAddress, false); 
    myContact.emails = emails;

    // Phone Number Field
    var phoneNumbers = [];
    phoneNumbers[0] = new ContactField('mobile', phone, true);
    myContact.phoneNumbers = phoneNumbers;

    //Save Contact   
    myContact.save(onSaveSuccess, onSaveError);


}

// Contact Added
function onSaveSuccess(contact){
    alert('Your Contact Has Been Saved');
    getContacts();
    window.location.href="#home";
}

// Contact Add Error
function onSaveError(error){
    alert('Error: '+ error.code);
}


$(document).on('pageinit', '#edit', function(){ 
    alert('Edit');
});