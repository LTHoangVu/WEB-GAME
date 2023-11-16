const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/**
 * JS toggle
 *
 * Cách dùng:
 * <button class="js-toggle" toggle-target="#box">Click</button>
 * <div id="box">Content show/hide</div>
 */
function initJsToggle() {
    console.log(123);
    $$('.js-toggle').forEach((button) => {
      const target = button.getAttribute('toggle-target');
      if (!target) {
        document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
      }
      button.onclick = () => {
        if (!$(target)) {
          return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
        }
        const isHidden = $(target).classList.contains('hide');
  
        requestAnimationFrame(() => {
          $(target).classList.toggle('hide', !isHidden);
          $(target).classList.toggle('show', isHidden);
        });
      };
    });
}

window.addEventListener('template-loaded', initJsToggle());