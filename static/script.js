document.getElementById('user-input-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var userInput = document.getElementById('chat-input').value;
    sendMessage(userInput);
    displayMessage(userInput, 'self'); // Display user's message in the chat box
});

function sendMessage(userInput) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/chat', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText).response; // Parse JSON and extract response
            displayMessage(response, 'assistant'); // Display response in the chat box
        }
    };
    xhr.send('user_input=' + userInput);
}

function displayMessage(message, sender) {
    var chatLogsDiv = document.querySelector('.chat-logs');
    var senderClass = sender === 'self' ? 'self' : 'user';
    chatLogsDiv.innerHTML += '<div class="chat-msg ' + senderClass + '"><div class="msg-avatar"></div><div class="cm-msg-text">' + message + '</div></div>';
    chatLogsDiv.scrollTop = chatLogsDiv.scrollHeight; // Scroll to bottom
    document.getElementById('chat-input').value = '';
}

 
$(document).delegate(".chat-btn", "click", function() {
    var value = $(this).attr("chat-value");
    var name = $(this).html();
    $("#chat-input").attr("disabled", false);
    generate_message(name, 'self');
  })
  
  $("#chat-circle").click(function() {    
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  
  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  