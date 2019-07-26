// CSS (because of webpack)
import '../scss/base.scss';

// script:
window.addEventListener('DOMContentLoaded', function(){

    const inputs = document.getElementsByClassName('poll__form__input');
    const input_submit = document.getElementById('input_submit');
    const form = document.getElementById('poll');
    const link_results = document.getElementById('link_results');

    // Make submit button available when an option is selected:
    const releaseSubmit = () => {
        input_submit.classList.remove('poll__action__vote--disabled');
        input_submit.removeAttribute('disabled');
    };
    
    // First option to submit: just print the answer to a page:
    const submit_form_blob = (event) => {
        const answer = document.querySelector('input[name="favorite"]:checked').value;
        const answer_show = new Blob([answer], {type: "text/html"});
        window.location.href = window.URL.createObjectURL(answer_show);
        event.preventDefault();
    };

    // Second option to submit: with see_results_ajax, but this is a work in ProgressEvent. Here I would ask for some help ;)
    const submit_form_ajax = (event) => {
        const answer = document.querySelector('input[name="favorite"]:checked').value;
        event.preventDefault();

        if(answer.length > 0){
            let xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

            xmlhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    form.innerHTML = this.responseText;
                    document.getElementById('results').innerHTML += "<br>Your answer was: " + answer;
                }
            }

            xmlhttp.open("GET","results_ajax.html?favorite=" + answer , true);
            xmlhttp.send();
        }
    }

    // Show the results with see_results_ajax.When JS is not activated by the userInfo, there is a backup page that loads normally.
    const see_results_ajax = (event) => {
        event.preventDefault();

        let xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                form.innerHTML = this.responseText;
            }
        }

        xmlhttp.open("GET","results_ajax.html", true);
        xmlhttp.send();
    }

    // Add event listeners to the radio buttons.
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('click', releaseSubmit);
    }

    // TWO OPTIONS TO SUBMIT FORM
    // OR print the answer with a blob:
    // form.addEventListener('submit', submit_form_blob, true);

    // OF with ajax (just beginning, far from perfect):
    form.addEventListener('submit', submit_form_ajax, true);

    // Event listener to how results with see_results_ajax.
    link_results.addEventListener('click', see_results_ajax, true);

});
