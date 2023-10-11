// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  let saves = [];     //the list of saved items

  let timeBlocks = $('.time-block');    //selects all time-blocks
  console.log(timeBlocks);

  let today = dayjs();
  let currentHour = parseInt(today.format('H'));


  // handle displaying the time
  function displayTime() {
    //sets interval in variable
    var timerInterval = setInterval(function() {
      // console.log(currentHour)
      $('#currentDay').text(today.format('dddd, MMMM D hh:mm:ss'));
      updateContainer();

    }, 1000);
  }
  displayTime();
  
  function updateContainer() {
  $('.time-block').each(function() {
    var blockId = parseInt($(this).attr('id')); //convert the id value from a str value to a number with parse
    // console.log(blockId)
    if (currentHour < blockId) {
      $(this).removeClass('past present');   //IS THIS NECCESSARY?
      $(this).addClass('future');
    } else if (currentHour === blockId) {
      $(this).removeClass('future past');
      $(this).addClass('present');
    } else {
      $(this).removeClass('present future');
      $(this).addClass('past');
    }
  })    
  }


  
  updateContainer();


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.DONE

  // let saveButtonEl = $('.savebtn');
  $('.saveBtn').on("click", function(){
    // console.log(event)
    var description = $(this).siblings('.description').val();
    var id = $(this).parent().attr('id');
    localStorage.setItem(id, description)
  });

  $('.time-block').each(function(i){
    var id = $(this).attr('id');
    var description = $(this).children('textarea');
    if (localStorage.getItem(id)) {
      description.val(localStorage.getItem(id));
    }
  })
  

});
