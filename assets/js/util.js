// assumes jQuery
// currently unused
function toggles_element(clickable_element, toggle_element) {
    clickable_element.change(
                          function() {
                              toggle_element.toggle(!clickable_element.checked);
                          }
                      )
                     .change();
}
