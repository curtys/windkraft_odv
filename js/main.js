/**
 * Created by sc on 3/29/16.
 */

window.onload = function() {
    var visEnter = document.querySelector('#enter-vis');
    visEnter.onclick = function() {
        //alert(this.nextElementSibling.getAttribute('id'));
        this.nextElementSibling.style.display = 'block'
    };
    var visExit = document.querySelector('#exit-vis');
    visExit.onclick = function() {
        this.parentElement.style.display = 'none';
    }
};