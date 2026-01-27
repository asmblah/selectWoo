module('Dropdown blur integration');

test('clicking outside the dropdown closes it', function (assert) {
  var done = assert.async();

  var $ = require('jquery');
  var Select2 = require('select2/core');

  var $select = $(
    '<select>' +
    '<option>One</option>' +
    '<option>Two</option>' +
    '</select>'
  );

  $('#qunit-fixture').append($select);

  var select = new Select2($select);

  // Open the dropdown.
  select.$selection[0].focus();
  select.open();

  setTimeout(function () {
    // Ensure the dropdown opened correctly.
    assert.ok(select.$container.hasClass('select2-container--open'));

    setTimeout(function () {
      // Ensure the dropdown closed correctly.
      assert.notOk(select.$container.hasClass('select2-container--open'));
      done();
    }, 500); // Accommodate other setTimeouts throughout Select2/Woo.

    // Click elsewhere in the document to cause the dropdown to close.
    $(document.body).trigger($.Event('mousedown', {which: 1}));
    select.$selection[0].focus();
  }, 100); // Accommodate other setTimeouts throughout Select2/Woo.
});
