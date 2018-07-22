$(document).ready(function(){
  if(location.hash != '') {
    render(location.hash.substr(1))
    preview()
  }
  else {
    var toolbarOptions = [
      [{ 'header': 1}, { 'header': 2}],
      ['link'],          // dropdown with defaults from theme
      //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      ['clean']                                         // remove formatting button
    ];
    
    var quill = new Quill('#editor', {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    });
  }
});

function publish() {
  var textcode = $('.ql-editor').html();
  var zipped = pako.deflateRaw(encodeURI(textcode));
  var zipstr = String.fromCharCode.apply(null,zipped)
  console.log(zipped);
  var blob = btoa(zipstr);
  setHash(blob);
  preview();
}

function stringTointArray(str){
  uint = []
  for(i = 0; i < str.length; i++){
    uint.push(str.charCodeAt(i))
  }
  return uint;
}

function preview(el) {
  var text = $(el).text()||"";

  if(text == 'Preview'){
    $(el).text("Edit");
    $('.ql-toolbar').toggle();
    $('.ql-editor').attr('contenteditable','false');
    var inputTitle = $('input.title').val() || "Untitled";
    $('p.title').text(inputTitle).show();
    $('input.title').hide();
    $('.menu-btn').hide();
  }
  else if(text == 'Edit'){
    $(el).text("Preview");
    $('.ql-toolbar').toggle()
    $('.ql-editor').attr('contenteditable','true')
    var inputTitle = $('input.title').val() || "Untitled";
    $('p.title').text(inputTitle).hide();
    $('input.title').css('visibility','visible').show();
    $('.menu-btn').show();
  }
  else{
    $(el).text("Edit");
    $('.ql-toolbar').toggle();
    $('.ql-editor').attr('contenteditable','false');
    $('input.title').hide();
    $('.header button').hide();
  }
}

function setHash(blob){
  var inputTitle = encodeURI($('input.title').val() || "Untitled")
  location.hash = "#" + inputTitle + "/" + blob
  $('p.title').text(inputTitle).show();
}

function render(data){
  var Title = decodeURI(data.split('/')[0])
  var encodedstr = atob(data.substr(data.indexOf("/")+1,data.length))
  var decodedstr = stringTointArray(encodedstr)
  var unzippedarr = pako.inflateRaw(decodedstr)
  var urlEncodedStr = String.fromCharCode.apply(null,unzippedarr)
  output = decodeURI(urlEncodedStr)

  $('p.title').text(Title).show();
  $('#editor').addClass('ql-container ql-snow');
  $('#editor').html('<div class="ql-editor">'+output+'</div>');
}

function toggleMenu(){
  var status = $("input.title").css("visibility");
  if(status == 'visible')
  {
    $("input.title").css("visibility","hidden");
    $(".pre").show();
    $(".pub").show();
  }
  else
  {
    $("input.title").css("visibility","visible");
    $(".pre").hide();
    $(".pub").hide();
  }
}

function help() {
  var url = "https://tinyurl.com/microblob-about"
  var win = window.open(url, '_blank');
  win.focus();
}