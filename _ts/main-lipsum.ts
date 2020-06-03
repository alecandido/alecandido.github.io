// -------------
// async request
// -------------

// -- paragraphs

function paragraphs_to_selector(selector: string, n_pars = 1, start = 0)  {
  function callback(raw_text: string) {
    let pars_list = raw_text.split("\n\n");
    let selected_pars = pars_list.slice(start, start + n_pars);
    let text = selected_pars.join("\n\n");

    $(selector).html(text);
  }

  $.get("/assets/lipsum.txt", callback);
}

paragraphs_to_selector("#ciao", 1);

paragraphs_to_selector(".come", 1, 3);


// -- words

function words_to_selector(selector: string, n_words = 1, start = 0)  {
  function callback(raw_text: string) {
    let pars_list = raw_text.split(" ");
    let selected_pars = pars_list.slice(start, start + n_words);
    let text = selected_pars.join(" ");

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
