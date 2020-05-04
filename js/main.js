/*jsLint*/
document.getElementById('myForm').addEventListener('submit', addToLocalStorage);

function addToLocalStorage(e) {
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }
    var bookmark = {
        name: siteName,
        url: siteUrl
    };
    // getlocalstorage
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        // add object to array 
        bookmarks.push(bookmark);
        // set array to localstorage after convert it to string
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks form localstorage and convert it to array
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add object to array 
        bookmarks.push(bookmark);
        // set array to localstorage after convert it to string
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();

    // prevent default
    e.preventDefault();

}
// Delete bookmark
function deleteBookmark(url) {
	"use strict";
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through the bookmarks
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

//fetch bookmarks function 
function fetchBookmarks() {
    // get bookmarks form localstorage and convert it to array
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // get bookmarksResults div 
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = "";

    for (let i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += `
        <div class="well bg-dark text-white p-2  m-2 rounded">
<h3>   ${name} 
<a class="ml-4 pl-3 pr-3 btn btn-defult bg-success text-white" target="_blank" href="${url}">Visit</a>
<a  onclick="deleteBookmark(${url})" class="btn btn-danger +" href="#">Delete</a>
</h3> 
        </div>
        `;
    }
}
// show alert
function showAlert(message, classname) {
    const div = document.createElement('div');
    div.className = `alert alert-${classname}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('.marketing');
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector('.alert').remove(), 2000);


}
// Validate Form
function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        showAlert('Please fill in the form', 'warning');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        showAlert('Please use a valid URL', 'warning');
        return false;
    }

    return true;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}