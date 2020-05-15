"use strict";
// -------------
// async request
// -------------
// -- paragraphs
function paragraphs_to_selector(selector, n_pars, start) {
    if (n_pars === void 0) { n_pars = 1; }
    if (start === void 0) { start = 0; }
    function callback(raw_text) {
        var pars_list = raw_text.split("\n\n");
        var selected_pars = pars_list.slice(start, start + n_pars);
        var text = selected_pars.join("\n\n");
        $(selector).html(text);
    }
    $.get("/assets/lipsum.txt", callback);
}
paragraphs_to_selector("#ciao", 1);
paragraphs_to_selector(".come", 1, 3);
// -- words
function words_to_selector(selector, n_words, start) {
    if (n_words === void 0) { n_words = 1; }
    if (start === void 0) { start = 0; }
    function callback(raw_text) {
        var pars_list = raw_text.split(" ");
        var selected_pars = pars_list.slice(start, start + n_words);
        var text = selected_pars.join(" ");
        $(selector).html(text);
    }
    $.get("/assets/lipsum.txt", callback);
}
words_to_selector("#ciao-title", 5);
// ------------
// sync request
// ------------
//
//var text = $.ajax({type: "GET", url: "/assets/lipsum.txt", async: false})
//console.log(text.responseText);
