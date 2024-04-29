const app = {
  pathToLibsFiles: './assets/libs',
};
window.app = app;

// polyfills
// before polyfills
(function (arr) {
  arr.forEach((item) => {
    if (item.hasOwnProperty('before')) {
      return;
    }
    Object.defineProperty(item, 'before', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function before() {
        // eslint-disable-next-line prefer-rest-params
        const argArr = Array.prototype.slice.call(arguments);
        const docFrag = document.createDocumentFragment();
        argArr.forEach((argItem) => {
          const isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        this.parentNode.insertBefore(docFrag, this);
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

// forEach polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    // eslint-disable-next-line no-param-reassign
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}



/* custom select */

const selects = document.querySelectorAll('.custom-select');
function setCustomSelect (items) {
  items.forEach((el) => {
    const handler = el.querySelector('.custom-select__header');

    if (handler) {
      handler.addEventListener('click', (e) => {
        const openSelectors = document.querySelectorAll('.custom-select__dropdown.is-open');
        if (el.querySelector('.custom-select__dropdown').classList.contains('is-open')) {
          el.querySelector('.custom-select__dropdown').classList.remove('is-open');
        } else {
          el.querySelector('.custom-select__dropdown').classList.remove('is-open');
          openSelectors.forEach((el2) => {
            el2.classList.remove('is-open');
          });
          el.querySelector('.custom-select__dropdown').classList.add('is-open');
        }
      });
    }
  });
}
setCustomSelect(selects)
/* (() => {

  document.addEventListener('click', (e) => {
    if (e.target.closest('.custom-select')) {
      const select = e.target.closest('.custom-select')
      const handler = select.querySelector('.custom-select__header');
      console.log(select)

      if (e.target.closest('.custom-select__header')) {
        handler.addEventListener('click', (e) => {
         
        });
        const openSelectors = document.querySelectorAll('.custom-select__dropdown.is-open');
        if (select.querySelector('.custom-select__dropdown').classList.contains('is-open')) {
          select.querySelector('.custom-select__dropdown').classList.remove('is-open');
        } else {
          select.querySelector('.custom-select__dropdown').classList.remove('is-open');
          openSelectors.forEach((el2) => {
            el2.classList.remove('is-open');
          });
          select.querySelector('.custom-select__dropdown').classList.add('is-open');
        }
      }
    }
  });
})(); */

document.addEventListener('mouseup', (e) => {
  const selects = document.querySelectorAll('.custom-select');
  if (!e.target.closest('.custom-select')) {
    selects.forEach((el) => {
      el.querySelector('.custom-select__dropdown').classList.remove('is-open');
    });
  }
});

(() => {
  const favorite = document.querySelector('.product-page-main__action.is-favorite');
  if (favorite) {
    favorite.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      favorite.classList.toggle('is-active');
    });
  }
})();

/* product-card-preview */
(() => {
  const product = document.querySelectorAll('.product-card');
  product.forEach((el) => {
    const productPreviewButton = el.querySelector('.product-card__action.is-preview');
    const favorite = el.querySelector('.product-card__favorite');
    const favoritePreview = el.querySelector('.product-card-preview__action.is-favorite');
    const productPreview = el.querySelector('.product-card-preview');
   

    if (favorite) {
      favorite.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        favorite.classList.toggle('is-active');
        favoritePreview.classList.toggle('is-active');
      });
    }
    
    if (favoritePreview) {
      favoritePreview.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        favorite.classList.toggle('is-active');
        favoritePreview.classList.toggle('is-active');
      });
    }

    if (productPreviewButton && productPreview) {
      productPreviewButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const cloneProductPreview = productPreview.cloneNode(true);
        const productPreviewClose = cloneProductPreview.querySelector('.product-card-preview__close');
        const productPreviewSlider = cloneProductPreview.querySelector('.product-card-preview__slider .swiper');
        document.body.appendChild(cloneProductPreview)
        cloneProductPreview.classList.add('is-active');
        document.body.classList.add('noskroll'); 

        const selects = cloneProductPreview.querySelectorAll('.custom-select');
        const collorPicker = cloneProductPreview.querySelectorAll('.collor-picker');
        const sizePicker = cloneProductPreview.querySelectorAll('.size-picker');
        setCustomSelect(selects)
        setCollorPicker(collorPicker)
        setSizePicker(sizePicker)

        if (productPreviewClose) {
          productPreviewClose.addEventListener('click', (e) => {
            e.stopPropagation();
            cloneProductPreview.remove()
            document.body.classList.remove('noskroll');
          });
        }

        cloneProductPreview.addEventListener('click', (e) => {
          e.stopPropagation();
          if (e.target.classList.contains('product-card-preview')) {
            cloneProductPreview.remove()
            document.body.classList.remove('noskroll');
          }
        });

        if (productPreviewSlider) {
          const productCardPreviewSlider = new Swiper(productPreviewSlider, {
            slidesPerView: 'auto',
            spaceBetween: 10,
            loop: false,
          });
        }
      });
    }
  });
})();

