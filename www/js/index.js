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
        $('#contactList').append('<li><a id="editContact" href="#edit?id='+contacts[i].id+'">'+contacts[i].displayName+'</a></li>');
    }
    $( "#contactList" ).listview( "refresh" );
}

// Contact Fetch Error
function onGetError(error){
    alert('Error: '+ error.code);
}

// Add a Contact
function saveContact(){
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
    window.location.href="#home";
}

// Contact Add Error
function onSaveError(error){
    alert('Error: '+ error.code);
}

// Listen for any attempts to call changePage().
$(document).bind( "pagebeforechange", function( e, data ) {
    if ( typeof data.toPage === "string" ) {
        var u = $.mobile.path.parseUrl( data.toPage ),
            re = /^#edit/;

        if ( u.hash.search(re) !== -1 ) {       
            showContact( u, data.options );
            //e.preventDefault();
        }
    }
});


function showContact( urlObj, options ){
   var contactId = urlObj.hash.replace( /.*id=/, "" );
 
   //$('input[id=firstName]').val(contactId);

   var options = new ContactFindOptions();
    options.filter=contactId; 
    options.multiple=false;
    var fields = ["displayName","id"];
    navigator.contacts.find(fields, onGetSingleSuccess, onGetSingleError, options);
}


// Contacts Fetched
function onGetSingleSuccess(contacts){
   console.log(contacts[0].phoneNumbers[0]);
   // Fill Form
   $('input[id=firstName]').val(contacts[0].name.givenName);
   $('input[id=lastName]').val(contacts[0].name.familyName);
   $('input[id=email]').val(contacts[0].emails[0].value);
   $('input[id=phone]').val(contacts[0].phoneNumbers[0].value);
   $('input[id=note]').val(contacts[0].note);
   $('input[id=cid]').val(contacts[0].id);
}


// Contact Fetch Error
function onGetSingleError(error){
    alert('Error: '+ error.code);
}


// Update a Contact
function updateContact(){
    // Get Form Values
    var firstName    = $('#firstName').val();
    var lastName     = $('#lastName').val();
    var fullName     = $('#firstName').val()+' '+$('#lastName').val();
    var note         = $('#note').val();
    var emailAddress = $('#email').val();
    var phone        = $('#phone').val();
    var cid          = $('#cid').val();
    
    // Create Contact Object
    var myContact = navigator.contacts.create({"displayName" : fullName});
    
    // ID Field
     myContact.id = cid;

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
    myContact.save(onUpdateSuccess, onUpdateError);

}

// Contact Updated
function onUpdateSuccess(contact){
    alert('Your Contact Has Been Updated');
    window.location.href="#home";
}

// Contact Update Error
function onUpdateError(error){
    alert('Error: '+ error.code);
}