(() => {
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((el) => {
    const header = el.querySelector('.accordion-item__header');
    const content = el.querySelector('.accordion-item__content');
    header.addEventListener('click', () => {
      if (header.classList.contains('is-active')) {
        content.classList.remove('is-active');
        header.classList.remove('is-active');
        setTimeout(() => {
          content.style.maxHeight = '0';
        }, 0);
      } else {
        header.classList.add('is-active');
        content.style.maxHeight = content.scrollHeight + 'px';
        setTimeout(() => {
          content.classList.add('is-active');
        }, 300);
      }
    });
  });
})();

const cartCounters = document.querySelectorAll('.cart-item-counter');
cartCounters.forEach((el) => {
  const minus = el.querySelector('.cart-item-counter__button.is-minus');
  const plus = el.querySelector('.cart-item-counter__button.is-plus');
  const field = el.querySelector('.cart-item-counter__field');

  minus.addEventListener('click', () => {
    const value = Number(field.value);
    if (value > 1) {
      field.value = value - 1;
    }
  });

  plus.addEventListener('click', () => {
    const value = Number(field.value);
    field.value = value + 1;
  });
});

const collorPicker = document.querySelectorAll('.collor-picker');
function setCollorPicker (items) {
  items.forEach((el) => {
    const mainColor = el.querySelector('.collor-picker__header .collor-picker__color');
    const mainInput = el.querySelector('.collor-picker__header input');
    const options = el.querySelectorAll('.custom-select__item');
    const dropdown = el.querySelector('.custom-select__dropdown');
    options.forEach((option) => {
      option.addEventListener('click', () => {
        const color = option.dataset.color;
        const value = option.dataset.value;
        mainColor.style.background = color;
        mainInput.value = value;
        dropdown.classList.remove('is-open');
      });
    });
  });
}
setCollorPicker(collorPicker)


const sizePicker = document.querySelectorAll('.size-picker');
function setSizePicker (items) {
  items.forEach((el) => {
    const mainInput = el.querySelector('.size-picker__header input');
    const options = el.querySelectorAll('.custom-select__item');
    const dropdown = el.querySelector('.custom-select__dropdown');
    options.forEach((option) => {
      option.addEventListener('click', () => {
        const value = option.dataset.value;
        mainInput.value = value;
        dropdown.classList.remove('is-open');
      });
    });
  });
}
setSizePicker(sizePicker)

const personalForm = document.querySelector('.personal-form')
if (personalForm) {
  const editButton = personalForm.querySelector('.personal-form__buttons-edit')
  const passwordButton = personalForm.querySelector('.personal-form__buttons-password')
  const saveButton = personalForm.querySelector('.personal-form__buttons-save')
  const cancelButton = personalForm.querySelector('.personal-form__buttons-cancel')

  editButton.addEventListener('click', () => {
    personalForm.classList.add('is-edit')
  })

  cancelButton.addEventListener('click', () => {
    personalForm.classList.remove('is-edit')
  })

  passwordButton.addEventListener('click', () => {
    /* personalForm.classList.add('is-edit') */
  })

  saveButton.addEventListener('click', () => {
    personalForm.classList.remove('is-edit')
  })
}
